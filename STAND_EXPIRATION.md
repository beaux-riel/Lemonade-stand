# Stand Expiration Logic

This document explains the stand expiration logic implemented in the Lemonade Stand application.

## Overview

Lemonade stands are automatically hidden (deactivated) at midnight on the day they are created to ensure that the map only shows currently active stands. Stand owners can reopen expired stands without needing to create new ones. This is implemented using:

1. PostgreSQL functions and triggers
2. Supabase Edge Functions with cron jobs
3. Frontend components for stand owners to manage expiration

## Database Implementation

### Schema Changes

The `stands` table has been extended with an `expiration_time` column:

```sql
ALTER TABLE public.stands 
ADD COLUMN IF NOT EXISTS expiration_time TIMESTAMP WITH TIME ZONE;
```

### Automatic Expiration Setting

When a new stand is created, a trigger automatically sets its expiration time to midnight of the current day:

```sql
CREATE OR REPLACE FUNCTION set_stand_expiration_time()
RETURNS TRIGGER AS $$
BEGIN
  -- Set expiration time to midnight of the current day (next day at 00:00:00)
  NEW.expiration_time := (DATE_TRUNC('day', NEW.created_at) + INTERVAL '1 day')::TIMESTAMP WITH TIME ZONE;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_stand_expiration_time_trigger
BEFORE INSERT ON public.stands
FOR EACH ROW
EXECUTE FUNCTION set_stand_expiration_time();
```

### Automatic Deactivation

A trigger checks for expired stands whenever a stand is updated:

```sql
CREATE OR REPLACE FUNCTION deactivate_expired_stands()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.stands
  SET is_active = false
  WHERE expiration_time <= NOW()
  AND is_active = true;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_expired_stands_trigger
AFTER UPDATE ON public.stands
FOR EACH STATEMENT
EXECUTE FUNCTION deactivate_expired_stands();
```

### Manual Cleanup Function

A function is provided for manual cleanup of expired stands:

```sql
CREATE OR REPLACE FUNCTION cleanup_expired_stands()
RETURNS INTEGER AS $$
DECLARE
  affected_rows INTEGER;
BEGIN
  UPDATE public.stands
  SET is_active = false
  WHERE expiration_time <= NOW()
  AND is_active = true;
  
  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  RETURN affected_rows;
END;
$$ LANGUAGE plpgsql;
```

### Reopen Stand Function

A function is provided to reopen an expired stand:

```sql
CREATE OR REPLACE FUNCTION reopen_stand(stand_id UUID)
RETURNS SETOF stands AS $$
BEGIN
  -- Set expiration time to midnight of the current day and reactivate the stand
  RETURN QUERY
  UPDATE public.stands
  SET 
    expiration_time = (DATE_TRUNC('day', NOW()) + INTERVAL '1 day')::TIMESTAMP WITH TIME ZONE,
    is_active = true
  WHERE id = stand_id
  RETURNING *;
END;
$$ LANGUAGE plpgsql;
```

## Supabase Edge Function

A Supabase Edge Function is set up to run hourly and deactivate any expired stands:

```typescript
// Edge Function that calls the cleanup_expired_stands database function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Call the cleanup function
    const { data, error } = await supabaseClient.rpc('cleanup_expired_stands')

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully deactivated ${data} expired stands.` 
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
```

The Edge Function is configured to run on a schedule using the following configuration:

```json
{
  "name": "cleanup-expired-stands",
  "version": "1.0.0",
  "description": "Cleanup expired lemonade stands",
  "verify_jwt": false,
  "cron": "0 * * * *"
}
```

This sets up the function to run at the top of every hour.

## Frontend Implementation

### API Functions

The frontend includes functions to interact with stand expiration:

```javascript
// Extend or reopen a stand
export const extendStandExpiration = async (standId) => {
  // First get the current stand to check its expiration time
  const { data: stand, error: fetchError } = await supabase
    .from('stands')
    .select('expiration_time, is_active')
    .eq('id', standId)
    .single();
    
  if (fetchError) {
    return { error: fetchError };
  }
  
  const now = new Date();
  const currentExpiration = stand.expiration_time ? new Date(stand.expiration_time) : null;
  
  // If the stand is expired or inactive, use the reopen_stand function
  if (!stand.is_active || (currentExpiration && currentExpiration < now)) {
    const { data, error } = await supabase
      .rpc('reopen_stand', { stand_id: standId })
      .single();
    
    return { data, error };
  } else {
    // If the stand is still active, just return the current stand data
    return { 
      data: [stand], 
      message: "Stand is already active until midnight today." 
    };
  }
};

// Function to explicitly reopen a stand (for the reopen button)
export const reopenStand = async (standId) => {
  const { data, error } = await supabase
    .rpc('reopen_stand', { stand_id: standId })
    .single();
  
  return { data, error };
};
```

### UI Components

A `StandExpirationInfo` component is provided to display the expiration status and allow stand owners to extend their stand's visibility:

```jsx
<StandExpirationInfo 
  stand={stand} 
  onExtend={(updatedStand) => {
    // Handle the updated stand data
    setStand(updatedStand);
  }} 
/>
```

## Usage

### For Stand Owners

Stand owners can:

1. See the remaining time until their stand expires (midnight of the current day)
2. See that their stand is active until midnight
3. Reopen an expired stand (which will make it active until midnight of the current day)

### For Developers

To integrate stand expiration in a new component:

```jsx
import { StandExpirationInfo } from '../components/stands';
import { getStandById, extendStandExpiration } from '../api/supabaseApi';

function StandDetailPage({ standId }) {
  const [stand, setStand] = useState(null);
  
  useEffect(() => {
    async function fetchStand() {
      const { data } = await getStandById(standId);
      setStand(data);
    }
    
    fetchStand();
  }, [standId]);
  
  if (!stand) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{stand.name}</h1>
      
      {/* Display expiration info */}
      <StandExpirationInfo 
        stand={stand} 
        onExtend={(updatedStand) => setStand(updatedStand)} 
      />
      
      {/* Rest of the component */}
    </div>
  );
}
```

## Deployment

When deploying to Supabase:

1. Run the migration script to add the expiration_time column and create the functions and triggers
2. Deploy the Edge Function with the cron job configuration

```bash
# Deploy the Edge Function
supabase functions deploy cleanup-expired-stands --project-ref your-project-ref
```