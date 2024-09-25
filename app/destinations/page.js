"use client";
import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar'; // Adjust the import path

function Destinations() {
  const [destinationsData, setDestinationsData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [newDestination, setNewDestination] = React.useState({ country: '', name: '', price: '', description: '', mediaUrl: '' });

  React.useEffect(() => {
    // Fetch destinations from the API
    fetch('/api/destinations')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.reduce((acc, destination) => {
          const countryKey = destination.country.toLowerCase();
          if (!acc[countryKey]) {
            acc[countryKey] = [];
          }
          acc[countryKey].push(destination);
          return acc;
        }, {});
        setDestinationsData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
      });
  }, []);

  const handleAddClick = (destinationName) => {
    // Implement add functionality (e.g., add to wishlist, cart, or bookings)
    alert(`${destinationName} added to your list!`);
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
        const countryName = addedDestination.countryName.toLowerCase();
  
        // Fetch updated destinations for the specific country
        const updatedResponse = await fetch(`/api/destinations/${countryName}`);
        if (updatedResponse.ok) {
          const updatedDestinations = await updatedResponse.json();
          setDestinationsData(prevData => ({
            ...prevData,
            [countryName]: updatedDestinations,
          }));
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
                name="country"
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
        {Object.keys(destinationsData).map((countryKey) => (
          <Box key={countryKey} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {countryKey.charAt(0).toUpperCase() + countryKey.slice(1)}
            </Typography>
            <Grid container spacing={4}>
              {destinationsData[countryKey].map((destination, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(45, 46, 46, 0.4)', // Transparent black background
                      backdropFilter: 'blur(10px)', // Blur for glass effect
                      borderRadius: '10px', // Rounded corners for the card
                      boxShadow: '0 10px 30px rgba(76, 77, 77, 0.5)', // Soft shadow for depth
                      border: '2px solid rgba(255, 255, 255, 0.2)', // Border to enhance the glass effect
                      color: 'white', // Ensure text is visible on dark background
                      transition: '0.3s', // Smooth transition for the hover effect
                      '&:hover': {
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)', // Glow effect on hover
                        transform: 'scale(1.05)', // Slightly enlarge the card on hover
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                      image={destination.image}
                      alt={destination.name}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {destination.name}
                      </Typography>
                      <Typography variant="body2" color="white" gutterBottom>
                        {destination.description}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        {destination.accommodations} accommodations available
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => handleAddClick(destination.name)}
                      >
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  );
}

export default Destinations;