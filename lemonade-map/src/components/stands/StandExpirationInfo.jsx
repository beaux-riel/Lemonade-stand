import React, { useState, useEffect, useRef } from 'react';
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
  const [timeRemaining, setTimeRemaining] = useState(null);
  const timerRef = useRef(null);
  
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
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    let timeString = '';
    if (diffHrs > 0) {
      timeString += `${diffHrs} hour${diffHrs !== 1 ? 's' : ''}`;
    }
    if (diffMins > 0 || diffHrs === 0) {
      if (diffHrs > 0) timeString += ' and ';
      timeString += `${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
    }
    if (diffHrs === 0 && diffMins === 0) {
      timeString = `${diffSecs} second${diffSecs !== 1 ? 's' : ''}`;
    }
    
    return { 
      expired: false, 
      timeString,
      hours: diffHrs,
      minutes: diffMins,
      seconds: diffSecs,
      critical: diffHrs === 0 && diffMins < 30 // Less than 30 minutes remaining
    };
  };
  
  // Update time remaining every second
  useEffect(() => {
    // Initial calculation
    const initialTimeRemaining = calculateTimeRemaining();
    setTimeRemaining(initialTimeRemaining);
    
    // Set up timer to update every second
    timerRef.current = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining();
      setTimeRemaining(newTimeRemaining);
      
      // If expired or no time remaining data, clear the interval
      if ((newTimeRemaining && newTimeRemaining.expired) || !newTimeRemaining) {
        clearInterval(timerRef.current);
      }
    }, 1000);
    
    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stand.expiration_time]);
  
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
      
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(23, 59, 59, 999);
      
      const hoursUntilMidnight = Math.round((midnight - now) / (1000 * 60 * 60));
      
      setSuccess(`Stand reopened successfully! Active for the next ${hoursUntilMidnight} hours (until midnight).`);
      
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
  
  // Calculate if the stand expires today
  const expiresLaterToday = () => {
    if (!stand.expiration_time) return false;
    
    const now = new Date();
    const expiration = new Date(stand.expiration_time);
    
    return now.getDate() === expiration.getDate() && 
           now.getMonth() === expiration.getMonth() && 
           now.getFullYear() === expiration.getFullYear();
  };
  
  // Handle the case where timeRemaining is null
  const isExpired = timeRemaining?.expired || false;
  const isCritical = timeRemaining?.critical || false;
  
  return (
    <div className={`rounded-lg p-4 mb-4 ${
      isExpired 
        ? 'bg-red-50 border border-red-200' 
        : isCritical
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
            isExpired 
              ? 'text-red-800' 
              : isCritical
                ? 'text-orange-800'
                : 'text-blue-800'
          }`}>
            Stand Visibility Status
          </h3>
          
          {isExpired ? (
            <p className="text-red-600">
              This stand has expired and is no longer visible to the public.
            </p>
          ) : (
            <>
              <div className={`flex items-center ${
                isCritical
                  ? 'text-orange-600'
                  : 'text-blue-600'
              }`}>
                <span className="text-lg font-semibold mr-2">Countdown:</span>
                <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                  <span className="font-mono text-lg">
                    {timeRemaining ? timeRemaining.timeString : 'Calculating...'}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mt-2">
                {expiresLaterToday() 
                  ? `Expires tonight at midnight (${formatExpirationDate(stand.expiration_time)})` 
                  : `Expires at midnight: ${formatExpirationDate(stand.expiration_time)}`}
              </p>
            </>
          )}
        </div>
        
        <Button
          variant={isExpired ? "primary" : "secondary"}
          onClick={handleReopen}
          disabled={loading}
          className="mt-3 md:mt-0"
        >
          {loading 
            ? 'Processing...' 
            : isExpired 
              ? 'Reopen Stand' 
              : expiresLaterToday()
                ? 'Active Until Tonight'
                : 'Active Until Midnight'
          }
        </Button>
      </div>
    </div>
  );
};

export default StandExpirationInfo;