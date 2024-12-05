import React from 'react';
import './RouteDetails.css';
import { useStations } from '../../context/stationContext';
import { useRoutes } from '../../context/routesContext';

const RouteDetails = ({ legDetails }) => {
  const { stations } = useStations();
  const { routes } = useRoutes();

  const getLineInitial = (line) => {
    const color = routes.get(line).color;
    console.log(routes.get(line).color);
    return color ? color.charAt(0) : '';
  };

  return (
    <div className="expanded-details">
      <table className="stops-table">
        <tbody>
          {legDetails?.map((leg, index) => (
            <React.Fragment key={`leg-${leg.origin}-${index}`}>
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
              <tr>
                <td>{leg.originTime}</td>
                <td>
                  <strong>{stations.get(leg.origin).name}</strong>
                </td>
                <td style={{display: 'flex'}}>
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