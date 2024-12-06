import { useState, useEffect } from 'react';
import { bartApi } from '../../services/bartApi';
import { formatCurrentTime, generateDateOptions, generateTimeOptions, formatDateForApi } from '../../utils/util';
import './TripForm.css';
import { useStations } from '../../context/stationContext';
import * as geolib from 'geolib';
import { useGeolocation } from '../../hooks/useGeolocation';

const TripForm = ({ onSubmit }) => {
  const { stations } = useStations();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    time: formatCurrentTime(),
    date: formatDateForApi(new Date())
  });
  const { location, error: geoError, loading: geoLoading } = useGeolocation();

  useEffect(() => {
    if (location && stations.size > 0) {
      const closestStation = findClosestStation(location.latitude, location.longitude);
      setFormData(prev => ({
        ...prev,
        origin: closestStation
      }));
    }
  }, [location, stations]);

  const findClosestStation = (lat, lon) => {
    const stationList = Array.from(stations.values());

    const closest = geolib.findNearest(
      { latitude: lat, longitude: lon },
      stationList.map((station) => ({
        latitude: station.gtfs_latitude,
        longitude: station.gtfs_longitude,
        abbr: station.abbr
      }))
    );
    return closest.abbr;
  };

  const isDestinationValid = (destination) => {
    return destination !== formData.origin;
  };

  const handleSwapStations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
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
    <div className="trip-form-container">
      <div className="form-group">
        <label><strong>From</strong></label>
        <div className="input-wrapper">
          <span className="input-icon">
            <img src="current-station.png" alt="current station" />
          </span>
          <select
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            disabled={geoLoading}
          >
            <option value="">
              {geoLoading ? 'Finding nearest station...' : 'Select station'}
            </option>
            {!geoLoading &&
              Array.from(stations.values()).map((station) => (
                <option key={station.abbr} value={station.abbr}>
                  {station.name}
                </option>
              ))}
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
                setFormData({...formData, destination: newDestination});
              }
            }}
          >
            <option value="">Destination station</option>
            {Array.from(stations.values()).map(station => (
              <option 
                key={station.abbr} 
                value={station.abbr}
                disabled={station.abbr === formData.origin}
              >
                {station.name}
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
            onChange={(e) => setFormData({...formData, time: e.target.value})}
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
            onChange={(e) => setFormData({...formData, date: e.target.value})}
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
        onClick={handleSubmit}
        disabled={!formData.origin || !formData.destination}
      >
        →
      </button>
    </div>
  );
};

export default TripForm;

