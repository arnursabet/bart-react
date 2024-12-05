import RouteCard from '../RouteCard';
import './RouteResults.css';
import PropTypes from 'prop-types';

const RouteResults = ({ routeData }) => {
  if (!Array.isArray(routeData) || routeData.length === 0) {
    return <div className="no-routes">No routes found</div>;
  }


  return (
    <div className="route-results">
      <h2>Route Results</h2>
      <div className="results-list">
        {routeData.map((route, index) => (
          <RouteCard key={index} {...route} />
        ))}
      </div>
    </div>
  );
};
RouteResults.propTypes = {
  routeData: PropTypes.array.isRequired,
};

export default RouteResults;