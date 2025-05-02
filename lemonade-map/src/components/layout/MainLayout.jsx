import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../api/supabaseApi';
import UserMenu from './UserMenu';
/**
 * Main layout component with header and footer
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} - Main layout component
 */
const MainLayout = ({ children }) => {
  const { isAuthenticated, user, initializing } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-lemonade-yellow shadow-playful py-4 md:py-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl md:text-4xl font-display text-gray-800">
                Lemonade Map
              </h1>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-lemonade-blue-dark transition"
              >
                Home
              </Link>
              
              <Link
                to="/about"
                className="text-gray-700 hover:text-lemonade-blue-dark transition"
              >
                About
              </Link>
              
              <Link
                to="/contact"
                className="text-gray-700 hover:text-lemonade-blue-dark transition"
              >
                Contact
              </Link>

              {initializing ? (
                <div className="flex items-center">
                  <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
                </div>
              ) : isAuthenticated ? (
                <>
                  <Link
                    to="/seller/dashboard"
                    className="text-gray-700 hover:text-lemonade-blue-dark transition"
                  >
                    Dashboard
                  </Link>
                    <UserMenu />
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-lemonade-blue-dark transition"
                  >
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
              <button 
                className="text-gray-700 hover:text-lemonade-blue-dark transition p-2"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 border-t border-gray-200 pt-2">
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-lemonade-blue-dark transition py-2 px-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-lemonade-blue-dark transition py-2 px-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-lemonade-blue-dark transition py-2 px-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {initializing ? (
                  <div className="py-2 px-1">
                    <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <Link
                      to="/seller/dashboard"
                      className="text-gray-700 hover:text-lemonade-blue-dark transition py-2 px-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-lemonade-blue-dark transition py-2 px-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left w-full text-gray-700 hover:text-lemonade-blue-dark transition py-2 px-1"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-lemonade-blue-dark transition py-2 px-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="text-gray-700 hover:text-lemonade-blue-dark transition py-2 px-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-display">Lemonade Map</h2>
              <p className="text-gray-400">
                {" "}
                Helping kids learn business skills while bringing communities
                together!
              </p>
            </div>

            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Lemonade Map. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;