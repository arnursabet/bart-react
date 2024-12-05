import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(null);
  const [showSetupModal, setShowSetupModal] = useState(false);

  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (!savedPrefs) {
      setShowSetupModal(true);
    } else {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const savePreferences = (prefs) => {
    const updatedPrefs = {
      ...prefs,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    setPreferences(updatedPrefs);
    setShowSetupModal(false);
  };

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

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within UserPreferencesProvider');
  }
  return context;
};