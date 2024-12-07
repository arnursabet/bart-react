/**
 * @component RouteDetails
 * @description Displays detailed information about each leg of a BART trip route,
 * including departure times, stations, train lines, and transfer points.
 * 
 * @param {Object} props
 * @param {Array} props.legDetails - Array of route leg objects containing origin, destination, 
 * line, and timing information for each segment of the journey
 */
import React from 'react';
import './RouteDetails.css';
import { useStations } from '../../hooks/useStations'
import { useRoutes } from '../../hooks/useRoutes';

const RouteDetails = ({ legDetails }) => {
  // Get stations and routes data from custom hooks
  const { stations } = useStations();
  const { routes } = useRoutes();

  /**
   * Extracts the first letter of the train line's color
   * @param {string} line - The BART line identifier
   * @returns {string} First letter of the line color or empty string
   */
  const getLineInitial = (line) => {
    const color = routes.get(line).color;
    return color ? color.charAt(0) : '';
  };

  return (
    <div className="expanded-details">
      <table className="stops-table">
        <tbody>
          {/* Map through each leg of the journey */}
          {legDetails?.map((leg, index) => (
            <React.Fragment key={`leg-${leg.origin}-${index}`}>
              {/* Show transfer information between legs except for first leg */}
              {index > 0 && (
                <tr className="transfer-row">
                  <td colSpan="6">
                    <div className="transfer-info">
                      <span className="transfer-icon">🔄</span>
                      Transfer at {stations.get(leg.origin).name}
                    </div>
                  </td>
                </tr>
              )}
              {/* Display leg details including timing, stations, and line info */}
              <tr>
                <td>{leg.originTime}</td>
                <td>
                  <strong>{stations.get(leg.origin).name}</strong>
                </td>
                <td style={{display: 'flex'}}>
                  {/* Display colored circle with line initial */}
                  <span 
                    className='line-circle' 
                    style={{backgroundColor: routes.get(leg.line).hexcolor}}
                  >
                    {getLineInitial(leg.line)}
                  </span>
                  <span>
                    {routes.get(leg.line).color.toLowerCase()} line    
                  </span>
                </td>
                <td>{routes.get(leg.line).direction}</td>
                <td>{leg.trainHeadStation}</td>
                <td>{leg.line}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteDetails;