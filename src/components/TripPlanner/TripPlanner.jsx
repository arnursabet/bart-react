import { useState, useEffect, useRef } from 'react';
import TripForm from '../TripForm';
import RouteResults from '../RouteResults';
import './TripPlanner.css';
import { useStations } from '../../context/stationContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const MapModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close map">×</button>
        <img
          src="/bart-map.png"
          alt="BART System Map"
          className="modal-map-image"
        />
      </div>
    </div>
  );
};

const TripPlanner = () => {
  const [showHero, setShowHero] = useState(true);
  const [routeData, setRouteData] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const {allStations, loading, error} = useStations();
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const resultsRef = useRef(null);

  const handleFormSubmit = (data = null) => {
    setRouteData(data); // Update routeData
    setShowHero(false); // Collapse hero section
  };

  const handleBackClick = () => {
    setShowHero(true); // Re-expand the hero section
    setRouteData(null); // Clear route data if needed
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
          <img src="/bart-logo.png" alt="BART Logo" className="bart-logo" />

          <div className="hero-content">
            <h1 className="page-title">Plan Your Trip</h1>
          </div>

          <div className="map-overlay">
          <div className="map-group">
            <img
              src="/bart-map.png"
              alt="BART System Map"
              className="system-map"
            />
            <button 
              className="view-map-btn" 
              onClick={() => setIsMapModalOpen(true)}
            >
              View Full Map 🗺
            </button>
          </div>

            <MapModal 
              isOpen={isMapModalOpen} 
              onClose={() => setIsMapModalOpen(false)} 
            />
            
            

            <div className="service-info">
              <div className="service-hours">
                <h3>BART Service Hours</h3>
                <p>Weekdays (5:00 am - Midnight)</p>
                <p>Saturday (6:00 am - Midnight)</p>
                <p>Sunday (8:00 am - Midnight)</p>
              </div>

              <div className="other-resources">
                <p>Other Resources</p>
                <p>
                  PDF timetables are also available as well at Caltrain and Capitol
                  Corridor transfer timetables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>

      <div className="content-section">
        <TransitionGroup>
          {showHero ? (
            <CSSTransition
              nodeRef={formRef}
              key="form"
              timeout={300}
              classNames="form"
            >
              <div ref={formRef}>
                <TripForm onSubmit={handleFormSubmit} stations={allStations}/>
              </div>
            </CSSTransition>
          ) : (
            <CSSTransition
              nodeRef={resultsRef}
              key="results"
              timeout={300}
              classNames="results"
            >
              <div ref={resultsRef}>
                  <button className="back-button" onClick={handleBackClick}>
                    ← Back to Trip Planner
                  </button>
                
                <RouteResults routeData={routeData} />
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TripPlanner;