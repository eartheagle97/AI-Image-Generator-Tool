import { Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{ textAlign: "center", padding: "20px" }}>
          Copyright © {new Date().getFullYear()} Kairav Patel. All rights
          reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
