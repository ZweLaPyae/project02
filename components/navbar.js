"use client";
import * as React from 'react';
import {
  AppBar, Avatar, Box, Button, Container,
  IconButton, Menu, MenuItem,
  Toolbar, Tooltip, Typography
} from '@mui/material';
import {
  Adb as AdbIcon,
  Menu as MenuIcon,
  ModeOfTravel as ModeOfTravelIcon
} from '@mui/icons-material';
import Link from 'next/link';  // Import Link from Next.js
import Cookies from 'js-cookie';  // Import js-cookie

const pages = ['Trips', 'Destinations']; // Removed 'Booked' from the main pages array
const settings = ['Profile', 'Sign Out'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [travelerSession, setTravelerSession] = React.useState(null);
  const [avatarImageUrl, setAvatarImageUrl] = React.useState('/static/images/avatar/2.jpg'); // Default avatar image

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
        if (data.avatarImageUrl) {
          setAvatarImageUrl(data.avatarImageUrl);
        }
      })
      .catch(error => console.error('Error fetching traveler data:', error));
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    Cookies.remove('traveler_session');  // Remove the session cookie
    setTravelerSession(null);  // Update the state
    window.location.href = `/`;  // Redirect to the home page
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(45, 46, 46, 0.7)', backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{ mr: 2 }}
            >
              <ModeOfTravelIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 30, color: "#f3f593" }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'suse',
                  fontWeight: 500,
                  fontSize: 25,
                  color: '#f3f593',
                  textDecoration: 'none',
                }}
              >
                Havenly Travels
              </Typography>
            </IconButton>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={`/${page.toLowerCase()}`} passHref>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
              {travelerSession && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/booked" passHref>
                    <Typography textAlign="center">Booked</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Link href="/" passHref>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <AdbIcon sx={{ mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  fontFamily: 'suse',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Havenly Travels
              </Typography>
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} href={`/${page.toLowerCase()}`} passHref>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2, color: 'white',
                    fontFamily: 'suse',
                    fontSize: 15,
                    display: 'block'
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {!travelerSession ? (
              <>
                <Link href="/signin" passHref>
                  <Button
                    sx={{
                      my: 2, color: 'white',
                      fontFamily: 'suse',
                      fontSize: 15,
                      display: 'block',
                      textTransform: 'none',
                      mr: 2,
                    }}
                  >
                    SIGN IN
                  </Button>
                </Link>
                <Link href="/register" passHref>
                  <Button
                    sx={{
                      my: 2, color: 'white',
                      fontFamily: 'suse',
                      fontSize: 15,
                      display: 'block',
                      textTransform: 'none',
                      mr: 2,
                    }}
                  >
                    REGISTER
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/booked" passHref>
                  <Button
                    sx={{
                      my: 2, color: 'white',
                      fontFamily: 'suse',
                      fontSize: 15,
                      display: 'block',
                      textTransform: 'none',
                      ml: 2,
                      mr: 2,
                    }}
                  >
                    Booked
                  </Button>
                </Link>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src={avatarImageUrl} />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Sign Out' ? handleSignOut : handleCloseUserMenu}>
                  {setting === 'Profile' ? (
                    <Link href="/profile" passHref>
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>
                  ) : (
                    <Typography textAlign="center">{setting}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;