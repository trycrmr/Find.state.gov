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
   * @GET localhost/setup/indicatorsByCategory
   */
  router.get('/indicatorsByCategory', function (req, res) {
      model.sequelize.query(
        "SELECT public.\"Categories\".\"Category_Name\", public.\"Categories\".\"Sub_Category_Name\", public.\"Indicators\".\"Indicator_Name\" FROM public.\"Category_Junction\"" + 
        "JOIN public.\"Indicators\" ON public.\"Category_Junction\".\"Indicator_ID\" = public.\"Indicators\".\"Indicator_ID\"" +  
        "JOIN public.\"Categories\" ON public.\"Category_Junction\".\"Category_ID\" = public.\"Categories\".\"Category_ID\""
      , { 
        type: model.sequelize.QueryTypes.SELECT
      }).then(function(data) {

        var combined = []

        for (var i = data.length - 1; i >= 0; i--) {
          var index = combined.map(function(e) { return e.Indicator_Name; }).indexOf(data[i].Indicator_Name);
          if (index != -1) {
            var cat_name, subcat_name;
            if (combined[index].Category_Name === "" || combined[index].Category_Name === undefined) {
              cat_name = data[i].Category_Name
            } else {
              cat_name = combined[index].Category_Name
            }
            if (combined[index].Sub_Category_Name === "" || combined[index].Sub_Category_Name === undefined) {
              subcat_name = data[i].Sub_Category_Name
            } else {
              subcat_name = combined[index].Sub_Category_Name
            }
            //a merger needs to happen here
            combined[index] = {}
            combined[index] = {
              Category_Name: cat_name,
              Sub_Category_Name: subcat_name,
              Indicator_Name: data[i].Indicator_Name
            }
          } else {
            var newRow = data[i]
            combined.push(newRow)
          }
        };
        
        var obj = {
          categories: []
        }

        for (var i = combined.length - 1; i >= 0; i--) {
          var catname = combined[i].Category_Name,
              indname = combined[i].Indicator_Name,
              subname;

          if (combined[i].Sub_Category_Name === "" || combined[i].Sub_Category_Name === undefined){
            subname = "General"
          } else {
            subname = combined[i].Sub_Category_Name
          } 

          var index = obj.categories.map(function(e) { return e.name; }).indexOf(catname);
          if(index != -1) {
            // category exists already, now we need to check if subcategory exists
            var subdex = obj.categories[index].subcategories.map(function(e) { return e.name; }).indexOf(subname);
            if(subdex != -1) {
              // sub cat exists, just add the indicator
              obj.categories[index].subcategories[subdex].indicators.push(indname)
            } else {
              // sub cat does not exist, add entire
              var addSub = {
                name: subname,
                indicators: []
              }
              addSub.indicators.push(indname)
              obj.categories[index].subcategories.push(addSub)
            }
          } else {
            // that category does not yet exist, add it, subcategory, and indicator
            var addSub = {
              name: subname,
              indicators: []
            }
            addSub.indicators.push(indname)
            // now add to new cat
            var addCat = {
              name: catname,
              subcategories: []
            }
            addCat.subcategories.push(addSub)
            // now push to array
            obj.categories.push(addCat);
          }  
        }

        var ctys = [{name: "France"},{name: "United States"},{name: "China"},{name: "Iraq"}
          ,{name: "Russia"},{name: "Argentina"},{name: "Canada"},{name: "Australia"}]
        obj.countries = ctys

        res.json(obj);
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
      var file = '/Users/bryantlc/Find.state.gov/api/public/geo/sovereignt_None.geoJson'
        res.sendFile(file);
    }); 

    /**
     * @GET localhost/setup/geoJson
     */
    router.get('/jquery', function (req, res) {
      var file = '/Users/bryantlc/Find.state.gov/node_modules/jquery/dist/jquery.min.js'
        res.sendFile(file);
    }); 

    /**
     * @GET localhost/setup/geoJson
     */
    router.get('/leaflet/js', function (req, res) {
      var file = '/Users/bryantlc/Find.state.gov/node_modules/leaflet/dist/leaflet.js'
        res.sendFile(file);
    }); 

    /**
     * @GET localhost/setup/geoJson
     */
    router.get('/leaflet/css', function (req, res) {
      var file = '/Users/bryantlc/Find.state.gov/node_modules/leaflet/dist/leaflet.css'
        res.sendFile(file);
    }); 

    /**
     * @GET localhost/setup/geoJson
     */
    router.get('/bootstrap/css', function (req, res) {
      var file = '/Users/bryantlc/Find.state.gov/node_modules/bootstrap/dist/css/bootstrap.min.css'
        res.sendFile(file);
    }); 

    /**
     * @GET localhost/setup/geoJson
     */
    router.get('/bootstrap/js', function (req, res) {
      var file = '/Users/bryantlc/Find.state.gov/node_modules/bootstrap/dist/js/bootstrap.min.js'
        res.sendFile(file);
    }); 

};