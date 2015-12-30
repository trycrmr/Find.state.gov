/**
 * Setup API Endpoint
 *
 * Pull base data such as Categories and indicators
 * @author Michael Ramos, Leroy Bryant
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
      		attributes:['Indicator_ID','Indicator_Name','Indicator_URL','Indicator_Data_URL','Direct_Indicator_Source',
                      'Original_Indicator_Source','Update_Cycle','Units','updatedAt','Indicator_Definition']
      	}).then(function(data) {
      		res.send(data);
      	});
	});  

/**
   * @GET localhost/setup/indicatorbycategory
   */
  router.get('/indicatorbycategory', function (req, res) {
        model.sequelize.query("SELECT public.\"Categories\".\"Category_Name\", public.\"Categories\".\"Sub_Category_Name\", public.\"Indicators\".\"Indicator_Name\" FROM public.\"Category_Junction\"" + 
                              "JOIN public.\"Indicators\" ON public.\"Category_Junction\".\"Indicator_ID\" = public.\"Indicators\".\"Indicator_ID\"" +  
                              "JOIN public.\"Categories\" ON public.\"Category_Junction\".\"Category_ID\" = public.\"Categories\".\"Category_ID\""
        , { type: model.sequelize.QueryTypes.SELECT
        }).then(function(data) {
        
            res.json(data);
        })
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

    /**
     * @GET localhost/setup/region
     */
    router.get('/region/:region', function (req, res) {
        
        var region = req.params.region;

        model.sequelize.query("select distinct \"" + region + "\" from public.\"Countries\"", { type: model.sequelize.QueryTypes.SELECT
        }).then(function(data) {
        
            res.json(data);
        })
    }); 

    /**
     * @GET localhost/setup/geoJson
     */
    router.get('/geoJson', function (req, res) {
      var file = '/Users/ramboramos/eDip/Find.state.gov/api/public/geo/sovereignt_None.geoJson'
        res.sendFile(file);
    }); 

};