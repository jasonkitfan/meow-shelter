import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import axios from "axios";
import qs from "qs";

export default function AddCatDialog(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose } = props;
  const [name, setName] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBreedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBreed(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateOfBirth(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result?.toString() ?? "");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // Do something with the cat information
    console.log(
      `Saving cat: ${name}, ${breed}, ${gender}, ${dateOfBirth}, ${image}`
    );
    const data = {
      name: name,
      breed: breed,
      gender: gender,
      dateOfBirth: dateOfBirth,
      imageUrl: image,
    };
    axios
      .post(
        "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/",
        qs.stringify(data), // Use the 'qs' library to format the data as x-www-form-urlencoded
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Set the content type to x-www-form-urlencoded
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Cat</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="image-upload">
            <img src={image} alt="Cat" width={300} />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            id="breed"
            label="Breed"
            type="text"
            fullWidth
            value={breed}
            onChange={handleBreedChange}
          />
          <TextField
            margin="dense"
            id="gender"
            label="Gender"
            type="text"
            fullWidth
            value={gender}
            onChange={handleGenderChange}
          />
          <TextField
            margin="dense"
            id="date-of-birth"
            label="Date of Birth"
            type="date"
            fullWidth
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
