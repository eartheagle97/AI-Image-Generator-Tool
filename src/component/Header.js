import { Grid, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Grid item xs={12} mt={12}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: 800, textAlign: "center", color: "white" }}
      >
        AI Image Generator Tool
      </Typography>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", color: "white" }}
        mt={2}
      >
        Convert your text into an image within a second using this Tool.
      </Typography>
    </Grid>
  );
};

export default Header;
