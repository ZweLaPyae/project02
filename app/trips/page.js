"use client";
import * as React from 'react';
import { 
  Box, Container, Typography, Grid,
  Card, CardContent, CardMedia, Button, 
  TextField, MenuItem, Select, InputLabel, 
  FormControl, Checkbox, ListItemText, Dialog, 
  DialogActions, DialogContent, DialogContentText, 
  DialogTitle } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar'; // Adjust the import path
import TripDetails from './tripDetails/page'; // Adjust the import path

function Trips() {
  const [trips, setTrips] = React.useState([]);
  const [newTrip, setNewTrip] = React.useState({ name: '', country: '', destinations: [], additionalPrice: '', description: '', imageUrl: '' });
  const [destinations, setDestinations] = React.useState([]);
  const [filteredDestinations, setFilteredDestinations] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedTrip, setSelectedTrip] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  
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

    // Check if the user is an admin
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
      const [name, ...rest] = current.split('=');
      prev[name] = decodeURIComponent(rest.join('='));
      return prev;
    }, {});

    console.log('Cookies:', cookies); // Debugging line to check cookies

    const session = cookies.traveler_session ? JSON.parse(cookies.traveler_session) : null; // Updated cookie name
    console.log('Session:', session); // Debugging line to check session

    if (session && session.email) {
      const isAdminEmail = session.email === 'admin123@gmail.com'; // Replace with your admin email
      console.log('Is Admin:', isAdminEmail); // Debugging line
      setIsAdmin(isAdminEmail);
    }
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
        setOpen(false);
        setNewTrip({ name: '', country: '', destinations: [], additionalPrice: '', description: '', imageUrl: '' });
      } else {
        console.error('Failed to add trip');
      }
    } catch (error) {
      console.error('Error adding trip:', error);
    }
  };

  const handleEditTrip = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/trip`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrip),
      });

      if (response.ok) {
        const updatedTrip = await response.json();
        setTrips(trips.map(trip => (trip.name === updatedTrip.name ? updatedTrip : trip)));
        setOpen(false);
        setIsEditing(false);
        setNewTrip({ name: '', country: '', destinations: [], additionalPrice: '', description: '', imageUrl: '' });
      } else {
        console.error('Failed to edit trip');
      }
    } catch (error) {
      console.error('Error editing trip:', error);
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
    const selectedTrip = trips.find(trip => trip.name === tripName);
    setSelectedTrip(selectedTrip);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  const handleBackToTrips = () => {
    setSelectedTrip(null);
  };

  const handleEditButtonClick = () => {
    setNewTrip(selectedTrip);
    setIsEditing(true);
    setOpen(true);

    const filtered = destinations.filter(destination =>
      destination.countryName && destination.countryName.toLowerCase().includes(selectedTrip.country.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  return (
    <>
      <ResponsiveAppBar /> {/* Add the navigation bar */}
      <Container sx={{ py: 8 }}>
        {selectedTrip ? (
          <TripDetails tripDetails={selectedTrip} onBack={handleBackToTrips} onEdit={handleEditButtonClick} open={open} handleClose={handleClose} handleChange={handleChange} handleEditTrip={handleEditTrip} newTrip={newTrip} filteredDestinations={filteredDestinations} handleDestinationsChange={handleDestinationsChange} isEditing={isEditing} />
        ) : (
          <>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'suse' }}>
              Trip Packages
            </Typography>
            {isAdmin && (
              <Button variant="contained"
                sx={{
                  mt: 2,
                  float: 'right',
                  backgroundColor: 'rgba(116, 117, 47, 0.6)', // Dark transparent background
                  color: 'white', // White text color for contrast
                  borderRadius: '8px', // Rounded corners
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)', // Soft shadow for depth
                  transition: '0.3s ease-in-out', // Smooth transition
                  '&:hover': {
                    backgroundColor: 'rgba(243, 245, 147, 0.8)', // Darker on hover
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)', // Glow effect on hover
                  },
                }}
                onClick={handleClickOpen}>
                Add Trip
              </Button>
            )}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{isEditing ? 'Edit Trip' : 'Add a New Trip'}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill out the form below to {isEditing ? 'edit' : 'add'} the trip package.
                </DialogContentText>
                <Box component="form" onSubmit={isEditing ? handleEditTrip : handleAddTrip} sx={{ mt: 2 }}>
                  <TextField
                    label="Trip Name"
                    name="name"
                    value={newTrip.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                    disabled={isEditing} // Disable editing the trip name
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
                    label="Price"
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
                      {isEditing ? 'Save Changes' : 'Add Trip'}
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
                        Price: {trip.additionalPrice}THB
                      </Typography>
                      {isAdmin && (
                        <Button variant="contained"
                          sx={{
                            mt: 1,
                            float: 'right',
                            mb: 2,
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
                          onClick={(e) => { e.stopPropagation(); handleDeleteTrip(index); }}>
                          Delete
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}

export default Trips;