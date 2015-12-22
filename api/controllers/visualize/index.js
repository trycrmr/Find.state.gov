/**
 * Data Viz Endpoint
 *
 * Data api for returing data requiered by the front-end
 * @author Michael Ramos 
 */
'use strict';

var DataModel = require('../../lib/Data_Test');

module.exports = function (router) {

	/**
	 * @GET localhost/visualize/data
	 */
    router.post('/data', function (req, res) {
    	//console.log('GOT DATA REQUEST')
    	//console.log(req.body);
    	var ds = new DataModel(req, res, function(resdata){
			if (! ds){
				errorHandling.handle("There was an error", res);
			}
			else{
				res.send(resdata);
			}	
			ds.closeConnection();		
		});
	});

	/**
	 * @GET localhost/visualize/data
	 */
    router.post('/', function (req, res) {
    	//console.log('GOT DATA REQUEST')
    	//console.log(req.body);
    	var ds = new DataModel(req, res, function(resdata){
			if (! ds){
				errorHandling.handle("There was an error", res);
			}
			else{
				res.send(resdata);
			}	
			ds.closeConnection();		
		});
	});

	/**
	 * @GET localhost/visualize/setup
	 */
    router.get('/setup', function (req, res) {
    	var jres = {
				"categories": [
					{
						"title": "Economic Growth",
						"indicators": [
							{"name": "Access to electricity"}, {"name": "Access to Land"}, {"name": "Adults using mobile money in the past year"}
						]
					}, {
						"title": "IT Developers",
						"indicators": [
							{"name": "GDP Growth"}, {"name": "GDP per capita, PPP"}, {"name": "General government revenue"}
						]
					}, {
						"title": "Office of eDiplomacy",
						"indicators": [
							{"name": "Employees, agriculture, male"}, {"name": "Employees, industry, female"}, {"name": "Unemployment, total"}
						]
					}
				],
				"countries": [
					{"name": "Iraq"},
					{"name": "Brazil"},
					{"name": "France"},
					{"name": "China"},
					{"name": "Angola"}
				]
		}

    	res.json(jres);
	});      

};
