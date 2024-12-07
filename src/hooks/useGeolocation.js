/**
 * Custom hook for handling browser geolocation
 * @returns {Object} Location data and status
 * @property {Object|null} location - Contains latitude and longitude if available
 * @property {string|null} error - Error message if geolocation fails
 * @property {boolean} loading - Indicates if geolocation is in progress
 */
import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }

    // Request user's location
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      // Error callback
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      // Options for geolocation request
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
      }
    );
  }, []);

  return { location, error, loading };
};
