import { createContext, useContext, useEffect, useState } from 'react';
import { bartApi } from '../services/bartApi';

const RoutesContext = createContext();

export const useRoutes = () => {
  const context = useContext(RoutesContext);
  if (!context) {
    throw new Error('useRoutes must be used within RoutesProvider');
  }
  return context;
};

export const RoutesProvider = ({ children }) => {
  const [routes, setRoutes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await bartApi.getRoutes();
        // Create a Map for O(1) lookups
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