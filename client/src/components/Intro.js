import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { FullnameField } from "./FullnameField"

export const Intro = () => {

  const [nameComponent, setNameComponent] = useState(false)
  const [display, setDisplay] = useState("");

  const enterName = () => {
    setDisplay("none");

    setNameComponent(true)

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
            onClick={enterName}
            variant="contained"
            sx={{
              width: "200px",
              height: "80px",
              fontSize: "24px",
              fontFamily: "Anton",
            }}
            data-test="new-game"
          >
            Play
          </Button>
        </Grid>
      </Grid>
      {nameComponent ? <FullnameField /> : null}
    </>
  );
};
