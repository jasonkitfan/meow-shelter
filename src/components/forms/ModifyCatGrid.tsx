import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Cat } from "../animal_grid/AnimalGrid";
import axios from "axios";

function ModifyCatGrid() {
  // pop up the cat information dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  // update cat information
  const [catId, setCatId] = useState("");
  const [catName, setCatName] = useState("");
  const [catBreed, setCatBreed] = useState("");
  const [catGender, setCatGender] = useState("");
  const [catDob, setCatDob] = useState("");
  const token = localStorage.getItem("token");

  // confirm delete dialog
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  // insert the data into the dialog
  const handleClick = (cat: Cat) => {
    setCatId(cat.id);
    setCatName(cat.name);
    setCatBreed(cat.breed);
    setCatGender(cat.gender);
    setCatDob(cat.dob);
    setSelectedCat(cat);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCat(null);
  };

  // call api to get the cat information when the page is loaded
  const [cats, setCats] = useState<Cat[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/"
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

  // call api to update the cat info
  const handleUpdate = async (cat: Cat) => {
    console.log("update cat");

    try {
      const response = await axios.post(
        "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/modifyCat",
        {
          id: cat.id,
          name: catName,
          breed: catBreed,
          gender: catGender,
          dob: catDob,
          image_url: cat.image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("success");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // call api to delete the cat in db
  const handleDelete = async (docId: string) => {
    try {
      const response = await axios.delete(
        `https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/${docId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("success");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container spacing={2} p={20}>
        {cats.map((cat, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            onClick={() => handleClick(cat)}
          >
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={cat.image_url}
                alt={cat.name}
                style={{ maxWidth: "100%" }}
              />
              <span>{cat.name}</span>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        {selectedCat && (
          <>
            <DialogContent sx={{ display: "flex" }}>
              <img
                src={selectedCat.image_url}
                alt={selectedCat.name}
                style={{ marginRight: "16px", maxWidth: "50%" }}
              />
              <form>
                <TextField
                  label="Name"
                  value={catName}
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={(e) => setCatName(e.target.value)}
                />
                <TextField
                  label="Breed"
                  value={catBreed}
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={(e) => setCatBreed(e.target.value)}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={catGender}
                    onChange={(e) => setCatGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Date of Birth"
                  value={catDob}
                  fullWidth
                  type="date"
                  sx={{ mb: 2 }}
                  onChange={(e) => setCatDob(e.target.value)}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleUpdate(selectedCat)}
                    style={{ marginRight: "8px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteOpen}
                  >
                    Delete
                  </Button>
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Dialog open={dialogDeleteOpen} onClose={handleDeleteClose}>
        <DialogContent>
          <Typography>Confrim to delete this cat?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(catId)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModifyCatGrid;
