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
        console.log(req.body);
        //console.log(thisPostsFormData);

        var url = req.body.url_ex;
        var data_url = req.body.data_url_ex;
        var dsource = req.body.dsource_ex;
        var osource = req.body.osource_ex;
        var units = req.body.units_ex;
        var definition = req.body.definition_ex;
        var frequency = req.body.frequency_ex;
        var indicators_ex = req.body.indicators_ex;
        //var last = req.body.las

        model.sequelize.query("update public.\"Indicators\" set \"Indicator_URL\" = \'" + url + "\', \"Indicator_Data_URL\" = \'" + data_url + "\'," +  
                            "\"Direct_Indicator_Source\" = \'" + dsource + "\', \"Original_Indicator_Source\"=\'" + osource + "\',\"Units\"=\'" + units + "\'," + 
                            " \"Indicator_Definition\"=\'" + definition + "\', \"Update_Cycle\"=\'" + frequency + "\', \"updatedAt\" = now()::date " + 
                             "where \"Indicator_Name\" like \'%" + indicators_ex + "%\'").spread(function(results, metadata) {
        
            
        })
       
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
    
    });
        
};
