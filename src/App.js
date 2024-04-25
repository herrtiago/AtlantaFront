import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login';
import Register from './views/register';
import FilesView from './views/files';
import './views/css/home.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/files" element={<FilesView/>} />

      </Routes>
    </Router>
  );
}

export default App;
