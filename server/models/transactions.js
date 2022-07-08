'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactions.belongsTo(models.book, {
        as: "bookPurchased",
        foreignKey: {
          name: "idBook",
        },
      });

      transactions.belongsTo(models.user, {
        as: "user",
        foreignKey:{
          name:"idUser"
        }
      })

    }
  }
  transactions.init({
    idUser: DataTypes.INTEGER,
    attachment: DataTypes.STRING,
    idBook: DataTypes.INTEGER,
    totalPayment: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};