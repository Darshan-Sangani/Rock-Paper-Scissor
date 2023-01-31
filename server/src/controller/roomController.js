const {
  createRoom,
  getTotalPlayer,
  getAllRooms,
  removePlayers,
  allRecords
} = require("../services/roomService");

exports.createRoom = async (req, res) => {
  try {
    const roomData = await createRoom();
    res.status(201).json({ data: roomData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getTotalPlayer = async (req, res) => {
  try {
    const totalPlayer = await getTotalPlayer(req.body.roomCode);
    res.status(200).json({ totalPlayer: totalPlayer });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.joinRandomRoom = async (req, res) => {
  try {
    const rooms = await getAllRooms();
    if (rooms.length !== 0) {
      const room = rooms[0];
      return res.status(200).json({ rooms: room });
    }
    else {
      return res.status(200).json({ rooms: 0 });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.removePlayers = async (req, res) => {
  try {
    const data = await removePlayers(req.body.roomCode, req.body.socketId);
    res.status(200).json({ data });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error });
  }
};

exports.allRecords = async (req, res) => {
  try {
    const data = await allRecords();
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error })
  }
}
