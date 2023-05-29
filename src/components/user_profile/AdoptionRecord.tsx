import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { Grid, Paper, Box, Container } from "@mui/material";
import { calculateAge } from "../../globalFunction/calculateAge";

interface adoptionRecord {
  catId: string;
  catName: string;
  catPickUpDate: string;
  catImageUrl: string;
  catDob: string;
  catBreed: string;
}

export default function AdoptionRecordList() {
  // call api to get the adoption record when the page is loaded
  const [cats, setCats] = useState<adoptionRecord[]>([]);

  /**
   * Calls the API to get the list of cats available for adoption when the page is loaded and sets the state of the component with the response data.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/adoptCat",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setTimeout(() => {
          fetchData();
        });
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ textAlign: "center", p: 5 }}>
        Adoption Record
      </Typography>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "50vh" }}
      >
        {cats.map((cat) => (
          <Grid item xs={8} key={cat.catId}>
            <Paper
              elevation={1}
              sx={{ display: "flex", alignItems: "center", p: 2 }}
            >
              <Avatar
                alt={cat.catName}
                src={cat.catImageUrl}
                sx={{ height: "100px", width: "100px" }}
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" color="text.primary">
                  {cat.catName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {calculateAge(cat.catDob)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Breed: {cat.catBreed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pick Up Date: {cat.catPickUpDate}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
