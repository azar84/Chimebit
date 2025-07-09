import React from 'react';
import ReactDOM from 'react-dom/client';
import { Dashboard } from './components/dashboard/Dashboard';
import './styles/globals.css';
import './styles/design-system.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
); 