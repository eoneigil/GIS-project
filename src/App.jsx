import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entrance from './Entrance.jsx';
import MainPage from './MainPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/main" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;