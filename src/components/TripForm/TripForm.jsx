import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bartApi } from '../../services/bartApi';
import { formatCurrentTime, generateDateOptions, generateTimeOptions, formatDateForApi } from '../../utils/util';
import './TripForm.css';
import { useStations } from '../../hooks/useStations';
import { useNearestStation } from '../../hooks/useNearestStation';
import { useForm } from '../../hooks/useForm';

const TripForm = ({ onSubmit }) => {
  const { stations } = useStations();
  const { nearestStation, geoLoading } = useNearestStation();
  const [formData, setFormData] = useForm({
    origin: '',
    destination: '',
    time: formatCurrentTime(),
    date: formatDateForApi(new Date())
  });

  const stationOptions = useMemo(() => (
    Array.from(stations.values()).map((station) => (
      <option key={station.abbr} value={station.abbr}>
        {station.name}
      </option>
    ))
  ), [stations]);

  useEffect(() => {
    if (nearestStation && formData.origin !== nearestStation) {
      setFormData('origin', nearestStation);
    }
  }, [nearestStation, formData.origin, setFormData]);

  const isDestinationValid = (destination) => {
    return destination !== formData.origin;
  };

  const handleSwapStations = () => {
    setFormData({
      origin: formData.destination,
      destination: formData.origin
    });
  };

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
            onChange={(e) => setFormData('origin', e.target.value)}
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
                setFormData('destination', newDestination);
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
            onChange={(e) => setFormData('time', e.target.value)}
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
            onChange={(e) => setFormData('date', e.target.value)}
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

