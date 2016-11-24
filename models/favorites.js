'use strict';
module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define('favorites', {
   
  }, {
    freezeTableName: true,
    paranoid: true,    
  });
  return Favorites;
};