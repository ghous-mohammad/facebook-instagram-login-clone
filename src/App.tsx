import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FacebookLogin from './components/FacebookLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/facebook" element={<FacebookLogin platform="facebook" />} />
        <Route path="/instagram" element={<FacebookLogin platform="instagram" />} />
        <Route path="/" element={<Navigate to="/facebook" replace />} />
      </Routes>
    </Router>
  );
}

export default App;