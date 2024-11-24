import React, { useState } from 'react';
import RouteCard from '../RouteCard';
import TripForm from '../TripForm';
import './RouteResults.css';

const RouteResults = () => {
  const [routes, setRoutes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleRouteSubmit = (data) => {
    if (data?.root?.schedule?.request?.trip) {
      const transformedRoutes = data.root.schedule.request.trip.map(trip => ({
        line: trip.leg[0]['@line'],
        duration: `${trip['@tripTime']} minutes`,
        departureTime: trip['@origTimeMin'],
        arrivalTime: trip['@destTimeMin'],
        fare: parseFloat(trip['@fare']),
        origin: trip['@origin'],
        destination: trip['@destination'],
        trainHeadStation: trip.leg[0]['@trainHeadStation'],
        legDetails: trip.leg.map(leg => ({
          time: leg['@origTimeMin'],
          stationName: leg['@origin'],
          onTime: true,
          line: leg['@line']
        }))
      }));
      setRoutes(transformedRoutes);
      setShowResults(true);
    }
  };

  return (
    <div className="route-results">
      <TripForm onSubmit={handleRouteSubmit} />
      {showResults && (
        <div className="results-list">
          {routes.map((route, index) => (
            <RouteCard key={index} {...route} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteResults;