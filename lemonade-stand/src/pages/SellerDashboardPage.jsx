import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserStands, createStand } from '../api/supabaseApi';
import { Link } from 'react-router-dom';
import { Button, Alert } from '../components/ui';

/**
 * Seller Dashboard page component
 * @returns {JSX.Element} - Seller Dashboard page component
 */
const SellerDashboardPage = () => {
  const { user } = useAuth();
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user's stands
  useEffect(() => {
    const fetchStands = async () => {
      try {
        const { data, error } = await getUserStands(user.id);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setStands(data || []);
      } catch (err) {
        console.error('Error fetching stands:', err);
        setError('Failed to load your stands. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStands();
  }, [user.id]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display text-lemonade-blue-dark mb-2">
          Seller Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your lemonade stands and products
        </p>
      </div>
      
      {error && (
        <Alert 
          variant="error" 
          className="mb-6"
          dismissible
          onDismiss={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display text-lemonade-blue-dark">
            Your Lemonade Stands
          </h2>
          <Link to="/seller/stands/new">
            <Button variant="primary">
              Add New Stand
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lemonade-blue"></div>
          </div>
        ) : stands.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">You don't have any lemonade stands yet.</p>
            <Link to="/seller/stands/new">
              <Button variant="primary">
                Create Your First Stand
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stands.map((stand) => (
              <div key={stand.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                {stand.image_url ? (
                  <img 
                    src={stand.image_url} 
                    alt={stand.name} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-lemonade-yellow-light flex items-center justify-center">
                    <span className="text-lemonade-yellow-dark">No Image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-display text-lemonade-blue-dark mb-2">
                    {stand.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {stand.description || 'No description'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      stand.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {stand.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <Link 
                      to={`/seller/stands/${stand.id}`}
                      className="text-lemonade-blue hover:underline"
                    >
                      Manage →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboardPage;