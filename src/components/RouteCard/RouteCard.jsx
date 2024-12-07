import React, { useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './RouteCard.css';
import RouteDetails from '../RouteDetails';
import { useStations } from '../../hooks/useStations';
import { useRoutes } from '../../hooks/useRoutes';
import { useUserPreferences } from '../../hooks/useUserPreferences';
import { CSSTransition } from 'react-transition-group';

/**
 * Displays a single route option with trip details and expandable information
 * Uses React.memo for performance optimization
 */

/**
 * Renders a colored circle indicator for train lines
 * @param {Object} props - Component props
 * @param {string} props.line - Train line identifier
 * @param {Map} props.routes - Map of route information
 */
const LineIndicator = React.memo(({ line, routes }) => {
  LineIndicator.displayName = 'LineIndicator';
  
  return (
    <span 
      className='line-circle' 
      style={{backgroundColor: routes.get(line).hexcolor}}
    >
      {routes.get(line).color[0]}
    </span>
  );
});

LineIndicator.propTypes = {
  line: PropTypes.string.isRequired,
  routes: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired
};

/**
 * Main RouteCard component
 * Displays trip times, fares, and detailed route information
 * @param {Object} props - Component props
 * @param {string} props.tripTime - Total trip duration
 * @param {string} props.originTime - Departure time
 * @param {string} props.destTime - Arrival time
 * @param {Array} props.fares - Available fare options
 * @param {string} props.origin - Origin station code
 * @param {string} props.destination - Destination station code
 * @param {Array} props.legDetails - Detailed segment information for the trip
 */
const RouteCard = React.memo(({ 
  tripTime,
  originTime,
  destTime,
  fares,
  origin,
  destination,
  legDetails 
}) => {
  RouteCard.displayName = 'RouteCard';
  const { preferences } = useUserPreferences();
  const { stations } = useStations();
  const { routes } = useRoutes();
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedContentRef = useRef(null);
  
  const fare = useMemo(() => {
    return fares.find(f => f.code === preferences?.fareClass) || fares[0];
  }, [fares, preferences?.fareClass]);

  return (
    <div className="route-card">
      <div className="route-content">
        <div className="route-summary">
          <div className="route-times">
            <span className="time">{originTime}</span>
            {legDetails.map((leg, index) => ( 
              <div key={index} className="line-indicator" 
              style={{backgroundColor: routes.get(leg.line).hexcolor}} 
               >
              {leg.trainHeadStation}
            </div> ))}
            <span className="time">{destTime}</span>
          </div>

          <div className="trip-stats">
            <div className="stat lines">
              {legDetails.map((leg, index) => (
                <LineIndicator 
                  key={index}
                  line={leg.line}
                  routes={routes}
                />
              ))}
            </div>

            <div className="stat">
              <img src="total-time.png" alt="duration" />
              {tripTime} minutes
            </div>

            <div className="stat">
              <img src="total-stops.png" alt="stations" />
              {stations.get(origin).name} → {stations.get(destination).name}
            </div>

            <div className="stat">
              <img src="total-cost.png" alt="fare" />
              ${fare.price}
            </div>

            <button 
              className="more-details" 
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              More details
              <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>▼</span>
            </button>
          </div>
        </div>

        <CSSTransition
          in={isExpanded}
          timeout={300}
          classNames="details"
          unmountOnExit
        >
          <div ref={expandedContentRef}>
            <RouteDetails legDetails={legDetails} />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
});

RouteCard.propTypes = {
  tripTime: PropTypes.string.isRequired,
  originTime: PropTypes.string.isRequired,
  destTime: PropTypes.string.isRequired,
  fares: PropTypes.array.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  legDetails: PropTypes.array.isRequired
};

export default RouteCard;