import { Grid } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { ChoosePlay } from "../components/ChoosePlay";
import { Layout } from "../layout/Layout";
import { get_total_players } from "../api/roomApi";

export const Game = (props) => {

  const player1 = true
  const [player2, setPlayer2] = useState(false);

  useLayoutEffect(() => {
    const data = { roomCode: props.roomId }
    if (!player2) {
      const player2Interval = setInterval(() => {
        const setPlayer = async () => {
          // const player = await axios.post("http://localhost:5000/v1/room/getTotalPlayer", data)
          const player = await get_total_players(data)
          if (player === 2) setPlayer2(true);
        }
        setPlayer()
      }, 1000);
      return () => clearInterval(player2Interval);
    }
  }, [player2])


  return (

    player2 ? <ChoosePlay player1={player1} roomId={props.roomId} /> :

      <Layout title="Rock, paper or scissors" >
        <Grid
          container
          justifyContent="center"
          alignContent="start"
          sx={{
            height: "100%",
          }}
        >
          <h2 className="animate__animated animate__fadeIn">
            Share the code: {props.roomId} with your opponent
          </h2>
        </Grid>

      </Layout >
  )

};
