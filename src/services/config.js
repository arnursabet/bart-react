const requiredEnvVars = [
  'VITE_BART_API_KEY',
  'VITE_BART_API_URL'
];

requiredEnvVars.forEach(envVar => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export const API_CONFIG = {
  key: import.meta.env.VITE_BART_API_KEY,
  baseUrl: import.meta.env.VITE_BART_API_URL,
  endpoints: {
    stations: '/stn.aspx',
    allroutes: '/route.aspx',
    routes: '/sched.aspx',
  }
}; 