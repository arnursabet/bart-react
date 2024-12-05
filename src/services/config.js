const API_KEY = 'MW9S-E7SL-26DU-VV8V';
const BASE_URL = 'https://api.bart.gov/api';

export const API_CONFIG = {
  key: API_KEY,
  baseUrl: BASE_URL,
  endpoints: {
    stations: '/stn.aspx',
    allroutes: '/route.aspx',
    routes: '/sched.aspx',
    fare: '/sched.aspx',
    schedules: '/sched.aspx'
  }
}; 