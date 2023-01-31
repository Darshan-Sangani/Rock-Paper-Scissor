import React, { useState } from 'react';
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { RoomJoin } from "./RoomJoin.js"
import socket from '../Socket/SocketConnection.js';
import { add_user } from "../api/userApi"


export const FullnameField = () => {

  const [name, setName] = useState("");
  const [display, setDisplay] = useState("");
  const [joinRoom, setJoinRoom] = useState(false)

  const playerName = async () => {
    if (name === "") {
      alert("Please enter a name")
    } else {
      setDisplay("none");
      const data = { name }
      await add_user(data)
        .then(() => {
          socket.emit("userName", name);
          setJoinRoom(true)
        })
        .catch((error) => console.log(error))
    }
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

        <Formik initialValues={{ name: "" }} >
          <Form className="form" id="form-name">
            <h3 className="your-name">Your Name</h3>
            <TextField label="Enter Name" onChange={(e) => setName(e.target.value)} />

            <Button
              onClick={playerName}
              type="submit"
              sx={{ fontSize: "20px", border: "solid 1px" }}
            >
              Start
            </Button>
          </Form>
        </Formik>
      </Grid>
      {joinRoom ? <RoomJoin /> : null}
    </>
  );
};
