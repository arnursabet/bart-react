/**
 * Context for managing BART station information
 * Provides station data and loading states to components
 */
import { createContext, useState, useEffect } from 'react';
import { bartApi } from '../services/bartApi';

export const StationsContext = createContext();

/**
 * Provider component for BART stations data
 * Fetches and caches station information
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const StationsProvider = ({ children }) => {
  // Store stations in a Map for O(1) lookups
  const [stations, setStations] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stations data on mount
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await bartApi.getStations();
        // Convert array to Map for efficient lookups
        const stationsMap = new Map(
          data.map(station => [station.abbr, station])
        );
        setStations(stationsMap);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return (
    <StationsContext.Provider value={{ stations, loading, error }}>
      {children}
    </StationsContext.Provider>
  );
};