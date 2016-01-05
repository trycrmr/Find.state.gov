/**
 * User API Endpoint
 *
 * Pull base data such as Categories and indicators
 * @author Michael Ramos 
 */
'use strict';
import validator from 'validator';


//import UserModel from '../../lib/user';

// global key used for jwt signing
var uuid = require('node-uuid');
var secretKey = uuid.v4();

module.exports = function (router) {

	/**
	 * @GET localhost/user
	 */
    router.get('/', function (req, res) {
    	var um = new UserModel();
    	res.send(um.getUserData());
    	//TODO REMOVE THIS ^
	});

	/**
	 * @POST localhost/user/validate
	 */
    router.post('/validate', function (req, res) {
    	//var um = new UserModel();
    	console.log("=========USER VALIDATE==========")
    	console.log(req.body);
	});

	/**
	 * @POST localhost/setup/category
	 */
    router.post('/register', function (req, res) {
    	//var um = new UserModel();
    	console.log("=========USER REGISTER==========")
    	console.log(req.body);

    	console.log(validator.normalizeEmail(req.body.email))
    });    

};

