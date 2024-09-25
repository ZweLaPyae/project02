"use client";
import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar'; // Adjust the import path

function Destinations() {
  const [destinationsData, setDestinationsData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [newDestination, setNewDestination] = React.useState({ countryName: '', name: '', price: '', description: '', mediaUrl: '' });

  React.useEffect(() => {
    // Fetch destinations from the API
    fetch('/api/destinations')
      .then(response => response.json())
      .then(data => {
        setDestinationsData(data);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
      });
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch('/api/destinations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Remove the deleted destination from the state
        setDestinationsData(prevData => prevData.filter(destination => destination._id !== id));
      } else {
        console.error('Failed to delete destination');
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDestination({ ...newDestination, [name]: value });
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/destinations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDestination),
      });

      if (response.ok) {
        const addedDestination = await response.json();

        // Fetch updated destinations
        const updatedResponse = await fetch('/api/destinations');
        if (updatedResponse.ok) {
          const updatedDestinations = await updatedResponse.json();
          setDestinationsData(updatedDestinations);
        } else {
          console.error('Failed to fetch updated destinations');
        }

        setNewDestination({ countryName: '', name: '', price: '', description: '', mediaUrl: '' });
        setOpen(false);
      } else {
        console.error('Failed to add destination');
      }
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          All Destinations
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Destination
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add a New Destination</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below to add a new destination.
            </DialogContentText>
            <Box component="form" onSubmit={handleAddDestination} sx={{ mt: 2 }}>
              <TextField
                label="Country Name"
                name="countryName"
                value={newDestination.countryName}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Destination Name"
                name="name"
                value={newDestination.name}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Image URL"
                name="mediaUrl"
                value={newDestination.mediaUrl}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                name="description"
                value={newDestination.description}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Price"
                name="price"
                value={newDestination.price}
                onChange={handleChange}
                required
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add Destination
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
        <Grid marginTop={5} container spacing={4}>
          {destinationsData.map((destination, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: 'rgba(45, 46, 46, 0.4)', // Transparent black background
                  backdropFilter: 'blur(10px)', // Blur for glass effect
                  borderRadius: '10px', // Rounded corners for the card
                  boxShadow: '0 10px 30px rgba(76, 77, 77, 0.5)', // Soft shadow for depth
                  border: '2px solid rgba(255, 255, 255, 0.2)', // Border to enhance the glass effect
                  color: 'white', // Ensure text is visible on dark background
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                  image={destination.mediaUrl}
                  alt={destination.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {destination.name}
                  </Typography>
                  <Typography variant="body2" color="white" gutterBottom>
                    {destination.countryName}
                  </Typography>
                  <Typography variant="body2" color="white" gutterBottom>
                    {destination.description}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {destination.price} THB
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      mt: 2,

                      backgroundColor: 'rgba(107, 28, 33, 0.6)', // Dark transparent background
                      color: 'white', // White text color for contrast
                      borderRadius: '8px', // Rounded corners
                      boxShadow: '0 0 20px rgba(255, 92, 100, 0.2)', // Soft shadow for depth
                      transition: '0.3s ease-in-out', // Smooth transition
                      '&:hover': {
                        backgroundColor: 'rgba(227, 36, 46, 0.8)', // Darker on hover
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)', // Glow effect on hover
                      },
                    }}
                    onClick={() => handleDeleteClick(destination._id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Destinations;