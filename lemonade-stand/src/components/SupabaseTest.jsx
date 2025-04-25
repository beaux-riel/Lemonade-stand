import React, { useState, useEffect } from 'react';
import { Alert, Loader } from './ui';
import { AuthForm } from './auth';
import { useAuth } from '../contexts/AuthContext';
import { useStands } from '../contexts/StandContext';
import { getStands, subscribeToStands, unsubscribe } from '../api/supabaseApi';
import supabase from '../supabaseClient';

function SupabaseTest() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { stands, loading: standsLoading } = useStands();
  const [status, setStatus] = useState('Checking connection...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [realtimeEnabled, setRealtimeEnabled] = useState(false);
  const [realtimeStands, setRealtimeStands] = useState([]);

  // Test Supabase connection
  useEffect(() => {
    async function testConnection() {
      try {
        // Check if we can connect to Supabase
        const { data, error } = await supabase.from('stands').select('count');
        
        if (error) {
          setStatus('Connection failed');
          setError(error.message);
        } else {
          setStatus('Connected to Supabase');
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

  // Set up real-time subscription when enabled
  useEffect(() => {
    if (!realtimeEnabled) return;

    // Fetch initial data
    const fetchStands = async () => {
      try {
        const { data, error } = await getStands();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setRealtimeStands(data || []);
      } catch (err) {
        console.error('Error fetching stands:', err);
      }
    };
    
    fetchStands();
    
    // Set up real-time subscription
    const subscription = subscribeToStands((payload) => {
      console.log('Real-time stand update:', payload);
      
      if (payload.eventType === 'INSERT') {
        setRealtimeStands(prev => [...prev, payload.new]);
      } else if (payload.eventType === 'UPDATE') {
        setRealtimeStands(prev => 
          prev.map(stand => stand.id === payload.new.id ? payload.new : stand)
        );
      } else if (payload.eventType === 'DELETE') {
        setRealtimeStands(prev => 
          prev.filter(stand => stand.id !== payload.old.id)
        );
      }
    });
    
    // Clean up subscription on unmount or when disabled
    return () => {
      unsubscribe(subscription);
    };
  }, [realtimeEnabled]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display text-lemonade-blue-dark mb-6">Supabase Integration Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="p-6 bg-white rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            
            {loading ? (
              <Loader size="md" variant="yellow" />
            ) : (
              <>
                <p className={`font-medium ${status.includes('failed') || status.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                  {status}
                </p>
                {error && (
                  <Alert variant="error" className="mt-2">
                    {error}
                  </Alert>
                )}
              </>
            )}
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Authentication</h2>
            <AuthForm />
          </div>
        </div>
        
        <div>
          <div className="p-6 bg-white rounded-xl shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Stands from Context</h2>
              {standsLoading && <Loader size="sm" variant="yellow" />}
            </div>
            
            {stands.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {stands.map(stand => (
                  <li key={stand.id} className="py-3">
                    <h3 className="font-medium">{stand.name}</h3>
                    <p className="text-sm text-gray-600">{stand.address}</p>
                  </li>
                ))}
              </ul>
            ) : !standsLoading ? (
              <p className="text-gray-500">No stands found</p>
            ) : null}
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Real-time Subscription</h2>
              <button
                className={`px-3 py-1 rounded text-sm ${
                  realtimeEnabled 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setRealtimeEnabled(!realtimeEnabled)}
              >
                {realtimeEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            
            {realtimeEnabled ? (
              realtimeStands.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {realtimeStands.map(stand => (
                    <li key={stand.id} className="py-3">
                      <h3 className="font-medium">{stand.name}</h3>
                      <p className="text-sm text-gray-600">{stand.address}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No stands found</p>
              )
            ) : (
              <p className="text-gray-500">
                Click "Disabled" to enable real-time updates
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupabaseTest;