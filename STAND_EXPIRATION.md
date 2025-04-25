# Stand Expiration Logic

This document explains the stand expiration logic implemented in the Lemonade Stand application.

## Overview

Lemonade stands are automatically hidden (deactivated) after 24 hours to ensure that the map only shows currently active stands. This is implemented using:

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

When a new stand is created, a trigger automatically sets its expiration time to 24 hours from creation:

```sql
CREATE OR REPLACE FUNCTION set_stand_expiration_time()
RETURNS TRIGGER AS $$
BEGIN
  NEW.expiration_time := NEW.created_at + INTERVAL '24 hours';
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
// Extend a stand's expiration time
export const extendStandExpiration = async (standId, hoursToExtend = 24) => {
  // Get current stand data
  const { data: stand, error: fetchError } = await supabase
    .from('stands')
    .select('expiration_time')
    .eq('id', standId)
    .single();
    
  if (fetchError) {
    return { error: fetchError };
  }
  
  // Calculate new expiration time
  let newExpirationTime;
  if (stand.expiration_time) {
    const currentExpiration = new Date(stand.expiration_time);
    const now = new Date();
    
    if (currentExpiration < now) {
      // If already expired, extend from current time
      newExpirationTime = new Date(now.getTime() + hoursToExtend * 60 * 60 * 1000);
    } else {
      // Otherwise extend from current expiration time
      newExpirationTime = new Date(currentExpiration.getTime() + hoursToExtend * 60 * 60 * 1000);
    }
  } else {
    // If no expiration time set, set it to current time + hours to extend
    newExpirationTime = new Date(new Date().getTime() + hoursToExtend * 60 * 60 * 1000);
  }
  
  // Update the stand with new expiration time
  const { data, error } = await supabase
    .from('stands')
    .update({
      expiration_time: newExpirationTime.toISOString(),
      is_active: true // Ensure the stand is active when extending
    })
    .eq('id', standId)
    .select();
    
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

1. See the remaining time until their stand expires
2. Extend their stand's visibility by 24 hours
3. Reactivate an expired stand

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