import React, { useState } from 'react';
import { Grid, Button } from "@mui/material";
import { ChoosePlay } from "./ChoosePlay";

export const ResultPlay = (props) => {

  const [display, setDisplay] = useState("");
  const [playAgain, setPlayAgain] = useState(false);

  const PlayAgain = () => {
    setDisplay("none");
    setPlayAgain(true);
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
        <h3 className="your-name">{props.winner}</h3>
        <Button
          onClick={PlayAgain}
          type="submit"
          sx={{ fontSize: "20px", border: "solid 1px" }}
        >
          Play Again
        </Button>
      </Grid>
      {playAgain ?
        <ChoosePlay roomId={props.roomId} player1={props.player1} />
        : null}
    </>
  );
};
