import axios from 'axios';
axios.defaults.withCredentials = true;
export const API_URL: string =
  process.env.React_App_SERVER_URL! || 'http://localhost:5000';
