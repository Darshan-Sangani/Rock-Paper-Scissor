import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { CreateRoom } from "./CreateRoom";
import socket from "../Socket/SocketConnection"
import { ChoosePlay } from "./ChoosePlay";
import { EnterRoom } from "./EnterRoom";
import { get_total_players, join_random_room } from "../api/roomApi";
import { add_room_code } from "../api/userApi";

export const RoomJoin = () => {

    const [roomId, setRoomId] = useState("")
    const [display, setDisplay] = useState("");
    const [enterRoom, setEnterRoom] = useState(false)
    const [createRoom, setCreateRoom] = useState(false)
    const [game, setGame] = useState(false)

    const joinRoom = () => {
        setDisplay("none");
        setEnterRoom(true)
    }
    const enterRandomRoom = async () => {
        const room = await join_random_room();
        if (room === 0) {
            setCreateRoom(true)
            setDisplay("none");
            alert("No Rooms available")
        } else {
            socket.emit("joinRandom", room)
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
                    socket.on("randomRoomId", (data) => {
                        setRoomId(data);
                    });
                    setGame(true)
                } else {
                    setCreateRoom(true)
                    alert("All rooms are full..")
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
                alignItems="center"
                alignContent="center"
                alignSelf="center"
                textAlign="center"
                direction="column"
                display={display}
                sx={{
                    height: "100%",
                }}
                data-test="intro-comp"
            >
                <h1 className="title" data-test="intro-title">
                    Rock, paper or scissors
                </h1>
                <h3 className="efect-machine">Welcome, let's play...</h3>
                <Grid
                    container
                    justifyContent="center"
                    sx={{ gap: "30px" }}
                    data-test="intro-buttons"
                >
                    <Button
                        variant="contained"
                        onClick={joinRoom}
                        sx={{
                            width: "200px",
                            height: "80px",
                            fontSize: "24px",
                            fontFamily: "Anton",
                        }}
                        data-test="new-game"
                    >
                        Have a Room Code ?
                    </Button>
                    <Button
                        onClick={enterRandomRoom}
                        variant="contained"
                        sx={{
                            width: "200px",
                            height: "80px",
                            fontSize: "24px",
                            fontFamily: "Anton",
                        }}
                        data-test="enter-room"
                    >
                        Join Random
                    </Button>
                </Grid>
            </Grid>
            {enterRoom ? <EnterRoom /> : null}
            {createRoom ? (<CreateRoom />) : game ? (<ChoosePlay roomId={roomId} />) : null}
        </>
    );
};
