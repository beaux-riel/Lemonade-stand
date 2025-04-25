# Supabase Setup for Lemonade Stand Frontend

This guide will help you set up the Supabase integration for the Lemonade Stand frontend application.

## Prerequisites

- A Supabase project (see `/supabase/README.md` for setup instructions)
- Your Supabase project URL and anon/public key

## Setup Steps

### 1. Install Supabase Client

The project already has the Supabase client installed, but if you need to install it manually:

```bash
npm install @supabase/supabase-js
```

### 2. Configure Environment Variables

1. Create a `.env` file in the root of the frontend project by copying the `.env.example` file:

```bash
cp .env.example .env
```

2. Update the `.env` file with your Supabase project URL and anon key:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your Supabase project dashboard under Project Settings > API.

### 3. Using Supabase in Your Components

The project includes a `supabaseClient.js` file that creates and exports a Supabase client instance. You can import this client in your components:

```javascript
import supabase from '../supabaseClient';
```

Alternatively, you can use the pre-built API functions in `src/api/supabaseApi.js`:

```javascript
import { signIn, getStands, createProduct } from '../api/supabaseApi';
```

### 4. Authentication Example

Here's an example of how to implement authentication in a React component:

```jsx
import React, { useState } from 'react';
import { signIn } from '../api/supabaseApi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        // Redirect or update state on successful login
        console.log('Logged in successfully!', data);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}

export default Login;
```

### 5. Data Fetching Example

Here's an example of how to fetch and display stands:

```jsx
import React, { useEffect, useState } from 'react';
import { getStands } from '../api/supabaseApi';

function StandsList() {
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStands() {
      try {
        const { data, error } = await getStands();
        
        if (error) {
          setError(error.message);
        } else {
          setStands(data || []);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStands();
  }, []);

  if (loading) return <div>Loading stands...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lemonade Stands</h2>
      {stands.length === 0 ? (
        <p>No stands found.</p>
      ) : (
        <ul>
          {stands.map((stand) => (
            <li key={stand.id}>
              <h3>{stand.name}</h3>
              <p>{stand.description}</p>
              <p>Address: {stand.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StandsList;
```

### 6. Real-time Subscriptions

Supabase supports real-time updates. Here's an example of how to subscribe to changes:

```jsx
import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

function RealtimeStands() {
  const [stands, setStands] = useState([]);

  useEffect(() => {
    // Fetch initial data
    const fetchStands = async () => {
      const { data } = await supabase
        .from('stands')
        .select('*')
        .eq('is_active', true);
      
      setStands(data || []);
    };

    fetchStands();

    // Set up real-time subscription
    const subscription = supabase
      .channel('public:stands')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'stands',
        filter: 'is_active=eq.true'
      }, (payload) => {
        console.log('Change received!', payload);
        
        if (payload.eventType === 'INSERT') {
          setStands(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setStands(prev => 
            prev.map(stand => stand.id === payload.new.id ? payload.new : stand)
          );
        } else if (payload.eventType === 'DELETE') {
          setStands(prev => 
            prev.filter(stand => stand.id !== payload.old.id)
          );
        }
      })
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div>
      <h2>Lemonade Stands (Real-time)</h2>
      <ul>
        {stands.map(stand => (
          <li key={stand.id}>{stand.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RealtimeStands;
```

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)