import { API_CONFIG } from './config';

/**
 * Configuration for API response caching
 * @constant {number} CACHE_DURATION - Cache duration in milliseconds (5 minutes)
 */
const CACHE_DURATION = 5 * 60 * 1000;
const cache = new Map();

/**
 * Wrapper function to handle API response caching
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Function to fetch data if cache miss
 * @returns {Promise<any>} Cached or fresh data
 */
const withCache = async (key, fetchFn) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};

/**
 * BART API service object containing methods for interacting with the BART API
 */
export const bartApi = {
  /**
   * Fetches all BART stations
   * @returns {Promise<Array>} Array of station objects
   * @throws {Error} If API request fails
   */
  getStations: () => withCache('stations', async () => {
    const query = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.stations}?cmd=stns&key=${API_CONFIG.key}&json=y`;
    
    try {      
      const response = await fetch(query);
      const data = await response.json();
            
      return data.root.stations.station; // array of all possible stations
      
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  }),

  /**
   * Fetches route information between two stations
   * @param {string} origin - Origin station abbreviation
   * @param {string} destination - Destination station abbreviation
   * @param {string} time - Departure time
   * @param {string} date - Travel date
   * @returns {Promise<Array>} Array of route options
   * @throws {Error} If required parameters are missing or API request fails
   */
  getRoute: async (origin, destination, time, date) => {
    if (!origin || !destination || !time || !date) {
      throw new Error('Missing required parameters');
    }

    try {
      const params = new URLSearchParams({
        cmd: 'depart',
        orig: origin,
        dest: destination,
        time: time,
        date: date,
        key: API_CONFIG.key,
        b: '0',
        a: '4',
        json: 'y'
      });

      const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.routes}?${params}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data.root.schedule.request.trip.map((trip) => ({
        origin: trip['@origin'],
        destination: trip['@destination'],
        fares: trip.fares.fare.map((fare) => ({
          name: fare['@name'],
          price: fare['@amount'],
          code: fare['@class']
        })),
        originTime: trip['@origTimeMin'],
        destTime: trip['@destTimeMin'],
        tripTime: trip['@tripTime'],
        legDetails: trip.leg.map((leg) => ({
          order: leg['@order'],
          origin: leg['@origin'],
          destination: leg['@destination'],
          originTime: leg['@origTimeMin'],
          destTime: leg['@destTimeMin'],
          line: leg['@line'],
          trainHeadStation: leg['@trainHeadStation'],
          bikeFlag: leg['@bikeflag'],
          load: leg['@load'],
        })),
      }));

    } catch (error) {
      console.error('Error fetching route:', error);
      throw error;
    }
  },

  getRoutes: () => withCache('routes', async () => {
    try {
      const query = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allroutes}?cmd=routes&key=${API_CONFIG.key}&json=y`;
      
      
      const response = await fetch(query);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data?.root?.routes?.route) {
        throw new Error('Invalid response format from BART API');
      }
      
      return data.root.routes.route;
      
    } catch (error) {
      console.error('Error fetching BART routes:', error);
      throw error;
    }
  }),
};