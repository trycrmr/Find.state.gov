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
var model = require("../../models").getModel();
var csv = require('ya-csv');
var _ = require('underscore');

module.exports = function (router) {

	/**
	 * @GET localhost/ingest
	 */
    router.get('/', function (req, res) {
    		
    	// TODO Send html file to client
    	// res.send('PATH TO HTML FORM');
    	res.sendFile('/Users/bryantlc/Find.state.gov/api/public/form.html');
    
	});

    /**
	 * @POST localhost/ingest
	 */
	router.post('/', function (req, res) {
		
		// TODO handle form data
		// parse req, validate, connect to DB, run sql statements

        var thisPostsFormData = req.body; 
        res.send('<a href="/">back</a><p><pre>' + JSON.stringify(thisPostsFormData) + '</pre></p>');
        console.log(thisPostsFormData);
    
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
     * @POST localhost/ingest
     */
    router.post('/update', function (req, res) {
        
        // TODO handle form data
        // parse req, validate, connect to DB, run sql statements

        //var thisPostsFormData = req.body; 
        res.send('<a href="/ingest">back</a><p><pre>' + JSON.stringify(req.body) + '</pre></p><p>' + JSON.stringify(req.body.data_file) + '</p>');
        //console.log(req.body);
        //console.log(thisPostsFormData);

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
        //var last = req.body.las

        model.sequelize.query("delete from public.\"Category_Junction\" where \"Indicator_ID\" = " + indicators_id_ex).spread(function(results, metadata) {
        
        });

       /* model.sequelize.query("update public.\"Indicators\" set \"Indicator_URL\" = \'" + url + "\', \"Indicator_Data_URL\" = \'" + data_url + "\'," +  
                            "\"Direct_Indicator_Source\" = \'" + dsource + "\', \"Original_Indicator_Source\"=\'" + osource + "\',\"Units\"=\'" + units + "\'," + 
                            " \"Indicator_Definition\"=\'" + definition + "\', \"Update_Cycle\"=\'" + frequency + "\', \"updatedAt\" = now()::date " + 
                             "where \"Indicator_Name\" like \'%" + indicators_ex + "%\'").spread(function(results, metadata) {
        
            
        })*/

        /*model.sequelize.query("select \"Indicator_ID\" from public.\"Indicators\" where \"Indicator_Name\" like \'" + indicators_ex + "\'", { type: model.sequelize.QueryTypes.SELECT
        }).then(function(data) {
        
            //res.json(data);
            console.log(data[0].Indicator_ID);
        }) */

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
    
        console.log("**********" + category_ex.length);
        console.log(categories);
        console.log("*******************" + typeof(category_ex))

        if(subcategory_ex.length<1)
            categories=categories.slice(0,-3);

        console.log("**********" + category_ex.length);
        console.log(categories);
        console.log("*******************" + typeof(category_ex))

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


        /*var catIDs;
        var query = "select \"Category_ID\" from public.\"Categories\" where " + categories + " " + subcategories;
        model.sequelize.query(query , { type: model.sequelize.QueryTypes.SELECT
        }).then(function(categoryIDs) {
            console.log(categoryIDs);
            console.log("before promese");
            return model.sequelize.Promise.map(categoryIDs, function (c) {
                console.log("after promise");
                console.log(categoryIDs);
                console.log(categoryIDs.Indicator_ID);
                console.log(categoryIDs[0].Indicator_ID);

            //categoryIDs[0].Indicator_ID
                    return model.sequelize.query("insert into public.\"Category_Junction\" (\"createdAt\", \"updatedAt\",\"Indicator_ID\", \"Category_ID\") values (now(),now()," + indicators_id_ex + "," + categoryIDs[Category_ID] + ")" 
                    ).spread(function(results, metadata) {
        
                    console.log(metadata);
                    console.log(results);
                    })*/

                   /* return model.sequelize.query("insert into public.\"Category_Junction\" (\"createdAt\", \"updatedAt\",\"Indicator_ID\", \"Category_ID\") values (now(),now()," + indicators_id_ex + ",6)" , { type: model.sequelize.QueryTypes.SELECT
                    }).spread(function(results, metadata) {
        
            
                    })*/

                    /*.then(function(categoryName) {
                    console.log("names " + categoryName[0].Indicator_Name);
                    })*/
           }); 
        //});  

        /*model.sequelize.query("select \"Indicator_Name\" from public.\"Indicators\" where \"Indicator_ID\" = " + catIDs , { type: model.sequelize.QueryTypes.SELECT
            }).then(function(data) {
                console.log("names " + data);
        })   

        sequelize.query("SELECT * FROM users").then(function(users) {
  return sequelize.Promise.map(users, function (u) {
    return sequelize.query("SELECT interests.id, interests.title FROM interests, 
        user_interests WHERE interests.id = user_interests.interest_id AND user_interests.user_id = " + users[u].id).then(function(interests) {
      if (interests.length > 0) {
        user.interests = interests;
      }
    });
  });
});    */      
       
       /*var reader = csv.createCsvFileReader(req.body.data_file, {
                                                'separator': ',',
                                                'quote': '"',
                                                'escape': '"',   
                                                'comment': ''
                                             });
        reader.addListener('data', function(data) {
                console.log(data);
        });*/

        //console.log('File name is ' + req.data_file.name);
        //console.log('File size is ' + req.files.data_file.size);
        //console.log('File size is ' + req.files.data_file.path);
    
    //});
        
};
