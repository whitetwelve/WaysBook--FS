'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      profiles.belongsTo(models.user, {
        as : "Data User",
        foreignKey : {
          name : "idUser"
        }
      })

      profiles.hasMany(models.simplycart, {
        as : "simplycart",
        foreignKey : {
          name : "idProfile"
        }
      })
    }
  }
  profiles.init({
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.TEXT,
    idUser: DataTypes.INTEGER,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profiles',
  });
  return profiles;
};