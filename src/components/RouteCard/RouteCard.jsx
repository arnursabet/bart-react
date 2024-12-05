import React, { useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './RouteCard.css';
import RouteDetails from '../RouteDetails';
import { useStations } from '../../context/stationContext';
import { useRoutes } from '../../context/routesContext';
import { useUserPreferences } from '../../context/userPreferencesContext';
import { CSSTransition } from 'react-transition-group';

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
          nodeRef={expandedContentRef}
        >
          <div ref={expandedContentRef} className="expanded-details">
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
  fares: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.string.isRequired
  })).isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  legDetails: PropTypes.arrayOf(PropTypes.shape({
    line: PropTypes.string.isRequired
  })).isRequired
};

export default RouteCard;