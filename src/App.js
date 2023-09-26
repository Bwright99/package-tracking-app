import React, { useState } from 'react';
import './App.css';

function App() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState('');

  const trackPackage = async () => {

  };

  return (
    <div className="App">
      <h1>Track Your Package</h1>
      <input
        type="text"
        placeholder="Enter tracking number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={trackPackage}>Track</button>
      <div>{trackingResult}</div>
    </div>
  );
}

export default App;
