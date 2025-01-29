import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Gallery from '../components/Gallery';
import Navbar from '../components/Navbar';
import Upload from '../components/Upload';
import Footer from '../components/Footer';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} />
    </Router>
  );
}

function AppContent({ isAuthenticated }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={isAuthenticated ? <Gallery /> : <Navigate to='/login' />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/upload'
          element={isAuthenticated ? <Upload /> : <Navigate to='/login' />}
        />{' '}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
