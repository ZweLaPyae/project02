"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Link from 'next/link';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

export default function SignInPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;  // Ensure this points to your backend
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function loginTraveler(data) {
    setServerError(null);
    setSuccessMessage(null);
    
    try {
      const response = await fetch(`${API_BASE}/signin`, {  // Using the login API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to log in');
      }

      const newTraveler = await response.json(); // Get the registered traveler's data

      setSuccessMessage('Login successful! Redirecting...');
      
      // Encode data as query parameters
      const queryParams = new URLSearchParams({
        email: newTraveler.email,
      }).toString();

      // Redirect to home page with query parameters
      window.location.href = `/?${queryParams}`;
    } catch (error) {
      setServerError(error.message);
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
        Sign In
      </Typography>

      <Box component="form" onSubmit={handleSubmit(loginTraveler)} sx={{ mt: 3 }}>
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
          Sign In
        </Button>
      </Box>

      {serverError && <Typography color="error">{serverError}</Typography>}
      {successMessage && <Typography color="success.main">{successMessage}</Typography>}

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link href="/register" passHref>
          <Typography component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
            Register here
          </Typography>
        </Link>
      </Typography>
    </Container>
  );
}
