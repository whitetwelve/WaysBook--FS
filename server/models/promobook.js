'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promoBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      promoBook.belongsTo(models.book, {
        as : "book",
        foreignKey : {
          name : "promoBooks"
        }
      })
    }
  }
  promoBook.init({
    promoBooks: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'promoBook',
  });
  return promoBook;
};