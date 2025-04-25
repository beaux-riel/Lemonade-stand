import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

/**
 * 404 Not Found page component
 * @returns {JSX.Element} - Not Found page component
 */
const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-display text-lemonade-blue-dark mb-4">404</h1>
      <h2 className="text-3xl font-display text-lemonade-blue mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;