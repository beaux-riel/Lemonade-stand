import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css';

// Preload critical assets
const preloadCriticalAssets = () => {
  // Get the base URL from the window location
  const baseUrl = window.location.origin;
  
  // Preload main CSS
  const linkCss = document.createElement('link');
  linkCss.rel = 'preload';
  linkCss.as = 'style';
  linkCss.href = `${baseUrl}/styles/tailwind.css`;
  document.head.appendChild(linkCss);
  
  // Preload Leaflet CSS
  const leafletCss = document.createElement('link');
  leafletCss.rel = 'preload';
  leafletCss.as = 'style';
  leafletCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
  document.head.appendChild(leafletCss);
  
  // Preload critical fonts
  const fontUrls = [
    `${baseUrl}/fonts/lemonade-display.woff2`,
    `${baseUrl}/fonts/lemonade-body.woff2`
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
  
  // Preload marker icons
  const markerUrls = [
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    `${baseUrl}/images/markers/lemonade-marker.svg`,
    `${baseUrl}/images/markers/user-location.svg`
  ];
  
  markerUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
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
