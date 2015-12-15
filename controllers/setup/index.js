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
  	model.Category.findAll().then(function(data) {
  		//format to json
  		res.json(data);
  		//console.log(data);
  	});
	});      

	/**
	 * @GET localhost/setup/indicator
	 */
	router.get('/indicator', function (req, res) {
  	model.Indicator.findAll({
  		attributes:['Indicator_Name']
  	}).then(function(data) {
  		res.send(data);
  	});
	});  

	/**
	 * @GET localhost/setup/country
	 */
	router.get('/country', function (req, res) {
    console.log("GOT COUNTRY REQUEST");
  	model.Country.findAll({
  		attributes:['Country_Name']
  	}).then(function(data) {
  		res.send(data);
  	});
	}); 

    /**
     * @GET localhost/setup/datastories
     */
    router.get('/datastories', function (req, res) {
      console.log('getting DS request');
      var data = {
        "datastories":[
          {"title": "Data Story 1","content": "aefolqwejvsavdfqweqfnlfnjwnan"},
          {"title": "Data Story 2","content": "sfwWFgsawqefnWQDFnqfwecfqwec3"},
          {"title": "Data Story 3","content": "wqefqfwwqweqfferasfdaneFasdfn"}
        ]
      }
      res.json(data);
    });


};