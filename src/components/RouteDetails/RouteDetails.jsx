/**
 * Displays detailed information about a specific route
 * Shows transfers, stops, and timing for each leg of the journey
 */
import React from 'react';
import './RouteDetails.css';
import { useStations } from '../../hooks/useStations'
import { useRoutes } from '../../hooks/useRoutes';

/**
 * @param {Object} props - Component props
 * @param {Array} props.legDetails - Array of route segments with detailed information
 */
const RouteDetails = ({ legDetails }) => {
  const { stations } = useStations();
  const { routes } = useRoutes();

  /**
   * Formats the train load level for display
   * @param {string} load - Load level indicator from API
   * @returns {string} Human-readable load description
   */
  const formatLoad = (load) => {
    const loadLevels = {
      1: 'Light',
      2: 'Normal',
      3: 'Heavy'
    };
    return loadLevels[load] || 'Unknown';
  };

  return (
    <div className="route-details">
      <table className="stops-table">
        <thead>
          <tr>
            <th>Station</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {legDetails.map((leg, index) => (
            <>
              {/* Station row */}
              <tr key={`${leg.origin}-${index}`}>
                <td>
                  <div className="station-info">
                    <div 
                      className="line-circle"
                      style={{backgroundColor: routes.get(leg.line).hexcolor}}
                    >
                      {routes.get(leg.line).color[0]}
                    </div>
                    {stations.get(leg.origin).name}
                  </div>
                </td>
                <td>{leg.originTime}</td>
                <td>
                  <span className="status-indicator on-time">
                    On Time
                  </span>
                </td>
              </tr>
              
              {/* Transfer information if needed */}
              {index < legDetails.length - 1 && (
                <tr className="transfer-row">
                  <td colSpan="3">
                    <div className="transfer-info">
                      <span className="transfer-icon">↓</span>
                      Transfer to {routes.get(legDetails[index + 1].line).name}
                      <span className="transfer-time">3 min</span>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteDetails;