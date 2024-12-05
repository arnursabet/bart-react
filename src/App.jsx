import React from 'react';
import TripPlanner from './components/TripPlanner';
import './App.css';
import { StationsProvider } from './context/stationContext';
import { RoutesProvider } from './context/routesContext';
import { ClipperModal } from './components/ClipperModal';
import { UserPreferencesProvider, useUserPreferences } from './context/userPreferencesContext';

const AppContent = () => {
  const { showSetupModal, setShowSetupModal } = useUserPreferences();
  
  return (
    <>
      <ClipperModal 
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
      />
      <TripPlanner />
    </>
  );
};

const App = () => {
  return (
    <UserPreferencesProvider>
      <RoutesProvider>
        <StationsProvider>
          <AppContent />
        </StationsProvider>
      </RoutesProvider>
    </UserPreferencesProvider>
  );
};

export default App;