import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import imageNotFound from "./image_not_found.png";

interface Cat {
  id: string;
  dob: any;
  breed: string;
  gender: string;
  image_url: string;
  adoptable: boolean;
}

function AnimalGrid() {
  const [cats, setCats] = useState<Cat[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/"
        );
        setCats(response.data);
      } catch (error) {
        console.error(error);
        setTimeout(() => {
          fetchData();
        });
      }
    }
    fetchData();
  }, []);

  function checkAdoptable(cat: Cat): boolean {
    if (!cat.adoptable) {
      return true;
    }
    if (!token) {
      return true;
    }
    return false;
  }

  // Calculate the age of the cat
  const calculateAge = (dob: string) => {
    const dobDate = new Date(dob);
    const diff = Date.now() - dobDate.getTime();
    const age = (diff / 1000 / 60 / 60 / 24 / 365).toFixed(1);
    return age;
  };

  return (
    <div style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
      <Typography
        variant="h2"
        sx={{ mb: 4, textAlign: "center", paddingBottom: "5rem" }}
      >
        Adopt a Furry Friend
      </Typography>
      <Grid
        container
        spacing={8}
        sx={{
          paddingLeft: { xs: "1rem", md: "5rem", xl: "20rem" },
          paddingRight: { xs: "1rem", md: "5rem", xl: "20rem" },
        }}
      >
        {cats.map((cat) => (
          <Grid item xs={6} sm={4} md={3} key={cat.id}>
            <Card>
              <CardMedia
                // sx={{
                //   height: { xs: "10rem", md: "30rem", lg: "300px" },
                // }}
                component="img"
                alt={cat.breed}
                {...(cat.image_url
                  ? { image: cat.image_url }
                  : { src: imageNotFound })}
                onError={(e) => {
                  e.currentTarget.src = imageNotFound;
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {cat.breed}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Age: {calculateAge(cat.dob)}
                  <br />
                  Breed: {cat.breed}
                  <br />
                  Gender: {cat.gender}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={checkAdoptable(cat)}
                >
                  Adopt
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AnimalGrid;
