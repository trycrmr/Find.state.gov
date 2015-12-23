/**
 * Data API Model
 *
 * Find.state.gov main api for getting data for visualizations
 * @author Michael Ramos && Nathan Hilbert
 */
 
'use strict';

module.exports = function(request, response, rescallback) {
    return new Data(request, response, rescallback);
};

var _ =  require("lodash");
var moment = require("moment");
var squel = require("squel");
var nodeExcel = require('excel-export');
var csv = require('express-csv');
var calculateJenks = require("../lib/jenks").calculateJenks;
var errorHandling = require("../lib/errorHandling");

// Database config
var pg = require('pg');

// Data return variables
var FORMATOPTS = {'json':true, 'csv':true, 'excel':true, 'xls':true};
var RETURNLIMIT= 10000;
var DEFAULTDRILLDOWN = {"geometry__country_level0":"sovereignt","geometry__time":"time"};


/*
 * 
 * @class Data
 */
var Data = function(request, response, rescallback) {
    
    var self = this;
    this.response = response;
    this.rescallback = rescallback;
    this.params = {};
    this.indicators = [];
    this.daterange= {"start":null,"end":null};
    this.format='json';
    this.agg = {};
    this.drilldown = {};
    this.cut={};
    this.nulls=true;
    this.dataframe = null;
    this.geomtables = ['geometry__time', 'geometry__country_level0'];
    this.indicators_tables = [];
    this.t = {};

    this.client = new pg.Client("pg://postgres:postgres@localhost:5432/openspending");
    this.client.connect(function(err) {
        if (err) {
            //errorHandling.handle("There was an error with the database: " + err, self.response);
            console.log("could not connect to postgres");
            console.log(err);
        }
    });

    /**
     * Terminate DB Connection
     *
     */
    this.closeConnection = function() {
        self.client.end();
    };

    /**
     *
     *
     */
    this.parseParams = function(request, _callback) {

        self.indicators = request.body.indicators

        if ( !self.indicators || self.indicators === [] ) {
            errorHandling.handle("No data to fetch, no indicators argument", self.response);
            console.log("No data to fetch, no indicators argument");
            return null;
        }
        
        self.indicators_tables = {}
        
        var dbArray = []

        self.indicators.map(function(i) {
            dbArray.push(i.split(' ').join('_').toLowerCase())
        })


        _.each(dbArray, function(elem, index) {
            self.indicators_tables[elem] = elem + "__denorm"
        });

        if ( self.indicators.length > 5 ) {
            console.log("Can only join up to 5 indicators");
            return null;
        }   

        //TODO MAKE DYNAMIC
        self.daterange = { 
            start: 1992, 
            end: 2010 
        }

        //TODO MAKE DYNAMIC
        self.format = 'json'

        var countries = []
        request.body.countries.map(function(c){
           countries.push(c.toLowerCase())
        });
        
        //TODO MAKE DYNAMIC
        self.cut = {
            geometry__country_level0: {
                name: countries
            }
        }

        //TODO MAKE DYNAMIC
        self.drilldown = { 
            geometry__country_level0: [ 'name' ],
            geometry__time: [ 'time' ] 
        }
        //self.nulls = undefined;

        self.clusterparams = { 
            cluster: 'jenks',
            numclusters: 4 
        }

        // {
        //     "cluster": request.query["cluster"],
        //     "numclusters": parseInt(request.query["numclusters"])
        // }

        return self.buildQuery();
    };

    /**
     *
     *
     */
    this.buildQuery = function(){
        self.primary_table = _.values(self.indicators_tables)[0];
        self.primary_base = self.primary_table.split("__")[0];
        self.selectable = squel.select()
            .from("finddata." + self.primary_table + " AS " + self.primary_table)
            .field("COUNT(" + self.primary_table + ".geom_time_id)", "count")
            .field("AVG(" + self.primary_table + ".amount)", self.primary_base + "__avg")
            .field("MAX(" + self.primary_table + ".amount)", self.primary_base + "__max")
            .field("MIN(" + self.primary_table + ".amount)", self.primary_base + "__min");

        _.each(self.indicators_tables, function(indicators_ts, index) {
            if (indicators_ts == self.primary_table) {
                return;
            }
            var tempcube_base = indicators_ts.split("__")[0]
            self.selectable = self.selectable
                .right_join("finddata." + indicators_ts + " AS " + indicators_ts, null, indicators_ts + ".geom_time_id = "+ self.primary_table  + ".geom_time_id")
                .field("AVG(" + indicators_ts + ".amount)", tempcube_base + "__avg")
                .field("MAX(" + indicators_ts + ".amount)", tempcube_base + "__max")
                .field("MIN(" + indicators_ts + ".amount)", tempcube_base + "__min");
        });

        _.each(self.drilldown, function(drilldowns, tablename){
            _.each(drilldowns, function(dd,index){
                if (tablename == "geometry__country_level0") {
                    self.selectable = self.selectable
                                            .field(self.primary_table + "." + dd, "geo__" + dd)
                                            .group(self.primary_table + "." + dd);
                } else if (tablename == "geometry__time") {
                    self.selectable = self.selectable
                                            .field(self.primary_table + ".time", "time")
                                            .group(self.primary_table + ".time")
                                            .order("time");

                } else {

                }
            });
        });

        _.each(self.cut, function(cols, table_name) {
            _.each(cols, function(values, colname) {
                if (_.has(['geometry__country_level0', 'geometry__time'], table_name)) {
                    table_name = self.primary_table
                }
                if (values.length > 0) {
                    self.selectable = self.selectable.where(self.primary_table + "." + colname + " IN ('" + values.join("','") + "')");
                }
            });
        });

        if (self.daterange['start']) {
            self.selectable = self.selectable.where(self.primary_table + ".time >= " + self.daterange['start']);
        }

        if (self.daterange['end']) {
            self.selectable = self.selectable.where(self.primary_table + ".time <= " + self.daterange['end']);
        }

        if (!self.nulls) {
            _.each(self.indicators_tables, function(cube_tb){ 
                self.selectable = self.selectable.where(cube_tb + ".amount IS NOT NULL");
            });
        }

        return self.getResponse();

    };

    /**
     *
     *
     */
    this.getResponse = function(){
        
        var callback = null;
        if (self.format == "xls" || self.format == "excel") {
            callback = self.getXls;
        } else if ( self.format == "csv") {
            callback = self.getCsv;
        } else {
            callback = self.getJson;
        }

        /***** This is where the actual query and response are made *****/ 
        return self.query(self.selectable.toString(), callback);

    };

    /**
     * Perform the actual query
     *
     */
    this.query = function(_query, callback) {

      self.client.query(_query, function(err, result) {
        if(err) {
            errorHandling.handle("Error on query: " + err + "\n" + _query, self.response);
            console.log("Error on query: " + err + "\n" + _query);
            return null;
        }
        callback({
            "success": true,
            "rows": result.rows
        });

      });

    };

    /**
     *
     *
     */
    this.getJson= function(result){

        var response = {};
        response['cells'] = result['rows'];
        response['attributes'] = _.map(self.drilldown, function(d){
            return d[0];
        });
        self.getDatasetMetadata(function(rowresult){
            response['models'] = _.map(rowresult.rows, function(d){
                if (! d.years){
                    d.years = [];
                }
                else{
                    d.years= _.sortBy(d.years.split(","), function(val){
                        return +val;
                    });
                }
                return d;
            });
            if (self.clusterparams['cluster'] == 'jenks'){
                self.calculateClusters(response);
            }
            else{
                self.rescallback(response);
            }
        });

    };

    /**
     *
     *
     */
    this.getXls = function(result){
        var colkeys = _.keys(result['rows'][0])
        var conf ={};
        conf.stylesXmlFile = "styles.xml";
        conf.cols = _.map(colkeys, function(colkey){
            var colkeysplit = colkey.split("__");
            var type = "number";
            if (colkeysplit[0] == "geo"){
                type = "string";
            }
            return {
                caption:colkey,
                type:type,
                // beforeCellWrite:function(row, cellData){
                //      return cellData;
                // },
                width:28.7109375
            }
        });
        conf.rows = _.map(result['rows'], function(d){
            return _.values(d);
        });

        var result = nodeExcel.execute(conf);
        self.response.setHeader('Content-Type', 'application/vnd.openxmlformats');
        self.response.setHeader("Content-Disposition", "attachment; filename=" + self.indicators[0] + ".xlsx");
        self.response.end(result, 'binary');
        return null;
    };

    /**
     *
     *
     */
    this.getCsv = function(result){
        fields = _.keys(result['rows'][0]);
        values = _.map(result['rows'], function(d){
            return _.values(d);
        });
        values.unshift(fields);
       self.response.setHeader('Content-Type', 'text/csv');
        self.response.setHeader("Content-Disposition", "attachment; filename=" + self.indicators[0] + ".csv");
        self.response.csv(values);
        return null;
    };

    /**
     *
     *
     */
    this.getDatasetMetadata = function(callback){
        var sqlstatement = squel.select()
             .from("public.dataset")
             .field("label")
             .field("description")
             .field('"dataType"')
             .field("created_at")
             .field('name')
             .field('units')
             .field('years')
             .where("name IN  (?)", self.indicators.join("','")).toString();
        self.query(sqlstatement, function(query_result){
            callback(query_result);
        });
    };

    /**
     *
     *
     */
    this.calculateClusters = function(response) {

        var clusternum = self.clusterparams.numclusters;

        if (! clusternum) {
            clusternum = 5;
        }

        var dataitem = response['cells'].map(function(d) { return+d[self.primary_table.split("__")[0] + "__avg"]; });

        if (dataitem.length <= clusternum) {
            clusternum = dataitem.length-1;
        }

        var clusters = calculateJenks(dataitem, clusternum);

        var labels= [];

        _.each(clusters, function(val, index, list) {
            if (index >= list.length -1) {
                return false;
            }

            if (index == 0) {
                labels.push("less than " + list[index+1]);                
            } else if (index == list.length -2) {
                labels.push("greater than " + list[index]);
                
            } else {
            labels.push(val + "-" + list[index+1]);
            }
        });

        response['cluster'] = {
            'data': clusters,
            'labels': labels
        };

        self.rescallback(response);
    }

    return this.parseParams(request);

}