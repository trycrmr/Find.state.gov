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
			"setup": {
				"categories": [
					{
						"title": "Blah Blah",
						"indicators": [
							{"name": "one"}, {"name": "two"}, {"name": "three"}
						]
					}, {
						"title": "Hey Man Get IT",
						"indicators": [
							{"name": "one"}, {"name": "two"}, {"name": "three"}
						]
					}, {
						"title": "eDip WHAT",
						"indicators": [
							{"name": "one"}, {"name": "two"}, {"name": "three"}
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
		}

    	res.json(jres);
	});      

};
