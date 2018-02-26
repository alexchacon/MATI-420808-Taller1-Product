'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {

    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});


  category.associate = function(models) {
      category.hasMany(models.product, {
          foreignKey: 'categoryId',
          as: 'products',
      });
  };

  return category;
};