// src/components/Home.js
import React from 'react';
import IframeComponent from './IframeComponent';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h3" gutterBottom>
        Welcome to the NASA Space App
      </Typography>
      <Typography variant="h6">
        Explore real-time data from NASA's APIs. Navigate through the sections to see Mars Rover photos, the Astronomy Picture of the Day, and information about near-Earth objects.
      </Typography>

      {/* Include the Iframe Component with the desired URL */}
      <IframeComponent url="https://eyes.nasa.gov/apps/asteroids/#/home" title="Example Website" />
    </Box>
  );
};

export default Home;
