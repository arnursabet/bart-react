/**
 * @component TripForm
 * @description A form component for planning BART trips that allows users to select origin/destination stations,
 * departure time and date. Supports geolocation to find nearest station.
 * 
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback function called with route data when form is submitted
 */
import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bartApi } from '../../services/bartApi';
import { formatCurrentTime, generateDateOptions, generateTimeOptions, formatDateForApi } from '../../utils/util';
import './TripForm.css';
import { useStations } from '../../hooks/useStations';
import { useNearestStation } from '../../hooks/useNearestStation';

const TripForm = ({ onSubmit }) => {
  // Get stations list and nearest station based on geolocation
  const { stations } = useStations();
  const { nearestStation, geoLoading } = useNearestStation();

  // Initialize form state with empty values and current time/date
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    time: formatCurrentTime(),
    date: formatDateForApi(new Date())
  });

  // Memoize station options to prevent unnecessary re-renders
  const stationOptions = useMemo(() => (
    Array.from(stations.values()).map((station) => (
      <option key={station.abbr} value={station.abbr}>
        {station.name}
      </option>
    ))
  ), [stations]);

  // Set nearest station as origin when geolocation completes
  useEffect(() => {
    if (nearestStation && !formData.origin) {
      setFormData(prev => ({
        ...prev,
        origin: nearestStation
      }));
    }
  }, [nearestStation, formData.origin]);

  /**
   * Validates that destination station is different from origin
   * @param {string} destination - Station abbreviation
   * @returns {boolean} Whether destination is valid
   */
  const isDestinationValid = (destination) => {
    return destination !== formData.origin;
  };

  /**
   * Updates a single form field while preserving other values
   * @param {string} field - Field name to update
   * @param {string} value - New value for the field
   */
  const updateFormField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Swaps origin and destination stations
  const handleSwapStations = () => {
    setFormData({
      ...formData,
      origin: formData.destination,
      destination: formData.origin
    });
  };

  /**
   * Handles form submission by calling BART API and passing results to parent
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const routeData = await bartApi.getRoute(
        formData.origin.toLowerCase(),
        formData.destination.toLowerCase(),
        formData.time,
        formData.date
      );
      onSubmit(routeData);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  return (
    <form className="trip-form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label><strong>From</strong></label>
        <div className="input-wrapper">
          <span className="input-icon">
            <img src="current-station.png" alt="current station" />
          </span>
          <select
            value={formData.origin}
            onChange={(e) => updateFormField('origin', e.target.value)}
            disabled={geoLoading}
          >
            <option value="">
              {geoLoading ? 'Finding nearest station...' : 'Select station'}
            </option>
            {!geoLoading && stationOptions}
          </select>
        </div>
      </div>
      <div className="stations-swap">
        <button 
          type="button" 
          className="swap-btn"
          onClick={handleSwapStations}
          disabled={!formData.origin || !formData.destination}
          aria-label="Swap origin and destination stations"
        >
          ⇄
        </button>
      </div>

      <div className="form-group">
        <label><strong>To</strong></label>
        <div className="input-wrapper">
          <span className="input-icon">
            <img src="destination-station.png" alt="destination station" />
          </span>
          <select 
            value={formData.destination}
            onChange={(e) => {
              const newDestination = e.target.value;
              if (isDestinationValid(newDestination)) {
                updateFormField('destination', newDestination);
              }
            }}
          >
            <option value="">Destination station</option>
            {stationOptions.map(option => (
              <option 
                key={option.key} 
                value={option.props.value}
                disabled={option.props.value === formData.origin}
              >
                {option.props.children}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label><strong>Depart at</strong></label>
        <div className="input-wrapper">
          <span className="input-icon">
            <img src="depart-time.png" alt="depart time" />
          </span>
          <select 
            value={formData.time}
            onChange={(e) => updateFormField('time', e.target.value)}
          >
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label><strong>Date</strong></label>
        <div className="input-wrapper">
          <span className="input-icon">
            <img src="depart-date.png" alt="depart date" />
          </span>
          <select 
            value={formData.date}
            onChange={(e) => updateFormField('date', e.target.value)}
          >
            {generateDateOptions().map((date) => (
              <option key={date.value} value={date.value}>
                {date.display}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="find-route-btn" 
        disabled={!formData.origin || !formData.destination}
      >
        →
      </button>
    </form>
  );
};

TripForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TripForm;

