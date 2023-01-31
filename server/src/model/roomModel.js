const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");
const Room = sequelize.define(
  "room",
  {
    roomCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    players: {
      type: DataTypes.INTEGER,
      allowNull: false,
      max: 2,
    },
  },
  {
    createdAt: "create_at",
    updatedAt: "update_at",
    freezeTableName: true,
  }
);

module.exports = Room;
