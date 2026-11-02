// API Configuration for Development and Production Environments
// In local development, defaults to http://localhost:5000 unless overridden by VITE_API_BASE_URL.
// In production (e.g. vgsfinance.com), relative URL '' is used to seamlessly proxy via reverse proxy/Nginx.

export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL !== undefined 
    ? import.meta.env.VITE_API_BASE_URL 
    : (import.meta.env.DEV ? 'http://localhost:5000' : '');

export default API_BASE_URL;

