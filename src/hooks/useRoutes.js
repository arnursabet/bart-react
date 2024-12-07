import { useContext } from 'react';
import { RoutesContext } from '../context/routesContext';

export const useRoutes = () => {
    const context = useContext(RoutesContext);
    if (!context) {
      throw new Error('useRoutes must be used within RoutesProvider');
    }
    return context;
  };