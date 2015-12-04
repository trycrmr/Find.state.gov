'use strict';

module.exports = function (router) {

    router.get('/', function (req, res) {
        res.sendFile(__dirname + '/../public/static/index.html'); 
    });

};
