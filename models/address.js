'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(modal) {
      // define association here
      this.belongsTo(modal.User, { foreignKey: "userId" }, { as: "userDetails" })
    }
  }
  Address.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};