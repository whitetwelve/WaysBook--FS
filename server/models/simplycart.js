'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class simplycart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      simplycart.belongsTo(models.profiles, {
        as : "profile",
        foreignKey : {
          name : "idProfile"
        }
      })

      simplycart.belongsTo(models.book, {
        as : "books",
        foreignKey : {
          name : "bookPurchased"
        }
      })
    }
  }
  simplycart.init({
    bookPurchased: DataTypes.INTEGER,
    idProfile: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'simplycart',
  });
  return simplycart;
};