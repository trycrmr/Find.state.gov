/**
 * Data_View Model
 *
 * @desc find.state.gov, categories, sequelize orm
 * @author Leroy Bryant
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Data_View = sequelize.define("Data_View", {
    Data_View_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: DataTypes.STRING
    },
    Description: {
        type: DataTypes.STRING
    },
    Data_View_URL: {
        type: DataTypes.STRING
    }
  },
  {
    classMethods: {
      // Executed in ./index.js
        associate: function(models) {
            Data_View.belongsToMany(models.Indicator, {
                through: 'Dataview_Junction',
                foreignKey: 'Dataview_ID'
            });
            Data_View.belongsTo(models.User, {
                foreignKey: 'User_ID'
            });
        }
    }   
  });

  return Data_View;
};