// import { CircularProgress, Grid, Typography } from "@mui/material";
// import React, { useEffect, useLayoutEffect, useState } from "react"
import { Grid, Typography } from "@mui/material";
// import { useStore } from "../hooks/useStore";
import Divider from "@mui/material/Divider";
// import PersonIcon from "@mui/icons-material/Person";
// import { Back } from "../ui/components/Back";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Layout = ({ title, children }) => {

  return (
    <Grid
      container
      alignItems="center"
      alignSelf="center"
      direction="column"
      justifyContent="center"
      width="100%"
      sx={{ height: "100vh", padding: 1, gap: "10px" }}
      className="welcome"
    >
      <Grid
        container
        className="box-shadow"
        justifyContent="space-between"
        sx={{
          // backgroundColor:
          //   resultGame === "win"
          //     ? "#66BB6A"
          //     : resultGame === "lost"
          //       ? "#EF5350"
          //       : resultGame === "tie"
          //         ? "#FFCC80"
          //         : "white",
          opacity: "0.8",
          padding: 3,
          borderRadius: 2,
          height: { md: 550, xs: 400 },
          width: { md: 550, xs: 320 },
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          className="animate__animated animate__fadeIn"
          height="60px"
        >
          <Typography
            variant="h5"
            sx={{ mb: 1, alignContent: "center" }}
            textAlign="center"
          >
            {title}
            <Divider variant="middle" />
          </Typography>
        </Grid>
        <Grid justifyContent="space-evenly" alignItems="center" width="100%">
          {children}
        </Grid>
      </Grid>
      {/* <Grid
        container
        direction="column"
        sx={{
          display: "inherit",
          location.pathname === "/game" || location.pathname === "/result"
          ? "inherit"
          : "none",
          width: { md: 550, xs: 320 },
          opacity: "0.8",
          padding: 2,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >

        <Grid container direction="row">
          <strong
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Players:
          </strong>
          <i
            style={{
              color: "green",
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <PersonIcon sx={{ margin: "10px" }} />
            {player1.name || (
              <CircularProgress size={"20px"} />
            )}
          </i>
          <i
            style={{
              color: "green",
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <PersonIcon sx={{ margin: "10px" }} />
            {firstRound
              ? dataRoom.jugador2?.name ||
              dataRoom.jugador2?.fullName || (
                <CircularProgress size={"20px"} />
              )
              : (!firstRound && dataRoom.jugador2?.fullName) ||
              dataRoom.jugador2?.nam}
          </i>
        </Grid>
      </Grid> */}
      {/* <Back>
        <ArrowBackIcon sx={{ fontSize: { xs: "40px", md: "80px" } }} />
      </Back> */}
    </Grid>
  );
};
