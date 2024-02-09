import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Menu from './pages/menu';
import FileUpload from './pages/fileupload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
      <div className="flex flex-col">
      <Router>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/fileupload" element={<FileUpload />} />
          </Routes>
      </Router>
      </div>
  </div>
);