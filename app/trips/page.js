"use client";
import * as React from 'react';
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, TextField, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar'; // Adjust the import path

function Trips() {
  const router = useRouter();
  const [trips, setTrips] = React.useState([]);
  const [newTrip, setNewTrip] = React.useState({ name: '', country: '', destinations: [], additionalPrice: '', description: '', imageUrl: '' });
  const [destinations, setDestinations] = React.useState([]);
  const [filteredDestinations, setFilteredDestinations] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Fetch trips from MongoDB
    fetch('/api/trip')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched trips:', data); // Log fetched trips
        setTrips(data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });

    // Fetch destinations from MongoDB
    fetch('/api/destinations')
      .then(response => response.json())
      .then(data => {
        setDestinations(data);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
      });
  }, []);

  React.useEffect(() => {
    console.log('Trips:', trips);
    trips.forEach(trip => {
      console.log(`Destinations for trip ${trip.name}:`, trip.destinations);
    });
  }, [trips]);

  const handleAddTrip = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrip),
      });

      if (response.ok) {
        const addedTrip = await response.json();
        setTrips([...trips, addedTrip]);
        setNewTrip({ name: '', country: '', destinations: [], additionalPrice: '', description: '', imageUrl: '' });
        setOpen(false); // Close the modal after adding the trip
      } else {
        console.error('Failed to add trip');
      }
    } catch (error) {
      console.error('Error adding trip:', error);
    }
  };

  const handleDeleteTrip = async (index) => {
    const tripToDelete = trips[index];
    try {
      const response = await fetch('/api/trip', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tripToDelete.name }),
      });

      if (response.ok) {
        setTrips(trips.filter((_, i) => i !== index));
      } else {
        console.error('Failed to delete trip');
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });

    if (name === 'country') {
      // Filter destinations based on the typed country
      const filtered = destinations.filter(destination =>
        destination.countryName && destination.countryName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
  };

  const handleDestinationsChange = (e) => {
    const { value } = e.target;
    setNewTrip({
      ...newTrip, destinations: value
    });
  };

  const handleCardClick = (tripName) => {
    router.push(`/tripdetails?trip=${tripName}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ResponsiveAppBar /> {/* Add the navigation bar */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Trip Packages
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Trip
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add a New Trip</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below to add a new trip package.
            </DialogContentText>
            <Box component="form" onSubmit={handleAddTrip} sx={{ mt: 2 }}>
              <TextField
                label="Trip Name"
                name="name"
                value={newTrip.name}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Country Name"
                name="country"
                value={newTrip.country}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Destinations</InputLabel>
                <Select
                  multiple
                  value={newTrip.destinations}
                  onChange={handleDestinationsChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {filteredDestinations.map((destination) => (
                    <MenuItem key={destination._id} value={destination.name}>
                      <Checkbox checked={newTrip.destinations.includes(destination.name)} />
                      <ListItemText primary={destination.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Additional Price"
                name="additionalPrice"
                value={newTrip.additionalPrice}
                onChange={handleChange}
                required
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                name="description"
                value={newTrip.description}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Image URL"
                name="imageUrl"
                value={newTrip.imageUrl}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add Trip
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
        <Grid container spacing={4}>
          {trips.map((trip, index) => (
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
                  }
                }}
                onClick={() => handleCardClick(trip.name)}>
                <CardMedia
                  component="img"
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover'
                  }} // Set fixed size and object fit
                  image={trip.imageUrl}
                  alt={trip.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {trip.name}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {trip.description}
                  </Typography>
                  <Typography variant="body2" color="white">
                    Destinations: {trip.destinations.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="white">
                    Additional Price: ${trip.additionalPrice}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleDeleteTrip(index); }}>
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

export default Trips;