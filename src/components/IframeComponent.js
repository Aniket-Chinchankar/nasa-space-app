// src/components/IframeComponent.js
import React from 'react';

const IframeComponent = ({ url, title }) => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src={url}
        title={title}
        style={{ height: '100%', width: '100%', border: 'none' }}
        allowFullScreen
      />
    </div>
  );
};

export default IframeComponent;
