/**
 * Models - Index
 *
 * @desc Index Class, purpose is to setup and sync the models.
 * Executed in the server initiation. Be careful making edits
 * to this file
 * @author Michael Ramos 
 */
"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";

// base class
var model;

module.exports.init = function (dbconfig) {
  
  var sequelize = new Sequelize(dbconfig.name, dbconfig.username, dbconfig.password, dbconfig.settings);
  var db = {};

  fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  model = db;
}

module.exports.getModel = function () {
  return model;
};







