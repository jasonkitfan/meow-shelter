import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import axios from "axios";
import qs from "qs";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";

export default function AddCat() {
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
  };

  return (
    <Box maxWidth={500} mx="auto" marginTop={5}>
      <Typography variant="h4">Add a Cat</Typography>
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
        <FormGroup sx={{ mb: 2 }}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextField
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={name}
            onChange={handleNameChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <InputLabel htmlFor="breed">Breed</InputLabel>
          <TextField
            margin="dense"
            id="breed"
            type="text"
            fullWidth
            value={breed}
            onChange={handleBreedChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </FormGroup>
            </FormControl>
          </RadioGroup>

          <InputLabel htmlFor="date-of-birth">Date of Birth</InputLabel>
          <TextField
            margin="dense"
            id="date-of-birth"
            type="date"
            fullWidth
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormGroup>
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
