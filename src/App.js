import { Container, Grid, Skeleton } from "@mui/material";
import { useState } from "react";
import Background from "./background.webp";
import Form from "./component/Form";
import Header from "./component/Header";
import Footer from "./component/Footer";

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
          <Header />
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            inputData={inputData}
          />
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
        <Footer />
      </Container>
    </>
  );
}

export default App;
