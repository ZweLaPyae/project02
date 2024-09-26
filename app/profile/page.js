"use client";

import React from 'react';
import { Avatar, Box, Typography, Container, Paper, Grid, Button, TextField, Card } from '@mui/material';
import { rgbToHex } from '@mui/material';
import {
  ModeOfTravel as ModeOfTravelIcon
} from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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

  const handleBackClick = () => {
    window.history.back();
  };

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
      <Container onClick={handleBackClick} sx={{ cursor: 'pointer' }}>
        <ArrowBackIosIcon sx={{ display: { xs: 'none', md: 'flex' }, mr :1 ,fontSize: 30, color: "white" , float: 'left'}}/>
        <Typography variant="h6" component="h1" 
        gutterBottom fontFamily="suse" sx={{color: "white"}}>
          Back
        </Typography>
      </Container>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ModeOfTravelIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 30, color: "#f3f593" }} />
        <Typography variant="h4" component="h1" gutterBottom fontFamily="suse" sx={{display: 'flex', justifyContent: 'center', color: "#f3f593"}}>
          Heavenly Travels
        </Typography>
      </Container>
      <Typography variant="h5"  gutterBottom fontFamily="suse" sx={{display: 'flex', justifyContent: 'center'}}>
          Your Profile
        </Typography>
      <Box sx={{ display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
       }}>
        <Paper elevation={3} sx={{ p: 4,
            width: 600,
            backgroundColor: 'rgba(45, 46, 46, 0.4)', // Transparent black background
            backdropFilter: 'blur(10px)', // Blur for glass effect
            borderRadius: '10px', // Rounded corners for the card
            boxShadow: '0 10px 10px rgba(76, 77, 77, 0.5)', // Soft shadow for depth
            border: '2px solid rgba(255, 255, 255, 0.2)', // Border to enhance the glass effect
            color: 'white', // Ensure text is visible on dark background
           }}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} sx ={{display: 'flex', justifyContent: 'center'}}>
              {isEditing ? (
                <TextField
                  label="Image URL"
                  name="avatarImageUrl"
                  value={formData.avatarImageUrl}
                  onChange={handleChange}
                  fontFamily="suse"
                  fullWidth
                  margin='normal'
                  InputProps={{
                    style: { color: 'white' }
                  }}
                  sx={{
                    '& label': {
                      color: 'white', // label color when focused
                    },
                    '& label.Mui-focused': {
                      color: 'rgba(243, 245, 147, 0.8)', // label color when focused
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white', // normal border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(243, 245, 147, 0.8)', // focused border color
                      },
                    },
                  }}
                />
              ) : (
                <Avatar
                  alt={travelerData.username}
                  src={travelerData.avatarImageUrl || 'https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              {isEditing ? (
                <>
                  <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                    fontFamily="suse"
                    InputProps={{
                      style: { color: 'white' }
                    }}
                    sx={{
                      '& label': {
                        color: 'white', // label color when focused
                      },
                      '& label.Mui-focused': {
                        color: 'rgba(243, 245, 147, 0.8)', // label color when focused
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // normal border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // hover border color
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(243, 245, 147, 0.8)', // focused border color
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    fullWidth
                    fontFamily="suse"
                    margin='normal'
                    InputProps={{
                      style: { color: 'white' }
                    }}
                    sx={{
                      '& label': {
                        color: 'white', // label color when focused
                      },
                      '& label.Mui-focused': {
                        color: 'rgba(243, 245, 147, 0.8)', // label color when focused
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // normal border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // hover border color
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(243, 245, 147, 0.8)', // focused border color
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                    fontFamily="suse"
                    InputProps={{
                      style: { color: 'white' }
                    }}
                    sx={{
                      '& label': {
                        color: 'white', // label color when focused
                      },
                      '& label.Mui-focused': {
                        color: 'rgba(243, 245, 147, 0.8)', // label color when focused
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // normal border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // hover border color
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(243, 245, 147, 0.8)', // focused border color
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    margin='normal'
                    fontFamily="suse"
                    InputProps={{
                      style: { color: 'white' }
                    }}
                    sx={{
                      '& label': {
                        color: 'white', // label color when focused
                      },
                      '& label.Mui-focused': {
                        color: 'rgba(243, 245, 147, 0.8)', // label color when focused
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // normal border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // hover border color
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(243, 245, 147, 0.8)', // focused border color
                        },
                      },
                    }}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" component="h1" gutterBottom  fontFamily="suse" sx={{display: 'flex', justifyContent: 'center'}}>
                    {travelerData.username}
                  </Typography>
                  <Typography variant="body1" gutterBottom fontFamily="suse" >
                    <b>Email</b>      - {travelerData.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom fontFamily="suse">
                    <b>Country</b>    - {travelerData.country || 'Country not specified'}
                  </Typography>
                  <Typography variant="body1" gutterBottom fontFamily="suse">
                    <b>Age</b>        - {travelerData.age ? `${travelerData.age} years old` : 'Age not specified'}
                  </Typography>
                  <Typography variant="body1" gutterBottom fontFamily="suse">
                    <b>Phone</b>      - {travelerData.phoneNumber || 'Phone number not specified'}
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
                  fontFamily="suse"
                  rows={4}
                  fullWidth
                  variant="outlined" 
                  InputProps={{
                    style: { color: 'white' }
                  }}
                  sx={{
                    '& label': {
                      color: 'white', // label color when focused
                    },
                    '& label.Mui-focused': {
                      color: 'rgba(243, 245, 147, 0.8)', // label color when focused
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white', // normal border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(243, 245, 147, 0.8)', // focused border color
                      },
                    },
                  }}
                />
              ) : (
                <>
                <Typography variant="h5" gutterBottom marginTop={1} marginLeft={1} fontSize={20} color='white' fontFamily="suse">
                    Description
                  </Typography>
                <Card
                sx={{ 
                  height: '100px',
                  backgroundColor: 'rgba(45, 46, 46, 0.4)', // Transparent black background
                  backdropFilter: 'blur(10px)', // Blur for glass effect
                  borderRadius: '10px', // Rounded corners for the card
                  boxShadow: '0 0px 10px rgba(76, 77, 77, 0.5)', // Soft shadow for depth
                  border: '2px solid rgba(255, 255, 255, 0.2)', // Border to enhance the glass effect
                  color: 'white', // Ensure text is visible on dark background
                 }}
                >
                  <Typography variant="body1" gutterBottom marginTop={1} marginLeft={1} fontSize={13} color='rgba(209, 207, 207, 0.8)' fontFamily="suse">
                    {travelerData.description || 'This traveler has nothing to say!'}
                  </Typography>
                </Card>
                </>
              )}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" 
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
              onClick={handleEditClick}>
                {isEditing ? 'Done' : 'Edit'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;