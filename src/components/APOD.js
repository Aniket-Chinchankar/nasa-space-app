// src/components/APOD.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";

function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAPOD = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key:  "dKbU8hkUzLULQajBeoZt9gfJONiWtMfxz66Ru0a8",
        },
      });
      setApod(response.data);
    } catch (err) {
      console.error("Error fetching APOD:", err);
      setError("Failed to fetch APOD. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD();
    // eslint-disable-next-line
  }, []);

  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>
        Astronomy Picture of the Day
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : apod ? (
        <Card>
          {apod.media_type === "image" ? (
            <CardMedia
              component="img"
              height="400"
              image={apod.url}
              alt={apod.title}
            />
          ) : (
            <CardMedia
              component="iframe"
              height="400"
              src={apod.url}
              title={apod.title}
            />
          )}
          <CardContent>
            <Typography variant="h5">{apod.title}</Typography>
            <Typography variant="body1">{apod.explanation}</Typography>
            <Typography variant="caption">Date: {apod.date}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No APOD available.</Typography>
      )}
    </Box>
  );
}

export default APOD;
