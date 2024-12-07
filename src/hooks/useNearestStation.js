/**
 * Custom hook that finds the nearest BART station to user's location
 * Uses geolib for distance calculations and geolocation hook for user position
 */
import { useState, useEffect } from 'react';
import * as geolib from 'geolib';
import { useGeolocation } from './useGeolocation';
import { useStations } from '../hooks/useStations';

/**
 * @returns {Object} Hook return object
 * @property {string|null} nearestStation - Abbreviation of nearest station
 * @property {string|null} geoError - Error message if geolocation fails
 * @property {boolean} geoLoading - Loading state for geolocation
 */
export const useNearestStation = () => {
  const { location, error: geoError, loading: geoLoading } = useGeolocation();
  const { stations } = useStations();
  const [nearestStation, setNearestStation] = useState(null);

  useEffect(() => {
    /**
     * Finds the closest station to given coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @returns {string} Station abbreviation
     */
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

    // Only calculate nearest station when we have both location and station data
    if (location && stations.size > 0) {
      const closestStation = findClosestStation(location.latitude, location.longitude);
      setNearestStation(closestStation);
    }
  }, [location, stations]);

  return { nearestStation, geoError, geoLoading };
};