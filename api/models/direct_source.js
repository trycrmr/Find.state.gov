/**
 * Direct Source Model
 *
 * @desc find.state.gov, indicators, sequelize orm
 * @author Leroy Bryant
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Direct_Source = sequelize.define("Direct_Source", {
        Direct_Source_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Source_Name: {
            type: DataTypes.STRING
        },
        Update_Cycle: {
            type: DataTypes.STRING
        },
        Scope: {
            type: DataTypes.STRING
        },
        Last_Source_Update_TS: {
            type: DataTypes.DATE
        },
        When_To_Update_TS: {
            type: DataTypes.DATE
        }
    }, 
    {
        classMethods: {
            // Executed in ./index.js
            associate: function(models) {
                Direct_Source.hasMany(models.Indicator, {
                  foreignKey: 'Direct_Source_ID'
                });

            }
        } 
  });
  
  return Direct_Source;
};
