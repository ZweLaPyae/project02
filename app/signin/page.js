"use client"; // Add this directive at the top

import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Link from 'next/link';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

function SignInPage() {
  const handleSignIn = (event) => {
    event.preventDefault();
    // Implement sign-in logic here
    alert('Sign-In logic goes here');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
        <ModeOfTravelIcon sx={{ fontSize: 30, color: "#f3f593", mr: 1 }} />
        <Link href="/" passHref>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontFamily: 'suse',
              fontWeight: 500,
              fontSize: 25,
              color: '#f3f593',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Havenly Travels
          </Typography>
        </Link>
      </Box>
      <Typography variant="h4" gutterBottom align="center">
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSignIn} sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
}

export default SignInPage;