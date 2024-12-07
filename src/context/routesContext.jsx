/**
 * Context for managing BART route information
 * Provides route data and loading states to components
 */
import { createContext, useEffect, useState } from 'react';
import { bartApi } from '../services/bartApi';

export const RoutesContext = createContext();

/**
 * Provider component for BART routes data
 * Fetches and caches route information
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const RoutesProvider = ({ children }) => {
  // Store routes in a Map for O(1) lookups
  const [routes, setRoutes] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch routes data on mount
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await bartApi.getRoutes();
        // Convert array to Map for efficient lookups
        const routesMap = new Map(
          data.map(route => [route.routeID, route])
        );
        setRoutes(routesMap);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <RoutesContext.Provider value={{ routes, loading, error }}>
      {children}
    </RoutesContext.Provider>
  );
};