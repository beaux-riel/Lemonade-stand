# Stand Deactivation Fix

## Issue

Users were experiencing the following error when attempting to deactivate a stand:

```
Failed to deactivate stand: stack depth limit exceeded
```

This error occurred because of a recursive trigger in the database. When a user tried to deactivate a stand by setting `is_active = false`, this triggered the `check_expired_stands_trigger`, which then updated the stands table again, which triggered the same trigger again, and so on, causing a stack depth limit exceeded error.

## Solution

The solution involves modifying the database triggers to prevent recursive calls when deactivating stands. The key changes are:

1. Replaced the problematic `check_expired_stands_trigger` with a more robust `check_stand_expiration_trigger` that specifically avoids running when the `is_active` field is being updated.

2. Created a new standalone function `check_and_deactivate_expired_stands()` that can be called by a scheduled job to deactivate expired stands without triggering recursive updates.

3. Updated the `cleanup_expired_stands()` function to use the new `check_and_deactivate_expired_stands()` function.

## Implementation

The fix is implemented in the migration file `supabase/migrations/06_fix_stand_deactivation.sql`. This migration:

1. Drops the problematic trigger
2. Creates new functions for checking and deactivating expired stands
3. Creates a new trigger that avoids recursive calls
4. Updates existing functions to use the new approach

## Deployment

To deploy this fix:

1. Apply the migration to your Supabase database:
   ```
   supabase db push
   ```

2. Verify that stands can be deactivated without errors.

## Testing

To test this fix:

1. Create a stand
2. Attempt to deactivate the stand
3. Verify that no error occurs and the stand is successfully deactivated

## Additional Notes

This fix maintains all the existing functionality while eliminating the recursive trigger issue. Stands will still be automatically deactivated when they expire, but the process is now more robust and avoids the stack depth limit exceeded error.