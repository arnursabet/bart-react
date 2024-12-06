import { createContext, useContext, useState, useEffect } from 'react';
import { bartApi } from '../services/bartApi';

const StationsContext = createContext();

export const useStations = () => {
  const context = useContext(StationsContext);
  if (!context) {
    throw new Error('useStations must be used within StationsProvider');
  }
  return context;
};

export const StationsProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await bartApi.getStations();
        // Create a Map for O(1) lookups
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