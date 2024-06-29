import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import App from './App';
import { ShopProvider } from '/Users/amathziah/Desktop/bewakoofclone/Summer-Projects-Bewakoof-clone---Summer-Project---4gospv7mnxsw/src/components/ShopContext'; 

ReactDOM.render(
  <React.StrictMode>
      <ShopProvider>
          <App />
      </ShopProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


