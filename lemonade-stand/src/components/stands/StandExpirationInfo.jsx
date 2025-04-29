import React, { useState } from 'react';
import { extendStandExpiration, reopenStand } from '../../api/supabaseApi';
import { Button, Alert } from '../ui';

/**
 * Component to display and manage stand expiration
 * @param {Object} props - Component props
 * @param {Object} props.stand - Stand data including expiration_time
 * @param {Function} props.onExtend - Callback function when stand is extended
 * @returns {JSX.Element} - Stand expiration info component
 */
const StandExpirationInfo = ({ stand, onExtend }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Calculate time remaining until expiration
  const calculateTimeRemaining = () => {
    if (!stand.expiration_time) return null;
    
    const now = new Date();
    const expiration = new Date(stand.expiration_time);
    const diffMs = expiration - now;
    
    // If already expired
    if (diffMs <= 0) {
      return { expired: true, timeString: 'Expired' };
    }
    
    // Calculate hours and minutes remaining
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    let timeString = '';
    if (diffHrs > 0) {
      timeString += `${diffHrs} hour${diffHrs !== 1 ? 's' : ''}`;
    }
    if (diffMins > 0 || diffHrs === 0) {
      if (diffHrs > 0) timeString += ' and ';
      timeString += `${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
    }
    
    return { 
      expired: false, 
      timeString,
      hours: diffHrs,
      minutes: diffMins,
      critical: diffHrs === 0 && diffMins < 30 // Less than 30 minutes remaining
    };
  };
  
  const timeRemaining = calculateTimeRemaining();
  
  // Handle reopening an expired stand
  const handleReopen = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { data, error } = await reopenStand(stand.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setSuccess('Stand reopened successfully! Active until midnight today.');
      
      // Call the onExtend callback with the updated stand data
      if (onExtend && data) {
        onExtend(data);
      }
    } catch (err) {
      console.error('Error reopening stand:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // If no expiration time is set
  if (!stand.expiration_time) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-yellow-800 mb-2">
          This stand does not have an expiration time set.
        </p>
        <Button
          variant="secondary"
          onClick={handleReopen}
          disabled={loading}
          size="sm"
        >
          {loading ? 'Setting expiration...' : 'Activate until midnight'}
        </Button>
      </div>
    );
  }
  
  // Format the expiration date to show date and time
  const formatExpirationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  return (
    <div className={`rounded-lg p-4 mb-4 ${
      timeRemaining.expired 
        ? 'bg-red-50 border border-red-200' 
        : timeRemaining.critical
          ? 'bg-orange-50 border border-orange-200'
          : 'bg-blue-50 border border-blue-200'
    }`}>
      {error && (
        <Alert 
          variant="error" 
          className="mb-3"
          dismissible
          onDismiss={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          variant="success" 
          className="mb-3"
          dismissible
          onDismiss={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 className={`font-medium ${
            timeRemaining.expired 
              ? 'text-red-800' 
              : timeRemaining.critical
                ? 'text-orange-800'
                : 'text-blue-800'
          }`}>
            Stand Visibility Status
          </h3>
          
          <p className={`${
            timeRemaining.expired 
              ? 'text-red-600' 
              : timeRemaining.critical
                ? 'text-orange-600'
                : 'text-blue-600'
          }`}>
            {timeRemaining.expired 
              ? 'This stand has expired and is no longer visible to the public.' 
              : `Time remaining: ${timeRemaining.timeString}`
            }
          </p>
          
          {!timeRemaining.expired && (
            <p className="text-gray-600 text-sm mt-1">
              Expires at midnight: {formatExpirationDate(stand.expiration_time)}
            </p>
          )}
        </div>
        
        <Button
          variant={timeRemaining.expired ? "primary" : "secondary"}
          onClick={handleReopen}
          disabled={loading}
          className="mt-3 md:mt-0"
        >
          {loading 
            ? 'Processing...' 
            : timeRemaining.expired 
              ? 'Reopen Stand' 
              : 'Active Until Midnight'
          }
        </Button>
      </div>
    </div>
  );
};

export default StandExpirationInfo;