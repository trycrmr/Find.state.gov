/**
 * User API Endpoint
 *
 * Pull base data such as Categories and indicators
 * @author Michael Ramos 
 */
'use strict';

var model = require("../../models").getModel();
var uuid = require('node-uuid');
var nJwt = require('nJwt')

// global key used for jwt signing

var secretKey = uuid.v4();

module.exports = function (router) {

	/**
	 * @GET localhost/user
	 */
    router.get('/', function (req, res) {
    	//var um = new UserModel();
    	res.send(um.getUserData());
    	//TODO REMOVE THIS ^
	});

	/**
	 * @POST localhost/user/validate
	 */
    router.post('/validateToken', function (req, res) {
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
    			// todo query user here
  			}
		});
	});

	/**
	 * @POST localhost/setup/category
	 */
    router.post('/register', function (req, res) {
    	var User = model.User.build({
  			Name: req.body.name,
  			Email: req.body.email,
  			Password: req.body.password
		})
		User.save().then(function(data) {
			var token = createToken(data.User_ID)
  			res.json({token: token})
		}).catch(function(err) {
			console.log(err);
		})
    });

    function createToken(userID) {
    	var claims = {
				userID: userID,
				iss: 'http://find.state.gov',
				role: 'admin'
			}
		var jwt = nJwt.create(claims,secretKey);
		return jwt.compact();
    } 

};

