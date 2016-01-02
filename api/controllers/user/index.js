/**
 * User API Endpoint
 *
 * Pull base data such as Categories and indicators
 * @author Michael Ramos 
 */
'use strict';

//import UserModel from '../../lib/user';

// global key used for jwt signing
var uuid = require('node-uuid');
var secretKey = uuid.v4();

module.exports = function (router) {

	/**
	 * @GET localhost/setup/category
	 */
    router.get('/', function (req, res) {
    	var um = new UserModel();
    	res.send(um.getUserData());
	});

	/**
	 * @POST localhost/setup/category
	 */
    router.post('/validate', function (req, res) {
    	//var um = new UserModel();
    	console.log("=========USER VALIDATE==========")
    	console.log(req.body);
	});        

};