'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      book.belongsTo(models.user, {
        as: 'user',
        foreignKey : {
          name : 'idUser'
        }
      })

      book.hasMany(models.transactions, {
        as:"transactions",
        foreignKey:{
          name:"idBook"
        }
      })

      book.hasMany(models.promoBook, {
        as:"promoBook",
        foreignKey:{
          name:"promoBooks"
        }
      })

      book.hasMany(models.simplycart, {
        as:"simplycart",
        foreignKey:{
          name:"bookPurchased"
        }
      })

}
}
  book.init({
    title: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    pages: DataTypes.INTEGER,
    ISBN: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    bookAttachment: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};