import React, { useState } from 'react';
import './RouteCard.css';

const RouteCard = ({ 
  line,
  duration,
  departureTime,
  arrivalTime,
  fare,
  origin,
  destination,
  trainHeadStation,
  legDetails 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="route-card">
      <div className="route-content">
        <div className="route-summary">
          <div className="time">{departureTime}</div>
          
          <div className="route-line">
            <div className="line-info">
              <div className={`line-indicator ${line.toLowerCase().replace(' ', '-')}`}>
                <span>{line.split(' ')[1]}</span>
              </div>
              <span className="line-name">To {trainHeadStation}</span>
            </div>
            <div className="trip-stats">
              <div className="stat">
                <img src="/icons/clock.svg" alt="duration" />
                {duration}
              </div>
              <div className="stat">
                <img src="/icons/stops.svg" alt="stations" />
                {origin} → {destination}
              </div>
              <div className="stat">
                <img src="/icons/fare.svg" alt="fare" />
                ${fare.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="time">{arrivalTime}</div>
        </div>

        <button 
          className="more-details" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          More details
          <span className="chevron">{isExpanded ? '▼' : '▲'}</span>
        </button>

        {isExpanded && (
          <div className="expanded-details">
          <table className="stops-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Station</th>
                <th>Status</th>
                <th>Line</th>
              </tr>
            </thead>
            <tbody>
              {legDetails.map((stop, index) => (
                <tr key={index}>
                  <td>{stop.time}</td>
                  <td>{stop.stationName}</td>
                  <td>
                    <span className={`status-indicator ${stop.onTime ? 'on-time' : 'delayed'}`}>
                      {stop.onTime ? 'On Time' : 'Delayed'}
                    </span>
                  </td>
                  <td>
                    <div className={`line-indicator ${line.toLowerCase().replace(' ', '-')}`}>
                      {line.split(' ')[1]}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default RouteCard;