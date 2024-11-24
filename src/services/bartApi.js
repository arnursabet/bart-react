import { API_CONFIG } from './config';

// const formatResponse = async (response) => {
//   const text = await response.text();
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(text, 'text/xml');
//   return xmlDoc;
// };

export const bartApi = {
  async getStations() {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.stations}?cmd=stns&key=${API_CONFIG.key}&json=y`
    );

    return response.json();
  },

  async getRoute(origin, destination, time, date) {

    console.log(origin, destination, time, date)

    console.log(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.routes}?cmd=depart&orig=${origin}&dest=${destination}&time=${time}&date=${date}&key=${API_CONFIG.key}&b=0&a=4&json=y`)
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.routes}?cmd=depart&orig=${origin}&dest=${destination}&time=${time}&date=${date}&key=${API_CONFIG.key}&b=0&a=4&json=y`
    );
    return response.json();
  },

  async getFare(origin, destination) {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.fare}?cmd=fare&orig=${origin}&dest=${destination}&key=${API_CONFIG.key}&json=y`
    );
    return response.json();
  }
}; 