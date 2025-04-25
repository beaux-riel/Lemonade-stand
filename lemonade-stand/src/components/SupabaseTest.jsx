import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function SupabaseTest() {
  const [status, setStatus] = useState('Checking connection...');
  const [user, setUser] = useState(null);
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Test Supabase connection
    async function testConnection() {
      try {
        // Check if we can connect to Supabase
        const { data, error } = await supabase.from('stands').select('count');
        
        if (error) {
          setStatus('Connection failed');
          setError(error.message);
        } else {
          setStatus('Connected to Supabase');
          
          // Fetch stands
          const { data: standsData, error: standsError } = await supabase
            .from('stands')
            .select('*')
            .eq('is_active', true);
            
          if (standsError) {
            setError(standsError.message);
          } else {
            setStands(standsData || []);
          }
          
          // Get current user
          const { data: userData } = await supabase.auth.getUser();
          setUser(userData?.user || null);
        }
      } catch (err) {
        setStatus('Connection error');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="mb-4">
        <h2 className="font-semibold">Connection Status:</h2>
        <p className={`${status.includes('failed') || status.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
          {status}
        </p>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <div className="mb-4">
        <h2 className="font-semibold">Authentication:</h2>
        {user ? (
          <div>
            <p>Logged in as: {user.email}</p>
            <button 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
      
      <div>
        <h2 className="font-semibold">Stands:</h2>
        {loading ? (
          <p>Loading stands...</p>
        ) : stands.length > 0 ? (
          <ul className="list-disc pl-5">
            {stands.map(stand => (
              <li key={stand.id}>{stand.name}</li>
            ))}
          </ul>
        ) : (
          <p>No stands found</p>
        )}
      </div>
    </div>
  );
}

export default SupabaseTest;