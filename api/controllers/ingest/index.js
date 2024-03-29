/**
 * Ingest Endpoint
 *
 * Inserting Data into the DBs
 * @author Michael Ramos && Leroy Bryant && Terry Creamer
 */

'use strict';

import CategoryModel from '../../models/category';
import IndicatorModel from '../../models/indicator';
import DataModel from '../../models/data';
var path = require('path')
var model = require("../../models").getModel();
var _ = require('lodash');
var csv = require("fast-csv");

module.exports = function (router) {

	/**
	 * @GET localhost/ingest
	 */
    router.get('/', function (req, res) {
    	res.sendFile(path.resolve(__dirname+'../../../public/form.html')); 
	});

    /**
	 * @POST localhost/ingest
	 */
	router.post('/', function (req, res) {
		
		// TODO handle form data
		// parse req, validate, connect to DB, run sql statements

	});


    /**
     * @POST localhost/ingest/existing-indicator-data
     */
    router.post('/existing-indicator-data', function (req, res) {
            
        // TODO handle form data
        // parse req, validate, connect to DB, run sql statements

        var thisPostsFormData = req.body; 
        res.send('<a href="/">back</a><p><pre>' + JSON.stringify(thisPostsFormData) + '</pre></p>');
        console.log(thisPostsFormData);
    
    });


    /**
     * @POST localhost/ingest/insert
     */
    router.post('/insert', function (req, res) {
            
        res.send('<a href="/ingest">back</a></br></br>Indicator Added');
        //res.send('<a href="/ingest">back</a><p><pre>' + JSON.stringify(req.body) + '</pre></p><p>' + JSON.stringify(req.body.data_file) + '</p>');

        var url = req.body.url;
        var data_url = req.body.data_url;
        var dsource = req.body.dsource;
        var osource = req.body.osource;
        var units = req.body.units;
        var definition = req.body.definition;
        var frequency = req.body.frequency;
        var indicators = req.body.indicators;
        var category = req.body.category;
        var subcategory = req.body.subcategory;
        var indicators_id = req.body.indicators_id;

        if(req.files.data_file_ex.size>0){
            

                model.sequelize.query("delete from public.\"Data\" where \"Indicator_ID\" = " + indicators_id_ex).then(function(results, metadata) {
                
                    
                });
                
                csv
                     .fromPath(req.files.data_file_ex.path, {headers: true})
                     .on("data", function(data){
                        
                         model.sequelize.query("insert into public.\"Data\" (\"Country_ID\", \"Indicator_ID\", \"Date\", \"Value\",\"createdAt\",\"updatedAt\") values" +
                                                 "((select \"Country_ID\" from public.\"Countries\" Where \"Sub_Country_Name\" like '" + data.Country + "')," + indicators_id_ex +
                                                "," + data.Year + "," + data.Value + "," + "now(),now())"
         
                                ).then(function(results, metadata) {
                    
                                })

                     })
                     .on("end", function(){
                         console.log("done");
                     });

        }

        model.sequelize.query("insert into public.\"Indicators\" (\"Indicator_Name\", \"Indicator_URL\", \"Indicator_Data_URL\", \"Direct_Indicator_Source\"," +
                            "\"Original_Indicator_Source\", \"Units\", \"Indicator_Definition\", \"Update_Cycle\", \"updatedAt\",\"createdAt\") values ('" + indicators + 
                            "', " + "\'" +url + "\', \'" + data_url + "\', \'" + dsource + "\', \'" + osource+ "\', \'"+units +"\',\'"+definition+"\',\'"+frequency+
                            "\', now(),now())").spread(function(results, metadata) {
        
        });

        var categories ="";
        var subcategories = "";

        if(typeof(category)==='string'){
            categories+="\"Category_Name\" like \'" + category + "\' or "
        }
        else{

            _.each(category,function(index, value){
                categories+="\"Category_Name\" like \'" + index + "\' or "
            });

        }
    

        if(subcategory.length<1)
            categories=categories.slice(0,-3);


        if(typeof(subcategory)==='string'){
            subcategories+="\"Sub_Category_Name\" like \'" + subcategory + "\' or "
        }
        else{

            _.each(subcategory,function(index, value){
                subcategories+="\"Sub_Category_Name\" like \'" + index + "\' or "
            });

        }

        subcategories=subcategories.slice(0,-3);


        var query = "select \"Category_ID\" from public.\"Categories\" where " + categories + " " + subcategories;
        model.sequelize.query(query , { type: model.sequelize.QueryTypes.SELECT
        }).then(function(categoryIDs) {
            console.log(categoryIDs);

            _.each(categoryIDs,function(index, value){
                model.sequelize.query("insert into public.\"Category_Junction\" (\"createdAt\", \"updatedAt\",\"Indicator_ID\", \"Category_ID\")" +
                    " values (now(),now(), (select \"Indicator_ID\" from public.\"Indicators\" where \"Indicator_Name\" like \'" + indicators + "\') ," + index.Category_ID + ")" 
                        ).then(function(results, metadata) {
            
                        })
            });
        });
    
    });



    /**
     * @POST localhost/ingest/udpate
     */
    router.post('/update', function (req, res) {
        
        // TODO handle form data
        // parse req, validate, connect to DB, run sql statements

        //var thisPostsFormData = req.body; 
        //res.send('<a href="/ingest">back</a><p><pre>' + JSON.stringify(req.body) + '</pre></p><p>' + JSON.stringify(req.body.data_file_ex) + '</p>');
        res.send('<a href="/ingest">back</a></br></br>Indicator Edited');

        var url = req.body.url_ex;
        var data_url = req.body.data_url_ex;
        var dsource = req.body.dsource_ex;
        var osource = req.body.osource_ex;
        var units = req.body.units_ex;
        var definition = req.body.definition_ex;
        var frequency = req.body.frequency_ex;
        var indicators_ex = req.body.indicators_ex;
        var category_ex = req.body.category_ex;
        var subcategory_ex = req.body.subcategory_ex;
        var indicators_id_ex = req.body.indicators_id_ex;
        

        if(req.files.data_file_ex.size>0){
            

                model.sequelize.query("delete from public.\"Data\" where \"Indicator_ID\" = " + indicators_id_ex).then(function(results, metadata) {
                
                    
                });
                
                csv
                     .fromPath(req.files.data_file_ex.path, {headers: true})
                     .on("data", function(data){
                        
                         model.sequelize.query("insert into public.\"Data\" (\"Country_ID\", \"Indicator_ID\", \"Date\", \"Value\",\"createdAt\",\"updatedAt\") values" +
                                                 "((select \"Country_ID\" from public.\"Countries\" Where \"Sub_Country_Name\" like '" + data.Country + "')," + indicators_id_ex +
                                                "," + data.Year + "," + data.Value + "," + "now(),now())"
         
                                ).then(function(results, metadata) {
                    
                                })

                     })
                     .on("end", function(){
                         console.log("done");
                     });

        }

        model.sequelize.query("delete from public.\"Category_Junction\" where \"Indicator_ID\" = " + indicators_id_ex).spread(function(results, metadata) {
                
                
        });

       model.sequelize.query("update public.\"Indicators\" set \"Indicator_URL\" = \'" + url + "\', \"Indicator_Data_URL\" = \'" + data_url + "\'," +  
                            "\"Direct_Indicator_Source\" = \'" + dsource + "\', \"Original_Indicator_Source\"=\'" + osource + "\',\"Units\"=\'" + units + "\'," + 
                            " \"Indicator_Definition\"=\'" + definition + "\', \"Update_Cycle\"=\'" + frequency + "\', \"updatedAt\" = now()::date " + 
                             "where \"Indicator_Name\" like \'%" + indicators_ex + "%\'").spread(function(results, metadata) {
        
            
        });

        var categories ="";
        var subcategories = "";

        if(typeof(category_ex)==='string'){
            categories+="\"Category_Name\" like \'" + category_ex + "\' or "
        }
        else{

            _.each(category_ex,function(index, value){
                categories+="\"Category_Name\" like \'" + index + "\' or "
            });

        }
    

        if(subcategory_ex.length<1)
            categories=categories.slice(0,-3);

        if(typeof(subcategory_ex)==='string'){
            subcategories+="\"Sub_Category_Name\" like \'" + subcategory_ex + "\' or "
        }
        else{

            _.each(subcategory_ex,function(index, value){
                subcategories+="\"Sub_Category_Name\" like \'" + index + "\' or "
            });

        }

        subcategories=subcategories.slice(0,-3);


        var query = "select \"Category_ID\" from public.\"Categories\" where " + categories + " " + subcategories;
        model.sequelize.query(query , { type: model.sequelize.QueryTypes.SELECT
        }).then(function(categoryIDs) {
            console.log(categoryIDs);

            _.each(categoryIDs,function(index, value){
                model.sequelize.query("insert into public.\"Category_Junction\" (\"createdAt\", \"updatedAt\",\"Indicator_ID\", \"Category_ID\")" +
                    " values (now(),now()," + indicators_id_ex + "," + index.Category_ID + ")" 
                        ).then(function(results, metadata) {
            
                        })
            });
        });

        

    }); 
        
        
};
