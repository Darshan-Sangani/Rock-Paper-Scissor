const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");

const cors = require("cors")
const roomRoutes = require("./src/routes/roomRoutes");
const userRoutes = require("./src/routes/userRoutes");
const io = socketio(server, {
  cors: {
    origin: "http://192.168.29.71:3000",
    method: ["GET", "POST", "PUT"]
  }
});
const rooms = {};

const port = 5000;

require("./src/database/index");
app.use(cors());
app.use(express.json());

app.use("/v1/room", roomRoutes);
app.use("/v1/user", userRoutes);

let player1SocketId;
let player2SocketId;

io.on("connection", (socket) => {

  let socketId;
  let roomId;

  socket.on("userName", async (name) => {
    socketId = socket.id


    //craete room
    socket.on("createRoom", async (roomCode) => {
      roomId = roomCode
      player1SocketId = socketId
      data = {
        name,
        socketId,
        roomCode
      }
      // console.log("roomId from craete room ->", roomId)
      // console.log("from crrate room->", data)
      socket.emit("addRoomCode", data)
      socket.emit("storeRoomCode", roomId);
      rooms[roomId] = {};
      socket.join(roomId);
      socket.emit("room", roomId)
      socket.emit("newGame", { roomId: roomId });
    });

    //join room
    socket.on("joinRoom", async (roomCode) => {
      roomId = roomCode
      if (rooms[roomId]) {
        socket.emit("getTotalPlayer", name, socketId, roomId)
        id = socket.id;
        player2SocketId = socketId
        socket.on("storeRoom", () => {
          socket.emit("storeRoomCode", roomId);
        })
        socket.join(roomId);
        socket.on("connectplayer", () => {
          socket.to(roomId).emit("playerConnected", {});
        })
      }
    });

    //join random-room
    socket.on("joinRandom", async (roomCode) => {
      roomId = roomCode
      if (rooms[roomId]) {
        socket.emit("getTotalPlayer", name, socketId, roomId)
        id = socket.id;
        player2SocketId = socketId
        socket.on("storeRoom", () => {
          socket.emit("storeRoomCode", roomId);
        })
        socket.join(roomId);
        socket.on("connectplayer", () => {
          socket.to(roomId).emit("playerConnected", {});
          socket.emit("randomRoomId", roomId);
        })
      }
    });
  });

  socket.on("p1Choice", (data) => {
    const { choice, roomId } = data;
    rooms[roomId].p1Choice = choice;
    socket.to(roomId).emit("p1Choice", { choice: choice });
    if (rooms[roomId].p2Choice != null) {
      declareWinner(roomId);
    }
  });

  socket.on("p2Choice", (data) => {
    const { choice, roomId } = data;
    rooms[roomId].p2Choice = choice;
    socket.to(roomId).emit("p2Choice", { choice: choice });
    if (rooms[roomId].p1Choice != null) {
      declareWinner(roomId);
    }
  });

  socket.on("disconnect", async () => {
    id = socket.id;
    io.emit("userDisconnected", id)
    console.log("user Disconnected");
  });
});

function declareWinner(roomId) {
  let p1Choice = rooms[roomId].p1Choice;
  let p2Choice = rooms[roomId].p2Choice;
  let winner = null;
  if (p1Choice === p2Choice) {
    winner = "d";
  } else if (p1Choice == "Paper" && p2Choice == "Scissor") {
    winner = "p2";
  } else if (p1Choice == "Paper" && p2Choice == "Rock") {
    winner = "p1";
  } else if (p1Choice == "Scissor" && p2Choice == "Paper") {
    winner = "p1";
  } else if (p1Choice == "Scissor" && p2Choice == "Rock") {
    winner = "p2";
  } else if (p1Choice == "Rock" && p2Choice == "Paper") {
    winner = "p2";
  } else if (p1Choice == "Rock" && p2Choice == "Scissor") {
    winner = "p1";
  }
  if (winner === "p1") {
    io.sockets.to(roomId).emit("result", {
      winner, player1SocketId
    });
  }
  if (winner === "p2") {
    io.sockets.to(roomId).emit("result", {
      winner, player2SocketId
    });
  } if (winner === "d") {
    io.sockets.to(roomId).emit("result", {
      winner,
    });
  }
  rooms[roomId].p1Choice = null;
  rooms[roomId].p2Choice = null;
}

server.listen(port, () =>
  console.log(`App listening on port ${port}!`)
);
