import React from 'react';
import { MapPage } from '../components/map';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

/**
 * Home page component that displays the map of lemonade stands
 * @returns {JSX.Element} - Home page component
 */
const HomePage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-display text-lemonade-blue-dark mb-2">
            Find Lemonade Stands Near You
          </h1>
          <p className="text-gray-600 mb-4">
            Browse the map to discover refreshing lemonade stands in your area
          </p>
        </div>
        
        {!isAuthenticated && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700 mb-3">
              Are you a lemonade stand owner?
            </p>
            <div className="flex space-x-3">
              <Link 
                to="/login" 
                className="px-4 py-2 bg-lemonade-blue text-white rounded-md hover:bg-lemonade-blue-dark transition"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 border border-lemonade-yellow bg-white text-lemonade-blue-dark rounded-md hover:bg-lemonade-yellow-light transition"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <MapPage />
    </div>
  );
};

export default HomePage;