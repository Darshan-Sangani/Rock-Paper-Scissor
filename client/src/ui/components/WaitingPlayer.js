import { CircularProgress, Grid } from "@mui/material";
import { Layout } from "../../layout/Layout";

export const WaitingPlayer = () => {



  return (
    <>
      <Layout title="Time to wait">
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          direction="column"
          sx={{
            height: "100%",
          }}
        >
          {/* {player === 1 ? (
            <h3 style={{ fontSize: "25px" }}>
              Waiting {dataRoom.jugador2?.fullName} play...
            </h3>
          ) : (
            <h3 style={{ fontSize: "25px" }}>
              Waiting {dataRoom.jugador1?.fullName} play...
            </h3>
          )} */}
          <CircularProgress color="success" />
        </Grid>
      </Layout>
    </>
  );
};
