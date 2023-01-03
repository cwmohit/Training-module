'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Aadhar, UserRole, Address }) {
      // define association here
      this.belongsTo(Aadhar, { foreignKey: "aadharId" }, { as: "userDetails" });
      this.hasMany(UserRole, { foreignKey: "userId" }, { as: "userDetails" });
      this.hasMany(Address, { foreignKey: "userId" }, { as: "userDetails" });
    }
  }
  User.init({
    fullname: {
      type: DataTypes.STRING
    },
    country_code: {
      type: DataTypes.INTEGER
    },
    aadharId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};