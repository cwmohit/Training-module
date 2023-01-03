"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Aadhar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(modal) {
      // define association here
      this.hasOne(modal.User, { foreignKey: "aadharId" }, { as: "aadharDetails" });
    }
  }
  Aadhar.init(
    {
      aadharNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Aadhar",
    }
  );
  return Aadhar;
};
