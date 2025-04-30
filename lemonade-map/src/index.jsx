import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

// Preload critical assets
const preloadCriticalAssets = () => {
  // Preload main CSS
  const linkCss = document.createElement('link');
  linkCss.rel = 'preload';
  linkCss.as = 'style';
  linkCss.href = '/styles/tailwind.css';
  document.head.appendChild(linkCss);
  
  // Preload critical fonts
  const fontUrls = [
    '/fonts/lemonade-display.woff2',
    '/fonts/lemonade-body.woff2'
  ];
  
  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = url;
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Execute preloading
preloadCriticalAssets();

// Create root with concurrent mode for better performance
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Send web vitals to analytics
reportWebVitals(metric => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // In production, you could send to an analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: send to analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify(metric),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  }
});
