'use strict';
module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define('favorites', {
   
  }, {
    underscored: true,
    freezeTableName: true,
    paranoid: true,    
  });
  return Favorites;
};