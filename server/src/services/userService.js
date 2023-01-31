const User = require("../model/userModel");
const Room = require("../model/roomModel");

exports.addUserName = async (name) => {
  const user = await User.create({ name });
  return user;
};

exports.addRoomCode = async (name, socketId, roomCode) => {
  const user = await User.update({ socketId, roomCode }, { where: { name } });
  const room = await Room.findOne({ where: { roomCode } });
  let players = room.dataValues.players + 1;
  await Room.update({ players }, { where: { roomCode } });
  return user;
};

exports.getUser = async (socketId) => {
  const user = await User.findOne({ where: { socketId } });
  return user;
}
