import React from 'react';
import {
  Box, Container, Typography, Card, CardContent, CardMedia, Button,
  TextField, MenuItem, Select, InputLabel, FormControl, Checkbox,
  ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

function TripDetails({ tripDetails, onBack, onEdit, open, handleClose, handleChange, handleEditTrip, newTrip, filteredDestinations, handleDestinationsChange, isEditing }) {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isTraveler, setIsTraveler] = React.useState(false);

  React.useEffect(() => {
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
      const [name, ...rest] = current.split('=');
      prev[name] = decodeURIComponent(rest.join('='));
      return prev;
    }, {});

    console.log('Cookies:', cookies); // Debugging line to check cookies

    const travelerSession = cookies.traveler_session ? JSON.parse(cookies.traveler_session) : null;
    console.log('Session:', travelerSession); // Debugging line to check session

    if (travelerSession && travelerSession.email) {
      const isAdminEmail = travelerSession.email === 'admin123@gmail.com'; // Replace with your admin email
      console.log('Is Admin:', isAdminEmail); // Debugging line
      setIsAdmin(isAdminEmail);
      setIsTraveler(!isAdminEmail);
    }
  }, []);

  const handleBookNowClick = async () => {
    if (!tripDetails) {
      console.error('No trip selected');
      return;
    }

    const cookies = document.cookie.split('; ').reduce((prev, current) => {
      const [name, ...rest] = current.split('=');
      prev[name] = decodeURIComponent(rest.join('='));
      return prev;
    }, {});

    const travelerSession = cookies.traveler_session ? JSON.parse(cookies.traveler_session) : null;

    if (!travelerSession || !travelerSession.email) {
      console.error('No traveler session found');
      return;
    }

    try {
      const response = await fetch(`/api/booked`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: travelerSession.email, trip: tripDetails }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Update successful:', data);
        // Optionally, handle the response (e.g., show a success message)
      } else {
        console.error('Failed to update traveler data');
      }
    } catch (error) {
      console.error('Error updating traveler data:', error);
      // Optionally, handle the error (e.g., show an error message)
    }

    console.log(`Booking trip: ${tripDetails.name}`);
  };

  return (
    <>
      <Container sx={{ py: 8 }}>
        <Card
          sx={{
            backgroundColor: 'rgba(45, 46, 46, 0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(76, 77, 77, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            mb: 4,
          }}
        >
          <CardMedia
            component="img"
            image={tripDetails.imageUrl}
            alt={tripDetails.name}
            sx={{ height: 400, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {tripDetails.name} in {tripDetails.country}
            </Typography>
            <Typography variant="body2" color="white" gutterBottom>
              {tripDetails.description}
            </Typography>
            <Typography variant="body2" color="white" gutterBottom>
              Destinations: {tripDetails.destinations.join(', ')}
            </Typography>
            <Typography variant="body2" color="white">
              Additional Price: THB {tripDetails.additionalPrice}
            </Typography>
            {isTraveler && (
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
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
                onClick={handleBookNowClick}
              >
                Book Now
              </Button>
            )}
          </CardContent>
        </Card>

        <Box textAlign="center" sx={{ mt: 4 }}>
          {isAdmin && (
            <Button variant="contained"
              sx={{
                mt: 1,
                float: 'right',
                mb: 2,
                backgroundColor: 'rgba(140, 109, 67, 0.6)', // Orange transparent background
                color: 'white', // White text color for contrast
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 0 20px rgba(255, 165, 0, 0.2)', // Soft shadow for depth
                transition: '0.3s ease-in-out', // Smooth transition
                '&:hover': {
                  backgroundColor: 'rgba(250, 178, 82, 0.8)', // Darker on hover
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)', // Glow effect on hover
                },
              }}
              onClick={onEdit}>
              Edit
            </Button>
          )}
          <Button variant="contained"
            sx={{
              mt: 2,
              float: 'left',
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
            onClick={onBack}>
            Back to Trips
          </Button>
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Trip' : 'Add a New Trip'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to {isEditing ? 'edit' : 'add'} the trip package.
          </DialogContentText>
          <Box component="form" onSubmit={handleEditTrip} sx={{ mt: 2 }}>
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
              disabled={isEditing}
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
                Save Changes
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TripDetails;