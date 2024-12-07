// src/components/NeoWs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

function NeoWs() {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const neosPerPage = 10;

  const fetchNeos = async () => {
    console.log(process.env.REACT_APP_NASA_API_KEY);
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://api.nasa.gov/neo/rest/v1/feed',
        {
          params: {
            start_date: startDate,
            end_date: endDate,
            api_key: "dKbU8hkUzLULQajBeoZt9gfJONiWtMfxz66Ru0a8",
          },
        }
      );
      const nearEarthObjects = response.data.near_earth_objects;
      // Flatten the objects into a single array
      const allNeos = Object.values(nearEarthObjects).flat();
      setNeos(allNeos);
      setCurrentPage(1); // Reset to first page on new fetch
    } catch (err) {
      console.error('Error fetching NeoWs data:', err);
      setError('Failed to fetch data. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data for the current date by default
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
    fetchNeos();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be after end date.');
      return;
    }
    fetchNeos();
  };

  // Pagination Logic
  const indexOfLastNeo = currentPage * neosPerPage;
  const indexOfFirstNeo = indexOfLastNeo - neosPerPage;
  const currentNeos = neos.slice(indexOfFirstNeo, indexOfLastNeo);
  const totalPages = Math.ceil(neos.length / neosPerPage);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Near Earth Objects (NeoWs)
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginRight: '1rem', width: '200px' }}
          required
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginRight: '1rem', width: '200px' }}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Fetch NEOs
        </Button>
      </form>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : neos.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {currentNeos.map((neo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={neo.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {neo.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>NASA JPL URL:</strong>{' '}
                      <a href={neo.nasa_jpl_url} target="_blank" rel="noopener noreferrer">
                        Link
                      </a>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Absolute Magnitude:</strong> {neo.absolute_magnitude_h}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Estimated Diameter:</strong>{' '}
                      {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}m -{' '}
                      {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Potentially Hazardous:</strong>{' '}
                      {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={neo.nasa_jpl_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography>No Near Earth Objects found for the selected dates.</Typography>
      )}
    </Box>
  );
}

export default NeoWs;
