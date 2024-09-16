"use client";
import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, TextField } from '@mui/material';
import ResponsiveAppBar from './navbar'; // Import the ResponsiveAppBar component

// Placeholder data for countries
const initialCountries = [
  { name: 'Thailand', image: '/images/thailand.jpg', description: 'Explore vibrant cities, beaches, and temples.' },
  { name: 'Japan', image: '/images/japan.jpg', description: 'Experience the blend of tradition and technology.' },
  { name: 'Italy', image: '/images/italy.jpg', description: 'Visit historic landmarks and savor Italian cuisine.' },
  { name: 'Australia', image: '/images/australia.jpg', description: 'Discover unique wildlife and stunning landscapes.' },
  { name: 'Canada', image: '/images/canada.jpg', description: 'Enjoy breathtaking nature and friendly cities.' },
  { name: 'Brazil', image: '/images/brazil.jpg', description: 'Dive into a country full of culture and beaches.' },
  { name: 'New Zealand', image: '/images/newzealand.jpg', description: 'Explore mountains, lakes, and Maori culture.' },
  { name: 'France', image: '/images/france.jpg', description: 'Indulge in art, fashion, and fine dining.' },
  { name: 'Greece', image: '/images/greece.jpg', description: 'Unwind on beautiful islands and explore ancient ruins.' },
  { name: 'Egypt', image: '/images/egypt.jpg', description: 'Marvel at pyramids, history, and deserts.' },
  { name: 'South Africa', image: '/images/southafrica.jpg', description: 'Experience safari adventures and diverse culture.' },
  { name: 'Iceland', image: '/images/iceland.jpg', description: 'Witness glaciers, waterfalls, and the Northern Lights.' },
];

function Trips() {
  const [countries, setCountries] = React.useState(initialCountries);
  const [newCountry, setNewCountry] = React.useState({ name: '', image: '', description: '' });

  const handleAddCountry = (e) => {
    e.preventDefault();
    setCountries([...countries, newCountry]);
    setNewCountry({ name: '', image: '', description: '' });
  };

  const handleDeleteCountry = (index) => {
    const updatedCountries = countries.filter((_, i) => i !== index);
    setCountries(updatedCountries);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCountry({ ...newCountry, [name]: value });
  };

  return (
    <>
      <ResponsiveAppBar /> {/* Add the navigation bar */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Top 10 Countries to Visit
        </Typography>
        <Box component="form" onSubmit={handleAddCountry} sx={{ mb: 4, backgroundColor: 'grey.200', p: 2, borderRadius: 1 }}>
          <TextField
            label="Country Name"
            name="name"
            value={newCountry.name}
            onChange={handleChange}
            required
            sx={{ mr: 2 }}
          />
          <TextField
            label="Image URL"
            name="image"
            value={newCountry.image}
            onChange={handleChange}
            required
            sx={{ mr: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={newCountry.description}
            onChange={handleChange}
            required
            sx={{ mr: 2 }}
          />
          <Button type="submit" variant="contained">Add Country</Button>
        </Box>
        <Grid container spacing={4}>
          {countries.map((country, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={country.image}
                  alt={country.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {country.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {country.description}
                  </Typography>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteCountry(index)}>
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