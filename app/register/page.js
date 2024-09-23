"use client"; // Add this directive at the top

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Link from 'next/link';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

export default function RegisterPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [travelers, setTravelers] = useState([]);
  const [serverError, setServerError] = useState(null); // Track server errors
  const [successMessage, setSuccessMessage] = useState(null); // Track success

  async function fetchTravelers() {
    try {
      const response = await fetch(`${API_BASE}/travelers`);
      if (!response.ok) throw new Error('Failed to fetch travelers');
      const travelers = await response.json();
      setTravelers(travelers);
    } catch (error) {
      console.error(error);
    }
  }

  async function createTravelers(data) {
    setServerError(null); // Reset server error
    setSuccessMessage(null); // Reset success message
    try {
      const response = await fetch(`${API_BASE}/travelers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to register traveler'); // Handle error response
      fetchTravelers();
      setSuccessMessage('Registration successful!'); // Show success message
    } catch (error) {
      setServerError(error.message); // Display error message
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, position: 'relative' }}>
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
        Register
      </Typography>

      <Box component="form" onSubmit={handleSubmit(createTravelers)} sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="name"
          autoFocus
          {...register("username", { required: 'Full Name is required' })}
          error={!!errors.username}
          helperText={errors.username?.message}
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
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          {...register("email", { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
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
          {...register("password", { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
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
          Register
        </Button>
      </Box>

      {serverError && <Typography color="error">{serverError}</Typography>}
      {successMessage && <Typography color="success.main">{successMessage}</Typography>}
    </Container>
  );
}
