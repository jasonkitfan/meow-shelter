import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const UserProfile = () => {
  const [open, setOpen] = useState(false); // state to control the dialog window
  const [open2, setOpen2] = useState(false);
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [newRole, setNewRole] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("handle save");
    changeUserInfo();
  };

  const handleRoleChange = (e: React.FormEvent) => {
    e.preventDefault();
    changeUserRole();
  };

  /**
   * Sends a request to change the role of a user and updates the state of the component with the new role.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const changeUserRole = async () => {
    try {
      const response = await axios.post(
        "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/userRole",
        {
          code: code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("success");
      if (response.data.status === "success") {
        setNewRole(response.data.role);
        setStatus(true);
        handleClose();
        handleOpen2();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Sends a request to change the user information and logs the response.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const changeUserInfo = async () => {
    try {
      const response = await axios.post(
        "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/userInfo",
        {
          name: name,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Calls the API to get the user information when the page is loaded and sets the state of the component with the response data.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/userInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3} maxWidth="sm">
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              User Profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSave}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container xs={12} spacing={2} alignItems="center">
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        label="Role"
                        name="role"
                        value={role}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                      >
                        Modify
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "1rem" }}
              >
                Save Changes
              </Button>
            </form>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          sx={{
            display: role === "employee" ? "grid" : "none",
            gridTemplateRows: "auto 1fr",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid item sx={{ height: 1, backgroundColor: "divider" }} />
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/addNewCat")}
            >
              Add New Cat
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/modifyCat")}
            >
              Modify Cat Information
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>change user role</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              label="Identify Code"
              type="text"
              fullWidth
              onChange={(e) => setCode(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRoleChange}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>
          {status ? "Update Role Succeed!" : "Failed to Update!"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {status
              ? `Your new role is: ${newRole}`
              : "Check if your code is valid or contact the shelter"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile;
