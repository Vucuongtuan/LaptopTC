import { Paper, Box, LinearProgress, Toolbar, Typography } from "@mui/material";

const Loading = () => {
  return (
    <>
      <Paper
        sx={{
          pointerEvents: "none",
          transition: "all .3s ease",
          top: 0,
          position: "fixed",

          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <LinearProgress />
        <Toolbar />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography fontWeight="700" fontSize="1.7rem">
            <span style={{ color: "red" }}> Laptop</span>_TC
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Loading;
