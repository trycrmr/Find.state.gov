/**
 * Indicator Model
 *
 * @desc find.state.gov, indicators, sequelize orm
 * @author Michael Ramos 
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Indicator = sequelize.define("Indicator", {
    Indicator_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Indicator_Name: {
      type: DataTypes.STRING
    },
    Indicator_URL: {
      type: DataTypes.STRING(520)
    },
    Indicator_Data_URL: {
      type: DataTypes.STRING(520)
    },
    Direct_Indicator_Source: {
      type: DataTypes.STRING
    },
    Original_Indicator_Source: {
      type: DataTypes.STRING
    },
    Years: {
      type: DataTypes.STRING(720)
    },
    Update_Cycle: {
      type: DataTypes.STRING
    },
    Scope: {
      type: DataTypes.STRING
    },
    Units: {
      type: DataTypes.STRING
    },
    Last_Source_Update_TS: {
      type: DataTypes.DATE
    },
    When_To_Update_TS: {
      type: DataTypes.DATE
    },
    Indicator_Definition: {
      type: DataTypes.TEXT
    },
  }, {
    classMethods: {
      // Executed in ./index.js
      associate: function(models) {
        Indicator.belongsToMany(models.Category, {
            through: 'Category_Junction',
            foreignKey: 'Indicator_ID'
        });
        Indicator.belongsToMany(models.Collection, {
            through: 'Collection_Junction',
            foreignKey: 'Indicator_ID'
        });
      }
    }   
  });
  
  return Indicator;
};
