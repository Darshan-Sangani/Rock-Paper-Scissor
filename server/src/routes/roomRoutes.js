const express = require("express");
const {
  createRoom,
  getTotalPlayer,
  joinRandomRoom,
  removePlayers,
  allRecords
} = require("../controller/roomController");
const router = express.Router();

router.route("/createRoom").post(createRoom);

router.route("/getTotalPlayer").post(getTotalPlayer);

router.route("/joinRandomRoom").get(joinRandomRoom);

router.route("/removePlayers").put(removePlayers);

router.route("/getAllRecords").get(allRecords)

module.exports = router;
