"use client";

import React from 'react';
import { Avatar, Box, Typography, Container, Paper, Grid, Button, TextField } from '@mui/material';

function ProfilePage() {
  const [travelerSession, setTravelerSession] = React.useState(null);
  const [travelerData, setTravelerData] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    username: '',
    country: '',
    age: '',
    phoneNumber: '',
    description: '',
    avatarImageUrl: ''
  });

  React.useEffect(() => {
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
      const [name, ...rest] = current.split('=');
      prev[name] = decodeURIComponent(rest.join('='));
      return prev;
    }, {});

    const session = cookies.traveler_session ? JSON.parse(cookies.traveler_session) : null;
    setTravelerSession(session);

    if (session && session.email) {
      fetch(`/api/profile?email=${encodeURIComponent(session.email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setTravelerData(data);
        setFormData({
          email: data.email,
          username: data.username,
          country: data.country,
          age: data.age,
          phoneNumber: data.phoneNumber,
          description: data.description,
          avatarImageUrl: data.avatarImageUrl
        });
      })
      .catch(error => console.error('Error fetching traveler data:', error));
    }
  }, []);

  const handleEditClick = () => {
    if (isEditing) {
      // Save changes
      fetch(`/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${travelerSession.token}`
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        setTravelerData(data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating traveler data:', error));
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (!travelerData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleEditClick}>
              {isEditing ? 'Done' : 'Edit'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField
                label="Image URL"
                name="avatarImageUrl"
                value={formData.avatarImageUrl}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Avatar
                alt={travelerData.username}
                src={travelerData.avatarImageUrl || '/static/images/avatar/2.jpg'}
                sx={{ width: '100%', height: 'auto', mb: 2 }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                />
              </>
            ) : (
              <>
                <Typography variant="h5" component="h1" gutterBottom>
                  {travelerData.username}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {travelerData.email}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {travelerData.country || 'Country not specified'}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {travelerData.age ? `${travelerData.age} years old` : 'Age not specified'}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {travelerData.phoneNumber || 'Phone number not specified'}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {isEditing ? (
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
            ) : (
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                defaultValue={travelerData.description || 'No description available.'}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;