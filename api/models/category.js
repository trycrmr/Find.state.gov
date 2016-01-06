/**
 * Category Model
 *
 * @desc find.state.gov, categories, sequelize orm
 * @author Michael Ramos && Leroy Bryant
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
    }
  },
  {
    classMethods: {
      // Executed in ./index.js
        associate: function(models) {
            Category.belongsToMany(models.Subcategory, {
                through: 'Category_Subcategory_Junction',
                foreignKey: 'Category_ID'
            });
            
        }
    }   
  });

  return Category;
};