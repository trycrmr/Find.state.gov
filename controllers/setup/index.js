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
              {
                "title": "Under-five mortality rate is declining around the world",
                "content": "The rate of children that die before their 5th birthday has been cut in half in the last 25 years."
              },
              {
                "title": "If you are over 15 years old and reading this, then you are part of the 85% of the literate adult world.",
                "content": "The global adult literacy rate has increased by about 10% since 1990, and more people are literate than ever before."
              },
              {
                "title": "Dramatic increases in Mobile subscriptions in sub-Saharan Africa",
                "content": "146 million mobile accounts created in the last 15 years within sub-Saharan Africa shows the ubiquitous growth of mobile technology in developing countries."
              }
            ]
        }
        res.json(data);
    });

};