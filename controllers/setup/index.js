/**
 * Setup API Endpoint
 *
 * Pull base data such as Categories and indicators
 * @author Michael Ramos 
 */
'use strict';

var model = require("../../models").getModel();

module.exports = function (router) {

	/**
	 * @GET localhost/setup/category
	 */
    router.get('/category', function (req, res) {

    	model.Country.findAll().then(function(data) {
    		console.log(data);
    	});
	});      

	/**
	 * @GET localhost/setup/indicator
	 */
	router.get('/indicator', function (req, res) {
    	
    	console.log(model.Indicator);
	});  

	/**
	 * @GET localhost/setup/country
	 */
	router.get('/country', function (req, res) {
    	
    	model.Country.findAll({
    		attributes:['Country_Name']
    	}).then(function(data) {
    		res.send(data);
    	});
	}); 


};