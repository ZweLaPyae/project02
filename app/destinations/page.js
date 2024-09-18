// app/destinations/page.js
"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import ResponsiveAppBar from '../../components/navbar'; // Adjust the import path

const destinationsData = {
  thailand: ['Bangkok', 'Chiang Mai', 'Phuket'],
  japan: ['Tokyo', 'Kyoto', 'Osaka'],
  italy: ['Rome', 'Venice', 'Florence'],
  // Add more destinations for other countries
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

  return (
    <>
      <ResponsiveAppBar />
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Destinations in {country}
        </Typography>
        <List>
          {destinations.map((destination, index) => (
            <ListItem key={index}>
              <ListItemText primary={destination} />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default Destinations;
