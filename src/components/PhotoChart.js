// src/components/PhotoChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PhotoChart({ photos }) {
  // Count photos per camera
  const cameraCount = photos.reduce((acc, photo) => {
    acc[photo.camera.name] = (acc[photo.camera.name] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(cameraCount),
    datasets: [
      {
        label: '# of Photos',
        data: Object.values(cameraCount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Photos per Camera',
      },
    },
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom>
        Photo Distribution by Camera
      </Typography>
      <Bar data={data} options={options} />
    </Box>
  );
}

export default PhotoChart;
