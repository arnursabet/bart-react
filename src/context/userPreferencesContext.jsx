/**
 * Context for managing user preferences across the application
 * Handles storage and retrieval of user settings from localStorage
 */
import { createContext, useState, useEffect, useMemo } from 'react';

export const UserPreferencesContext = createContext();

/**
 * Provider component for user preferences
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(null);
  const [showSetupModal, setShowSetupModal] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (!savedPrefs) {
      setShowSetupModal(true);
    } else {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  /**
   * Saves user preferences to localStorage and updates state
   * @param {Object} prefs - User preferences object
   */
  const savePreferences = (prefs) => {
    const updatedPrefs = {
      ...prefs,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    setPreferences(updatedPrefs);
    setShowSetupModal(false);
  };

  // Memoize context value to prevent unnecessary rerenders
  const contextValue = useMemo(() => ({
    preferences,
    savePreferences,
    showSetupModal,
    setShowSetupModal
  }), [preferences, showSetupModal]);

  return (
    <UserPreferencesContext.Provider value={contextValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

