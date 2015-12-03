'use strict';

require("babel-core/register");

var app = require('./index');
var http = require('http');
var server;

// Create and start HTTP server.
server = http.createServer(app);

// Load up the database, start the Server
server.listen(process.env.PORT || 3000);
server.on('listening', function () {
	    console.log('===> 🐙  Kraken Server listening on http://localhost:%d', this.address().port);
});

