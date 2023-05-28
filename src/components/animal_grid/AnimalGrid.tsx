import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import imageNotFound from "./image_not_found.png";

export interface Cat {
  id: string;
  name: string;
  dob: any;
  breed: string;
  gender: string;
  image_url: string;
  adoptable: boolean;
}

function AnimalGrid() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [adoptingCat, setAdoptingCat] = useState<Cat | undefined>(undefined);
  const [pickUpDate, setPickUpDate] = useState("");
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

  // handle the adoption dialog
  const [open, setOpen] = useState(false);

  const handleOpen = (cat: Cat) => {
    setAdoptingCat({
      id: cat.id,
      name: cat.name,
      dob: cat.dob,
      breed: cat.breed,
      gender: cat.gender,
      image_url: cat.image_url,
      adoptable: cat.adoptable,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdopt = () => {
    console.log("adopting the cat");
    axios
      .post(
        "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/adoptCat",
        {
          id: adoptingCat?.id,
          name: adoptingCat?.name,
          breed: adoptingCat?.breed,
          gender: adoptingCat?.gender,
          dob: adoptingCat?.dob,
          imageUrl: adoptingCat?.image_url,
          pickUpDate: pickUpDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("success");
        console.log(response.data);
        handleClose();
        handleClickOpen2(response.data.status);
      })
      .catch((error) => {
        console.log(error);
        handleClose();
        handleClickOpen2(false);
      });
  };

  // handle pick up date
  const handleDateChange = (date: string) => {
    setPickUpDate(date);
    console.log(pickUpDate);
  };

  // Calculate the age of the cat
  const calculateAge = (dob: string) => {
    const dobDate = new Date(dob);
    const diff = Date.now() - dobDate.getTime();
    const age = (diff / 1000 / 60 / 60 / 24 / 365).toFixed(1);
    return age;
  };

  // handle second dialog
  const [open2, setOpen2] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen2 = (success: boolean) => {
    if (success) {
      setMessage("Your adoption is accepted!");
    } else {
      setMessage("This cat has been adopted!");
    }
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    window.location.reload();
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
                  {cat.name}
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
                  onClick={() => handleOpen(cat)}
                >
                  Adopt
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Adopt {adoptingCat?.name}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: 200 }}>
                <img
                  src={adoptingCat?.image_url}
                  alt={adoptingCat?.name}
                  style={{ width: "100%" }}
                />
              </Box>
              <Box sx={{ flexGrow: 1, ml: 2 }}>
                <div>Name: {adoptingCat?.name}</div>
                <div>Breed: {adoptingCat?.breed}</div>
                <div>Gender: {adoptingCat?.gender}</div>
                <div>Age:{calculateAge(adoptingCat?.dob)}</div>
                <div>Date of Birth: {adoptingCat?.dob}</div>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    required
                    label="Pick up date"
                    type="date"
                    onChange={(e) => handleDateChange(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdopt}>Adopt</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open2}>
          <DialogTitle>Message</DialogTitle>
          <DialogContent>
            <Typography>{message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2}>OK</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}

export default AnimalGrid;
