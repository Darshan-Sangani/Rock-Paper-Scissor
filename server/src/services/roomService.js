const { createRoomId } = require("../helper/createRoomId");
const Room = require("../model/roomModel");
const User = require("../model/userModel")
const records = require("../nda.json")

exports.createRoom = async () => {
  room_code = createRoomId(4);
  let count = 0;
  const data = await Room.create({ roomCode: room_code, players: count });
  return data;
};

exports.getTotalPlayer = async (roomCode) => {
  const data = await Room.findOne({ where: { roomCode } });
  return data.dataValues.players;
};

exports.getAllRooms = async () => {
  const data = await Room.findAll({ where: { players: 1 } });
  const rooms = data.map((data) => {
    roomCode = data.dataValues.roomCode;
    return roomCode;
  });
  return rooms;
};

exports.removePlayers = async (roomCode, socketId) => {
  if (roomCode && socketId) {

    const room = await Room.findOne({ where: { roomCode } });
    if (room) {
      players = room.dataValues.players;
      players = players - 1;
      await User.destroy({ where: { socketId } })
      if (players !== 0) {
        const data = await Room.update({ players }, { where: { roomCode } });
        return data;
      } else {
        const data = await Room.destroy({ where: { roomCode } });
        return data;
      }
    }
  }
  return false
};

exports.allRecords = async () => {
  const data = await records;
  return data
}
