import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './components/storeContext'; // Import StoreProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreProvider>
      <div className='dark:bg-slate-900 dark:text-white'>
        <App />
      </div>
    </StoreProvider>
  </BrowserRouter>
);
