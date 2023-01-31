import { Button } from "@mui/material";
import React, { useState } from 'react'
import { Intro } from "../../components/Intro";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Back = () => {

  const [reset, setReset] = useState(false)

  const resetGame = () => {
    setReset(true)
  };

  return (
    <>
      <Button
        onClick={resetGame}
        sx={{
          position: "fixed",
          top: { xs: "7px", md: "30px" },
          left: { xs: "7px", md: "30px" },
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </Button>
      {reset ? <Intro /> : null}
    </>
  );
};
