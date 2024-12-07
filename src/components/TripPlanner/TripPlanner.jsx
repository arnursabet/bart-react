import { useState, useRef, lazy, Suspense } from 'react';
import TripForm from '../TripForm';
import RouteResults from '../RouteResults';
import './TripPlanner.css';
import { CSSTransition } from 'react-transition-group';

/**
 * Main Trip Planner component that handles the overall trip planning interface.
 * Manages state transitions between hero view and results view.
 */

// Lazy load MapModal component for better initial load performance
const MapModal = lazy(() => import('../MapModal'));

/**
 * TripPlanner Component
 * @returns {JSX.Element} The rendered TripPlanner interface
 */
const TripPlanner = () => {
  // State for managing view transitions and route data
  const [showHero, setShowHero] = useState(true);
  const [routeData, setRouteData] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Refs for transition animations
  const heroRef = useRef(null);

  /**
   * Handles form submission and transitions to results view
   * @param {Object} data - Route data from API response
   */
  const handleFormSubmit = async (data = null) => {
    if (!data) return;
    requestAnimationFrame(() => {
      setRouteData(data);
      setShowHero(false);
    });
  };

  const handleBackClick = () => {
    setShowHero(true);
    setRouteData(null);
  };

  const handleMapOpen = () => setIsMapModalOpen(true);

  const handleMapKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsMapModalOpen(true);
    }
  };

  return (
    <div className="trip-planner">
      <CSSTransition
        nodeRef={heroRef}
        in={showHero}
        timeout={300}
        classNames="hero"
        unmountOnExit
      >
        <div ref={heroRef} className="hero-section">
          {/* Hero content */}
          <img src="/bart-logo.png" alt="BART Logo" className="bart-logo" />
          <div className="hero-content">
            <h1 className="page-title">Plan Your Trip</h1>
            <div className="service-info">
              <div className="service-hours">
                <h3>BART Service Hours</h3>
                <p>Weekdays (5:00 am - Midnight)<br/>
                Saturday (6:00 am - Midnight)<br/>
                Sunday (8:00 am - Midnight)</p>
              </div>
            </div>
          </div>
          <div className="map-overlay">
            <div 
              className="map-container"
              onClick={handleMapOpen}
              role="button"
              tabIndex={0}
              onKeyDown={handleMapKeyPress}
              aria-label="Open BART system map"
            >
              <img
                src="/bart-map.png"
                alt="BART System Map"
                className="system-map"
              />
              <button 
                className="view-map-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMapModalOpen(true);
                }}
              >
                <span><strong>Expand Map</strong></span>
                <img 
                  src="/expand-image.png" 
                  alt=""
                  className="expand-icon"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>

      <div className="content-section">
        {showHero ? (
          <div>
            <TripForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <div>
            <button className="back-button" onClick={handleBackClick}>
              ← Back to Trip Planner
            </button>
            <RouteResults routeData={routeData} />
          </div>
        )}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <MapModal 
          isOpen={isMapModalOpen} 
          onClose={() => setIsMapModalOpen(false)} 
        />
      </Suspense>
    </div>
  );
};

export default TripPlanner;