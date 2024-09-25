import React from 'react';
import { Avatar, Box, Typography, Container, Paper } from '@mui/material';

const ProfilePage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt="User Avatar"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5" component="h1" gutterBottom>
            John Doe
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            johndoe@example.com
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;