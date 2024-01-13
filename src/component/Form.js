import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const Form = ({ handleChange, handleSubmit, inputData }) => {
  return (
    <Grid
      item
      xs={12}
      mt={6}
      mb={12}
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        padding: "10px",
        borderRadius: "50px",
      }}
    >
      <TextField
        variant="standard"
        value={inputData.prompt}
        name="prompt"
        placeholder="Describe what you want to see"
        onChange={handleChange}
        sx={{ marginX: "10px" }}
        fullWidth
      />
      <FormControl sx={{ minWidth: 150, marginX: "10px" }} variant="standard">
        <Select
          onChange={handleChange}
          name="n_image"
          value={inputData.n_image}
        >
          <MenuItem value={1}>1 Image</MenuItem>
          <MenuItem value={2}>2 Images</MenuItem>
          <MenuItem value={3}>3 Images</MenuItem>
          <MenuItem value={4}>4 Images</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          paddingX: "40px",
          marginX: "10px",
          fontSize: "1rem",
          fontWeight: "500",
          outline: "none",
          background: "#4949E7",
          color: "white",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        Generate
      </Button>
    </Grid>
  );
};

export default Form;
