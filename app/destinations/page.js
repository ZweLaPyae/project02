"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar'; // Adjust the import path
const destinationsData = {
  thailand: [
    { name: 'Bangkok', image: 'https://www.vietnamstay.com/DataUpload/Attractions/201932822432-bangkok-overview-aerial-view-2.jpg', description: 'Vibrant city with temples and street food.', accommodations: 120 },
    { name: 'Chiang Mai', image: 'https://static.independent.co.uk/2024/02/09/16/newFile.jpg', description: 'Mountain city with historical landmarks.', accommodations: 60 },
    { name: 'Phuket', image: 'https://www.travelandleisure.com/thmb/RQ3JmT8V2y2fhwr7NY0cgUumcCE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/phuket-thailand-karst-formation-phuket0327-92bd3ce9266148dba74cba5e36c711e2.jpg', description: 'Popular beach destination.', accommodations: 90 },
  ],
  japan: [
    { name: 'Tokyo', image: 'https://example.com/tokyo.jpg', description: 'High-tech city with rich culture.', accommodations: 200 },
    { name: 'Kyoto', image: 'https://example.com/kyoto.jpg', description: 'Historic city with temples and gardens.', accommodations: 80 },
    { name: 'Osaka', image: 'https://example.com/osaka.jpg', description: 'Food capital of Japan.', accommodations: 150 },
  ],
  italy: [
    { name: 'Rome', image: 'https://example.com/rome.jpg', description: 'The capital with ancient ruins.', accommodations: 180 },
    { name: 'Venice', image: 'https://example.com/venice.jpg', description: 'Famous for canals and gondolas.', accommodations: 70 },
    { name: 'Florence', image: 'https://example.com/florence.jpg', description: 'Home of Renaissance art and architecture.', accommodations: 100 },
  ],
  // Add more countries and destinations similarly...
};


function Destinations() {
  const router = useRouter();
  const [country, setCountry] = React.useState('');
  const [destinations, setDestinations] = React.useState([]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Fetch the query params from the window location
    const countryName = params.get('country'); // Get the 'country' query param
    if (countryName) {
      setCountry(countryName);
      setDestinations(destinationsData[countryName.toLowerCase()] || []);
    }
  }, []);

  const handleAddClick = (destinationName) => {
    // Implement add functionality (e.g., add to wishlist, cart, or bookings)
    alert(`${destinationName} added to your list!`);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Destinations in {country}
        </Typography>
        <Grid container spacing={4}>
          {destinations.map((destination, index) => (
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
      </Container>
    </>
  );
}

export default Destinations;