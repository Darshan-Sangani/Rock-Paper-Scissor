import React, { useState } from 'react';
import { Grid, Button } from "@mui/material";
import { Game } from '../pages/Game';
import socket from "../Socket/SocketConnection"
import { create_room } from "../api/roomApi"
import { add_room_code } from '../api/userApi';


export const CreateRoom = () => {

    const [display, setDisplay] = useState("");
    const [CreateRoom, setCreateRoom] = useState(false);
    const [roomCode, setRoomCode] = useState(null);

    const createRoom = async () => {
        const roomId = await create_room()
        socket.emit("createRoom", roomId)
        setRoomCode(roomId)
        socket.on("addRoomCode", async (data) => {
            await add_room_code(data)
        })
        socket.on("storeRoomCode", (roomCode) => {
            localStorage.setItem("roomCode", roomCode);
        });
        setDisplay("none")
        setCreateRoom(true)
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
                sx={{ width: "500px", height: "400px", margin: "20px" }}
                className="animate__animated animate__fadeInUp glass-efect"
            >
                <h3 className="your-name">Create Room</h3>
                <Button
                    onClick={createRoom}
                    type="submit"
                    sx={{ fontSize: "20px", border: "solid 1px" }}
                >
                    Create New Room
                </Button>
            </Grid>
            {CreateRoom ?
                <Game roomId={roomCode} />
                : null}
        </>
    );
};
