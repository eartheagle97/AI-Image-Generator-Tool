import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import Background from "./background.webp";

const OPENAI_API_KEY = "";

function App() {
  const [inputData, setInputData] = useState({
    prompt: "",
    n_image: 4,
  });

  const [genOutput, setGenOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (inputData.prompt.trim() === "") {
      return alert("Please enter prompts.");
    }
    setGenOutput([]);
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: inputData.prompt,
            n: inputData.n_image,
            size: "1024x1024",
            response_format: "b64_json",
          }),
        }
      );

      if (!response.ok)
        throw new Error("Failed to generate Image! Please try again.");

      const { data } = await response.json();
      setGenOutput(data);
    } catch (error) {
      alert("Error Generating Images");
      window.location.reload(true);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="md">
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
            <FormControl
              sx={{ minWidth: 150, marginX: "10px" }}
              variant="standard"
            >
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
        </Container>
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={2} marginTop={6} marginBottom={12}>
          {genOutput.length > 0
            ? Array.from({ length: genOutput.length }, (_, index) => (
                <Grid item xs={6} sx={{ display: "flex" }} key={index}>
                  <img
                    src={`data:image/jpeg;base64,${genOutput[index].b64_json}`}
                    loading="lazy"
                    alt={`generated img ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))
            : loading
            ? Array.from({ length: inputData.n_image }, (_, index) => (
                <Grid item key={index} xs={6}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    height={570}
                    width={570}
                  />
                </Grid>
              ))
            : ""}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center", padding: "20px" }}>
              Copyright © {new Date().getFullYear()} Kairav Patel. All rights
              reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
