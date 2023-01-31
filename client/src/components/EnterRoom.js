import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import socket from "../Socket/SocketConnection"
import { ChoosePlay } from "./ChoosePlay";
import React, { useState } from "react";
import { CreateRoom } from "./CreateRoom";
import { get_total_players } from "../api/roomApi";
import { add_room_code } from "../api/userApi";

export const EnterRoom = () => {

  const [roomCode, setRoomCode] = useState("")
  const [roomId, setRoomId] = useState("")
  const [display, setDisplay] = useState("");
  const [createRoom, setCreateRoom] = useState(false)
  const [game, setGame] = useState(false)

  const enterRoom = async () => {
    console.log(roomCode.length)
    if (roomCode === null) {
      alert("Please enter a Valid Room Code")
      setCreateRoom(true)
      setDisplay("none");
    } else {
      socket.emit("joinRoom", roomCode)
      socket.on("getTotalPlayer", async (name, socketId, roomCode) => {
        const data = { roomCode }
        const players = await get_total_players(data)
        if (players !== 2) {
          const data = { name, socketId, roomCode }
          await add_room_code(data)
          socket.emit("storeRoom")
          socket.on("storeRoomCode", (roomCode) => {
            localStorage.setItem("roomCode", roomCode);
          });
          socket.emit("connectplayer")
          socket.on("playerConnected", () => {
            // console.log("from random room -> player connected")
          })
          setRoomId(roomCode)
          setGame(true)
        } else {
          setCreateRoom(true)
          setDisplay("none");
          alert("this room is not available")
        }
      })
    }
    setDisplay("none");
  }

  return (
    <>
      <Grid
        container
        justifyContent="space-evenly"
        alignSelf="center"
        alignContent="center"
        alignItems="center"
        direction="column"
        display={display}
        sx={{ width: "500px", height: "400px" }}
        className="animate__animated animate__fadeInUp glass-efect"
      >
        <h3 className="your-name">Enter Room Code</h3>

        <Formik
          initialValues={{ code: "" }}
          onSubmit={enterRoom}
        >
          <Form className="form">
            <TextField label="Enter Code" onChange={(e) => setRoomCode(e.target.value)} />
            <Button
              sx={{ fontSize: "20px", border: "solid 1px" }}
              type="submit"
            >
              Enter
            </Button>
          </Form>
        </Formik>
      </Grid>
      {createRoom ? <CreateRoom /> : game ? <ChoosePlay roomId={roomId} /> : null}
    </>
  );
};
