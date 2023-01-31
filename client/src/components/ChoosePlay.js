import { useState } from "react";
import { Button, Grid } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import NoteIcon from "@mui/icons-material/Note";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Divider from "@mui/material/Divider";
import socket from "../Socket/SocketConnection"
import { get_user } from "../api/userApi";
import { ResultPlay } from "./ResultPlay";

export const ChoosePlay = (props) => {

  const [display, setDisplay] = useState("")
  const [message, setMessage] = useState("")
  const [winner, setWinner] = useState("")
  const [efectRock, setEfectRock] = useState("");
  const [efectPaper, setEfectPaper] = useState("");
  const [efectSccisor, setEfectSccisor] = useState("");
  const [selectedRock, setSelectedRock] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(false);
  const [selectedSccisor, setSelectedSccisor] = useState(false);

  const sendChoice = (choice) => {
    const choiceEvent = props.player1 ? "p1Choice" : "p2Choice";
    socket.emit(choiceEvent, {
      choice: choice,
      roomId: props.roomId,
    });
  }

  socket.on("p1Choice", (data) => {
    if (!props.player1) {
      createOpponentChoiceButton(data);
    }
  });

  socket.on("p2Choice", (data) => {
    if (props.player1) {
      createOpponentChoiceButton(data);
    }
  });

  const createOpponentChoiceButton = (data) => {
    setMessage("Opponent made the choice..")
  }

  socket.on("result", async (winner) => {
    if (winner.winner !== "d") {
      if (winner.winner === "p1") {
        const data = { socketId: winner.player1SocketId };
        const player = await get_user(data)
        setWinner(`${player} win`)
        setDisplay("none")
      } else {
        const data = { socketId: winner.player2SocketId };
        const player = await get_user(data)
        setWinner(`${player} win`)
        setDisplay("none")
      }
    } else {
      setWinner(`It's a draw`)
      setDisplay("none")
    }
  });

  return (
    <>
      <Grid
        container
        justifyContent="space-around"
        direction="column"
        sx={{ height: "100%", width: "100%" }}
        display={display}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          height="100%"
        >
          <Grid
            container
            justifyContent="space-evenly"
            alignSelf="center"
            alignContent="center"
            alignItems="center">

            {!winner ? <h2>{message} </h2> : null}
          </Grid>
          <Divider variant="middle" />
          <Grid container justifyContent="space-evenly">
            <Button
              onClick={() => {
                setSelectedRock(true);
                sendChoice("Rock");
                setEfectRock("animate__animated animate__shakeY");

              }}
              className={efectRock}
              sx={{
                backgroundColor: selectedRock ? "green" : "",
              }}
              disabled={selectedPaper || selectedRock || selectedSccisor}
              data-test="Rock"
            >
              <Brightness1Icon sx={{ fontSize: { md: 100, xs: 70 } }} />
            </Button>

            <Button
              onClick={() => {
                setSelectedPaper(true);
                sendChoice("Paper");
                setEfectPaper("animate__animated animate__shakeY");
              }}
              className={efectPaper}
              sx={{
                backgroundColor: selectedPaper ? "green" : "",
              }}
              disabled={selectedPaper || selectedRock || selectedSccisor}
              data-test="Paper"
            >
              <NoteIcon sx={{ fontSize: { md: 100, xs: 70 } }} />
            </Button>

            <Button
              onClick={() => {
                setSelectedSccisor(true);
                sendChoice("Scissor");
                setEfectSccisor("animate__animated animate__shakeY");
              }}
              className={efectSccisor}
              sx={{
                backgroundColor: selectedSccisor ? "green" : "",
              }}
              disabled={selectedPaper || selectedRock || selectedSccisor}
              data-test="Scissor"
            >
              <ContentCutIcon sx={{ fontSize: { md: 100, xs: 70 } }} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {winner ? <ResultPlay roomId={props.roomId} player1={props.player1} winner={winner} />
        // <Button
        //   onClick={createRoom}
        //   type="submit"
        //   sx={{ fontSize: "20px", border: "solid 1px" }}
        // >
        //   Play Again
        // </Button> 
        : null}
    </>
  );
};
