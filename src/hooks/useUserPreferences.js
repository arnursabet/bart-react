import { useContext } from 'react';
import { UserPreferencesContext } from '../context/userPreferencesContext';

export const useUserPreferences = () => {
    const context = useContext(UserPreferencesContext);
    if (!context) {
      throw new Error('useUserPreferences must be used within UserPreferencesProvider');
    }
    return context;
  };