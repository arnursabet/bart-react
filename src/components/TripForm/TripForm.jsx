import React, { useState, useEffect } from 'react';
import { bartApi } from '../../services/bartApi';
import './TripForm.css';

const TripForm = ({ onSubmit }) => {
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    time: formatCurrentTime(),
    date: formatDateForApi(new Date())
  });

  function formatCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  // Generate time options in 15-minute intervals
  function generateTimeOptions() {
    const times = [];
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
    
    for (let i = 0; i < 96; i++) { // 24 hours * 4 (15-min intervals)
      const time = new Date(now);
      time.setMinutes(time.getMinutes() + (i * 15));
      
      const timeString = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      times.push(timeString);
    }
    return times;
  }

  function formatDateForApi(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  function generateDateOptions() {
    const dates = [];
    const now = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      dates.push({
        display: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        value: formatDateForApi(date)
      });
    }
    return dates;
  }

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await bartApi.getStations();
        setStations(response.root.stations.station);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };
    fetchStations();
  }, []);

  const handleSwapStations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM data: ", formData)
    try {
      const routeData = await bartApi.getRoute(
        formData.origin.toLowerCase(),
        formData.destination.toLowerCase(),
        formData.time,
        formData.date
      );
      console.log("Route data: ", routeData)
      onSubmit(routeData);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };


  return (
    <div className="trip-form-container">
      <div className="form-group">
        <label>From</label>
        <div className="input-wrapper">
          <span className="input-icon"></span>
          <select 
            value={formData.origin}
            onChange={(e) => setFormData({...formData, origin: e.target.value})}
          >
            <option value="">Select station</option>
            {stations.map(station => (
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
        <label>To</label>
        <div className="input-wrapper">
          <span className="input-icon"></span>
          <select 
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
          >
            <option value="">Select station</option>
            {stations.map(station => (
              <option key={station.abbr} value={station.abbr}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Depart at</label>
        <div className="input-wrapper">
          <span className="input-icon">🕒</span>
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
        <label>Date</label>
        <div className="input-wrapper">
          <span className="input-icon">📅</span>
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

