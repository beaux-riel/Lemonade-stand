import React from 'react';
import { AuthForm } from '../components/auth';
import { Link } from 'react-router-dom';

/**
 * Register page component
 * @returns {JSX.Element} - Register page component
 */
const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display text-lemonade-blue-dark mb-2">
            Create an Account
          </h1>
          <p className="text-gray-600">
            Sign up to start managing your lemonade stands
          </p>
        </div>
        
        <AuthForm initialMode="register" />
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-lemonade-blue hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;