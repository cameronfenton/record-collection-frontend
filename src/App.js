import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Header />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/albums" element={<AlbumPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;