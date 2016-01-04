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


};
