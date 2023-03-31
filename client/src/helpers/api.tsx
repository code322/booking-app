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

// axiosPrivate.interceptors.request.use(
//   async (config) => {
//     console.log(config);
//     let { data } = await axios.get(`${API_URL}/api/auth/refresh`);
//     let token = data?.accessToken;
//     localStorage.setItem('accessToken', token);
//     config.headers['Authorization'] = `Bearer ${token}`;
//     return config;
//   },
//   (err) => Promise.reject(err)
// );
