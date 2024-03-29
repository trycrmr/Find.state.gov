/**
 * Category Model
 *
 * @desc find.state.gov, categories, sequelize orm
 * @author Michael Ramos 
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    Category_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Category_Name: {
        type: DataTypes.STRING
    },
    Sub_Category_Name: {
        type: DataTypes.STRING
    }
  },
  {
    classMethods: {
      // Executed in ./index.js
        associate: function(models) {
            Category.belongsToMany(models.Indicator, {
                through: 'Category_Junction',
                foreignKey: 'Category_ID'
            });
        }
    }   
  });

  return Category;
};