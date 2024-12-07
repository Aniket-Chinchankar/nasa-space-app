// src/components/MarsPhotos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Box,
} from '@mui/material';
import PhotoChart from './PhotoChart';

function MarsPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sol, setSol] = useState(1000); // Martian sol
  const [rover, setRover] = useState('curiosity');

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`,
        {
          params: {
            sol: sol,
            api_key: "dKbU8hkUzLULQajBeoZt9gfJONiWtMfxz66Ru0a8",
          },
        }
      );
      setPhotos(response.data.photos);
    } catch (error) {
      console.error('Error fetching Mars photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPhotos();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mars Rover Photos
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <TextField
          label="Martian Sol"
          type="number"
          value={sol}
          onChange={(e) => setSol(e.target.value)}
          style={{ marginRight: '1rem', width: '150px' }}
          required
        />
        <TextField
          label="Rover"
          value={rover}
          onChange={(e) => setRover(e.target.value)}
          style={{ marginRight: '1rem', width: '150px' }}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Fetch Photos
        </Button>
      </form>
      {loading ? (
        <CircularProgress />
      ) : photos.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {photos.slice(0, 20).map((photo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={photo.img_src}
                    alt={`Mars Rover ${rover}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Rover:</strong> {photo.rover.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Camera:</strong> {photo.camera.full_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Earth Date:</strong> {photo.earth_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <PhotoChart photos={photos} />
        </>
      ) : (
        <Typography>No photos found for the selected parameters.</Typography>
      )}
    </Box>
  );
}

export default MarsPhotos;
