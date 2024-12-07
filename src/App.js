// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MarsPhotos from './components/MarsPhotos';
import APOD from './components/APOD';
import NeoWs from './components/NeoWs';
import { Container } from '@mui/material';
import Chatbot from './components/Chatbot'
function App() {
  return (
    <div>
      <Header />
      <Container style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mars-photos" element={<MarsPhotos />} />
          <Route path="/apod" element={<APOD />} />
          <Route path="/neows" element={<NeoWs />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
