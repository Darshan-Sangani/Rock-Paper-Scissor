import React from 'react'
import { Intro } from "../components/Intro"

import { Grid } from "@mui/material";

export const Welcome = () => {

  return (
    <Grid
      container
      justifyContent="center"
      height="100vh"
      width="100%"
      className="welcome"
      data-test="welcome-page"
    >
      <Intro />
    </Grid>
  );
};
