/**
 * User API Endpoint
 *
 * Pull base data such as Categories and indicators
 * @author Michael Ramos 
 */
'use strict';

var model = require("../../models").getModel();
var User = model.User;
var uuid = require('node-uuid');
var nJwt = require('nJwt')
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// global key used for jwt signing
var secretKey = uuid.v4();
// create token method
function createToken(user) {
	var claims = {
		userID: user.User_ID,
		iss: 'http://find.state.gov'
	}
	var jwt = nJwt.create(claims,secretKey);
	return jwt.compact();
} 

module.exports = function (router) {

	/**
	 * @GET localhost/user
	 *
	 */
    router.get('/', function (req, res) {
    	// TODO REMOVE THIS - only use for testing
    	res.send(User.getUserData());
	});

	/**
	 * @POST localhost/user/validateToken
	 * 
	 */
    router.post('/validateToken', function (req, res) {
    	// response object
    	var resBody = {}
    	// user has a token and sends to us for user access
    	// if token is valid it will contain a userID
    	// use the userid to query user data and send back to client
    	// if invalid send an invalid response
    	nJwt.verify(req.body.token, secretKey, function(err,token){
  			if (err){
    			// token not valid
    			var mss = {valid:false, message:'token not valid any longer'}
    			res.json(mss);
  			} else{
    			// todo query userID here
    			
    			
    			res.json(resBody)
  			}
		});
	});

	/**
	 * @POST localhost/user/validateLogin
	 *
	 */
    router.post('/validateLogin', function (req, res) {
    	// response object
    	var resBody = {};
    	// user has submitted login credentials
    	// verify the credentials, send back user ibject and token if valid
    	// if invalid send an invalid response

    	// Load hash from your password DB.
    	
    	User.findOne({
		  where: {Email: req.body.email}
		}).then(function(user) {
			if (user != null) { 
			  	var userData = user.dataValues	
			  	// got the user, now compare passwords
			  	bcrypt.compare(req.body.password, userData.Password, function(err, valid) {
		    		if (err) {
		    			// passwords dont match
		    			resBody = {valid:false, message:'could not authenticate user'}
	    				res.json(resBody)
		    		} else {
		    			// todo create session token
		    			var token = createToken(user)
		    			resBody = {valid:true, token: token, user: user}
		    			// -- response --
				  		res.json(resBody)
				  		// -- response --
		    		}
				});
			  } else {
			  	resBody = {valid:false, message:'could not authenticate user'}
				// -- response --
				res.json(resBody)
				// -- response --
			  }
		})
	});


	/**
	 * @POST localhost/user/register
	 *
	 */
    router.post('/register', function (req, res) {
    	// response object
    	var resBody = {};
    	// lets check and see if email already exists first
    	// db will return null when not found
    	User.findOne({
		  where: {Email: req.body.email}
		}).then(function(exists){
			if (exists === null) {
				// no email already exists good to go
				// generate a hash for the password
	    		// we are using async so out processing doesnt get tied up
				bcrypt.genSalt(10, function(err, salt) {
		    		bcrypt.hash(req.body.password, salt, function(err, hash) {
		        		var User = model.User.build({
				  			Name: req.body.name,
				  			Email: req.body.email,
				  			Password: hash
						})
						User.save().then(function(user) {
							var token = createToken(user)
							resBody = {valid:true, token: token, user: user}
							// -- response --
				  			res.json(resBody)
				  			// -- response --
						}).catch(function(err) {
							console.log(err);
						})
				    });
				});
			} else {
				// email already exists in db
				resBody = {valid:false, message:'Email already exists'}
				console.log(resBody)
				// -- response --
				res.json(resBody)
				// -- response --
			}
		});
    });

};