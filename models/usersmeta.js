'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usersmeta = sequelize.define('Usersmeta', {
    number: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    podcasts: DataTypes.STRING,
    video: DataTypes.STRING,
    quote: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Usersmeta;
};