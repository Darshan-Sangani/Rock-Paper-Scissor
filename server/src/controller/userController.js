const { addUserName, addRoomCode, getUser } = require("../services/userService");

exports.addNewUser = async (req, res) => {
  try {
    const user = await addUserName(req.body.name);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.addRoomCode = async (req, res) => {
  try {
    const data = await addRoomCode(req.body.name, req.body.socketId, req.body.roomCode);
    res.status(200).json({ data });
  } catch (error) {
    console.trace(error)
    res.status(500).json({ message: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await getUser(req.body.socketId)
    res.status(200).json({ data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
}
