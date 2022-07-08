'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cart.belongsTo(models.transactions, {
        as: "transactions",
        foreignKey:{
          name:"idTransaction"
        }
      })

      cart.belongsTo(models.book, {
        as: "book",
        foreignKey:{
          name:"bookPurchased"
        }
      })
    }
  }
  cart.init({
    idTransaction: DataTypes.INTEGER,
    attachment: DataTypes.STRING,
    bookPurchased: DataTypes.INTEGER,
    totalPayment: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};