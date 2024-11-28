import React, { useState } from 'react';
import TripForm from '../TripForm';
import RouteResults from '../RouteResults';
import './TripPlanner.css';

const TripPlanner = () => {
  const [showHero, setShowHero] = useState(true); // State to control the visibility of the hero section
  const [routeData, setRouteData] = useState(null); // State to store route data
  const [isMapExpanded, setIsMapExpanded] = useState(false); // State to control map expansion

  const handleFormSubmit = (data) => {
    setRouteData(data); // Update routeData
    setShowHero(false); // Collapse hero section
  };

  const handleBackClick = () => {
    setShowHero(true); // Re-expand the hero section
    setRouteData(null); // Clear route data if needed
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded); // Toggle map expansion state
  };

  return (
    <div className="trip-planner">
      {/* Hero Section */}
      <div className={`hero-section ${!showHero ? 'hidden' : ''}`}>
        <img src="/bart-logo.png" alt="BART Logo" className="bart-logo" />

        <div className="hero-content">
          <h1 className="page-title">Plan Your Trip</h1>
        </div>

        <div className="map-overlay">
          <div className={`map-group ${isMapExpanded ? 'expanded' : ''}`}>
            <img
              src="/bart-map.png"
              alt="BART System Map"
              className={`system-map ${isMapExpanded ? 'expanded' : ''}`}
            />
            <button className="expand-map-btn" onClick={toggleMapExpansion}>
              {isMapExpanded ? 'Collapse Map ↘' : 'Expand Map ↖'}
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
              <p>
                PDF timetables are also available as well at Caltrain and Capitol
                Corridor transfer timetables.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {showHero ? (
          <TripForm onSubmit={handleFormSubmit} />
        ) : (
          <div>
            <button className="back-button" onClick={handleBackClick}>
              ← Back to Trip Planner
            </button>
            <RouteResults routeData={routeData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;



// import React from 'react';
// import RouteResults from '../RouteResults';
// import './TripPlanner.css';

// const TripPlanner = () => {
//   return (
//     <div className="trip-planner">
//       <div className="hero-section">
//         <div className="hero-content">
//           <h1 className="page-title">Plan Your Trip</h1>
//         </div>
        
//         <div className="map-overlay">
//           <div className="map-group">
//             <img src="/bart-map.png" alt="BART System Map" className="system-map" />
//             <button className="expand-map-btn">
//               Expand Map <span className="expand-icon">↖</span>
//             </button>
//           </div>

//           <div className="service-info">
//             <div className="service-hours">
//               <h3>BART Service Hours</h3>
//               <p>Weekdays (5:00 am - Midnight)</p>
//               <p>Saturday (6:00 am - Midnight)</p>
//               <p>Sunday (8:00 am - Midnight)</p>
//             </div>
            
//             <div className="other-resources">
//               <p>Other Resources</p>
//               <p>PDF timetables are also available as well at Caltrain and Capitol Corridor transfer timetables.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="content-section">
//         <RouteResults />
//       </div>
//     </div>
//   );
// };

// export default TripPlanner;