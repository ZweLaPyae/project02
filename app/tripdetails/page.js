"use client";
import * as React from 'react';
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar'; // Adjust the path as needed

// Mock trips data for demonstration (could be replaced by API)
const tripsData = [
  { name: 'Thailand Adventure', country: 'Thailand', destinations: ['Bangkok', 'Phuket'], additionalPrice: 200, description: 'Explore vibrant cities and beaches.', image: 'https://media.timeout.com/images/105240236/1024/768/image.webp' },
  { name: 'Italy Escapade', country: 'Italy', destinations: ['Rome', 'Venice'], additionalPrice: 300, description: 'Discover the ancient cities and beautiful canals.', image: 'https://www.planetware.com/wpimages/2021/02/italy-in-pictures-beautiful-places-to-photograph-venice.jpg' },
  // Add more trips here
];

function TripDetails() {
  const router = useRouter();
  const [tripDetails, setTripDetails] = React.useState(null);

  React.useEffect(() => {
    if (router.isReady) {
      const { trip } = router.query;
      console.log('Router is ready, trip:', trip);

      if (trip) {
        // Find the trip details from the tripsData based on the trip name
        const selectedTrip = tripsData.find(t => t.name === trip);

        if (selectedTrip) {
          setTripDetails(selectedTrip);
        } else {
          console.error('Trip not found:', trip);
        }
      } else {
        console.error('Trip query parameter is missing');
      }
    }
  }, [router.isReady, router.query]);

  if (!tripDetails) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading trip details...
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <ResponsiveAppBar /> {/* Add the navigation bar */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          {tripDetails.name}
        </Typography>
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
            image={tripDetails.image}
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
              Additional Price: ${tripDetails.additionalPrice}
            </Typography>
          </CardContent>
        </Card>

        {/* Add a list of destinations with images (optional) */}
        <Grid container spacing={4}>
          {tripDetails.destinations.map((destination, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '10px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Optional: Replace this with images of each destination */}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {destination}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => router.back()}>
            Back to Trips
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default TripDetails;