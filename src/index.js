import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TimelineProvider } from './contexts/Timeline'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TimelineProvider>
        <App />
    </TimelineProvider>
  </React.StrictMode>
);


