"use client";
import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar';

function TripsPage() {
  const [trips, setTrips] = React.useState([]);
  const [email, setEmail] = React.useState(null);

  React.useEffect(() => {
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
      const [name, ...rest] = current.split('=');
      prev[name] = decodeURIComponent(rest.join('='));
      return prev;
    }, {});

    const session = cookies.traveler_session ? JSON.parse(cookies.traveler_session) : null;
    if (session && session.email) {
      setEmail(session.email);
    }
  }, []);

  React.useEffect(() => {
    if (!email) return;

    const fetchBookedTrips = async () => {
      try {
        const response = await fetch(`/api/booked-trips?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching booked trips:', error);
      }
    };

    fetchBookedTrips();
  }, [email]);

  const removeBookedTrip = async (tripId) => {
    try {
      const response = await fetch('/api/remove-booked-trip', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, tripId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove booked trip');
      }

      setTrips(trips.filter(trip => trip._id !== tripId));
    } catch (error) {
      console.error('Error removing booked trip:', error);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Your Booked Trips
        </Typography>
        <Grid container spacing={4}>
          {trips.map((trip) => (
            <Grid item key={trip._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: 'rgba(45, 46, 46, 0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(76, 77, 77, 0.5)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {trip.name}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    Destinations
                  </Typography>
                  {trip.destinations.map((destination) => (
                    <Box key={destination.id} sx={{ mt: 2 }}>
                      <CardMedia
                        component="img"
                        sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                        image={destination.image}
                        alt={destination.name}
                      />
                      <Typography variant="body1" component="div">
                        {destination.name}
                      </Typography>
                      <Typography variant="body2" color="text.white">
                        {destination.description}
                      </Typography>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      mt: 2,
                      ml: 2,
                      backgroundColor: 'rgba(107, 28, 33, 0.6)',
                      color: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 0 20px rgba(255, 92, 100, 0.2)',
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(227, 36, 46, 0.8)',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
                      },
                    }}
                    onClick={() => removeBookedTrip(trip._id)}
                  >
                    Remove
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

export default TripsPage;