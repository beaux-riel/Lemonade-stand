import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../api/supabaseApi';

/**
 * Main layout component with header and footer
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} - Main layout component
 */
const MainLayout = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-lemonade-yellow shadow-playful py-4 md:py-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl md:text-4xl font-display text-gray-800">Lemonade Stand</h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-lemonade-blue-dark transition">
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/seller/dashboard" className="text-gray-700 hover:text-lemonade-blue-dark transition">
                    Dashboard
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center text-gray-700 hover:text-lemonade-blue-dark transition">
                      <span className="mr-1">{user?.user_metadata?.full_name || user?.email}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-lemonade-blue-dark transition">
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-lemonade-blue text-white rounded-md hover:bg-lemonade-blue-dark transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-lemonade-blue-dark transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-display">Lemonade Stand</h2>
              <p className="text-gray-400">Find and manage lemonade stands</p>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-400 hover:text-white transition">
                Home
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition">
                About
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Lemonade Stand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;