// src/components/Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cosmic Odyssey
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/mars-photos">
            Mars Photos
          </Button>
          <Button color="inherit" component={Link} to="/apod">
            APOD
          </Button>
          <Button color="inherit" component={Link} to="/neows">
            NeoWs
          </Button>
          <Button color="inherit" component={Link} to="/Chatbot">
            Ask Anything About Space
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
