"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(modal) {
      // define association here
      this.belongsTo(
        modal.User,
        { foreignKey: "userId" },
        { as: "userDetails" }
      );
      this.belongsTo(
        modal.Role,
        { foreignKey: "roleId" },
        { as: "roleDetails" }
      );
    }
  }
  UserRole.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
    }
  );
  return UserRole;
};
