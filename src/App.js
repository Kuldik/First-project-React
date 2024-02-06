import React from 'react';
import './styles/app.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import Navbar from './components/UI/Navbar/Navbar';
import Error from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/Error" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;