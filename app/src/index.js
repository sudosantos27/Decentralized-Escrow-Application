import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Create a root for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Check if the browser has Ethereum provider (e.g., MetaMask) installed
if (!window.ethereum) {
  // Render a message indicating the need to install a browser wallet
  root.render(
    <React.StrictMode>
      You need to install a browser wallet to build the escrow dapp
    </React.StrictMode>
  );
} else {
  // Render the App component if Ethereum provider is available
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
