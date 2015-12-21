/**
 * User Model
 *
 * @desc find.state.gov, categories, sequelize orm
 * @author Leroy Bryant
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    User_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING
    },
    Password: {
        type: DataTypes.STRING
    },
    API_Key: {
        type: DataTypes.STRING
    },
    Admin: {
        type: DataTypes.BOOLEAN
    },
    Verified: {
        type: DataTypes.BOOLEAN
    },
    Moderator: {
        type: DataTypes.BOOLEAN
    }
  },
  {
    classMethods: {
      // Executed in ./index.js
        associate: function(models) {
          User.hasMany(models.Data_View, {
              foreignKey: 'User_ID'
          });
        }
    }   
  });

  return User;
};