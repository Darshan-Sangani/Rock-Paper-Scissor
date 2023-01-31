const express = require("express");
const { addNewUser, addRoomCode, getUser } = require("../controller/userController");
const router = express.Router();

router.route("/newUser").post(addNewUser);

router.route("/addRoomCode").put(addRoomCode);

router.route("/getUser").post(getUser)

module.exports = router;
