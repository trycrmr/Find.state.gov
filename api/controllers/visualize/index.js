/**
 * Data Viz Endpoint
 *
 * Data api for returing data requiered by the front-end
 * @author Michael Ramos 
 */
'use strict';

var DataModel = require('../../lib/data');

module.exports = function (router) {

	/**
	 * @GET localhost/visualize/data
	 */
    router.get('/data', function (req, res) {

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
							{"name": "Example 1"}, {"name": "Example 2"}, {"name": "Example 3"}
						]
					}, {
						"title": "IT Developers",
						"indicators": [
							{"name": "First Example"}, {"name": "Second Example"}, {"name": "Third Example"}
						]
					}, {
						"title": "Office of eDiplomacy",
						"indicators": [
							{"name": "Final one"}, {"name": "Final two"}, {"name": "Final three"}
						]
					}
				],
				"countries": [
					{"name": "Iraq"},
					{"name": "Afghan"},
					{"name": "Saudi"},
					{"name": "Turks"}
				]
		}

    	res.json(jres);
	});      

};
