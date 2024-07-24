import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/main.css';
import App from './App';
import { ShopProvider } from './components/context/ShopContext';

// Get the root container
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>
);



