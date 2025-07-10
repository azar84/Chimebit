import React from 'react';
import ReactDOM from 'react-dom/client';
import { PhoneManager } from './components/phone/PhoneManager';
import './styles/globals.css';
import './styles/design-system.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PhoneManager />
  </React.StrictMode>,
); 