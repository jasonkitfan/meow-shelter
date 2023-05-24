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
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <Card>
              <CardMedia
                component="img"
                height="200rem"
                alt={cat.breed}
                {...(cat.image_url
                  ? { image: cat.image_url }
                  : { src: imageNotFound })}
                onError={(e) => {
                  e.currentTarget.src = imageNotFound;
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cat.breed}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Age: {calculateAge(cat.dob)}
                  <br />
                  Breed: {cat.breed}
                  <br />
                  Gender: {cat.gender}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
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
