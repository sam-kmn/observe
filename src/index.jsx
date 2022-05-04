import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Wrapper from './Wrapper';
import Charts from './pages/Charts'
import Table from './pages/Table'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Wrapper />}>
          <Route index element={<Charts />} /> 
          <Route path='table' element={<Table />} /> 
          <Route path='settings' element={<Settings />} /> 
          <Route path='*' element={<NotFound />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


