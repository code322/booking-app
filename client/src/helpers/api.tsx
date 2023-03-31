import axios from 'axios';
import decode from 'jwt-decode';
import { refresh } from './getRefresh';
axios.defaults.withCredentials = true;
export const API_URL: string =
  process.env.NODE_ENV === 'production'
    ? process.env.React_App_SERVER_URL!
    : 'http://localhost:5000';

export default axios.create({
  baseURL: API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
});
