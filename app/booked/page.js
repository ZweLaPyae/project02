"use client";
import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar'; // Adjust the import path

const initialTripsData = [
  {
    id: 1,
    name: 'Thailand Adventure',
    destinations: [
      { id: 1, name: 'Bangkok', image: 'https://www.vietnamstay.com/DataUpload/Attractions/201932822432-bangkok-overview-aerial-view-2.jpg', description: 'Vibrant city with temples and street food.' },
      { id: 2, name: 'Chiang Mai', image: 'https://static.independent.co.uk/2024/02/09/16/newFile.jpg', description: 'Mountain city with historical landmarks.' },
    ],
  },
  {
    id: 2,
    name: 'Japan Exploration',
    destinations: [
      { id: 3, name: 'Tokyo', image: 'https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW8lMjBza3lsaW5lfGVufDB8fDB8fHww', description: 'High-tech city with rich culture.' },
      { id: 4, name: 'Kyoto', image: 'https://lp-cms-production.imgix.net/2023-02/shutterstock_1017748444.jpg', description: 'Historic city with temples and gardens.' },
    ],
  },
  // Add more trips similarly...
];

function TripsPage() {
  const [trips, setTrips] = React.useState(initialTripsData);

  const viewTripDetails = (tripId) => {
    // Implement view details functionality (e.g., navigate to a details page or show a modal)
    alert(`Viewing details for trip ID: ${tripId}`);
  };

  const removeTrip = (tripId) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
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
            <Grid item key={trip.id} xs={12} sm={6} md={4}>
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
                <CardContent>
                  <Typography variant="h5" component="div">
                    {trip.name}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2,
                        backgroundColor: 'rgba(32, 33, 33, 0.6)', // Dark transparent background
                        color: 'white', // White text color for contrast
                        borderRadius: '8px', // Rounded corners
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)', // Soft shadow for depth
                        transition: '0.3s ease-in-out', // Smooth transition
                        '&:hover': {
                        backgroundColor: 'rgba(243, 245, 147, 0.8)', // Darker on hover
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)', // Glow effect on hover
                        },
                     }}
                    onClick={() => viewTripDetails(trip.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2, 
                        ml: 2,
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
                    onClick={() => removeTrip(trip.id)}
                  >
                    Remove Trip
                  </Button>
                </CardContent>
                <CardContent>
                  <Typography variant="h6" component="div">
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