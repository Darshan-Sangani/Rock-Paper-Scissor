import React from 'react';
import { AppRoutes } from './routes/AppRoutes';

import { AppTheme } from "./theme/AppTheme";
import socket from "./Socket/SocketConnection"
import { remove_player } from './api/roomApi';

function App() {
  socket.on("userDisconnected", async (id) => {
    let roomCode = localStorage.getItem("roomCode")
    if (roomCode) {
      const data = { roomCode, socketId: id }
      // await axios.put("http://192.168.29.71:5000/v1/room/removePlayers", data)
      await remove_player(data)
      // if (res) localStorage.removeItem("roomCode")
    }
  });
  return (
    <AppTheme>
      <AppRoutes />
    </AppTheme>
  );
}

export default App;
