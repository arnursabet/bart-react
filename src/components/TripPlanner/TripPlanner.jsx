import React from 'react';
import RouteResults from '../RouteResults';
import './TripPlanner.css';

const TripPlanner = () => {
  return (
    <div className="trip-planner">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="page-title">Plan Your Trip</h1>
        </div>
        
        <div className="map-overlay">
          <div className="map-group">
            <img src="/bart-map.png" alt="BART System Map" className="system-map" />
            <button className="expand-map-btn">
              Expand Map <span className="expand-icon">↖</span>
            </button>
          </div>

          <div className="service-info">
            <div className="service-hours">
              <h3>BART Service Hours</h3>
              <p>Weekdays (5:00 am - Midnight)</p>
              <p>Saturday (6:00 am - Midnight)</p>
              <p>Sunday (8:00 am - Midnight)</p>
            </div>
            
            <div className="other-resources">
              <p>Other Resources</p>
              <p>PDF timetables are also available as well at Caltrain and Capitol Corridor transfer timetables.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <RouteResults />
      </div>
    </div>
  );
};

export default TripPlanner;