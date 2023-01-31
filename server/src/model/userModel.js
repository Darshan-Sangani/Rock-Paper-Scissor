const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");
const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    socketId: {
      type: DataTypes.STRING,
      unique: true,
    },
    roomCode: {
      type: DataTypes.STRING,
      references: {
        model: "room",
        key: "roomCode",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    createdAt: "create_at",
    updatedAt: "update_at",
    freezeTableName: true,
  }
);

module.exports = User;
