"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(modal) {
      // define association here
    }
  }
  Comment.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentableType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentableId: {
        type: DataTypes.UUID
      }
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
