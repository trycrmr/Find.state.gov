/**
 * Subcategory Model
 *
 * @desc find.state.gov, categories, sequelize orm
 * @author Leroy Bryant
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Subcategory = sequelize.define("Subcategory", {
    Subcategory_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Subcategory_Name: {
        type: DataTypes.STRING
    }
  },
  {
    classMethods: {
      // Executed in ./index.js
        associate: function(models) {
            Subcategory.belongsToMany(models.Category, {
                through: 'Category_Subcategory_Junction',
                foreignKey: 'Subcategory_ID'
            });
            Subcategory.belongsToMany(models.Indicator, {
                through: 'Subcategory_Indicator_Junction',
                foreignKey: 'Subcategory_ID'
            });
        }
    }   
  });

  return Subcategory;
};