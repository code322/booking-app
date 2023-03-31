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
let accessToken = localStorage.getItem('accessToken');
axiosPrivate.interceptors.request.use(
  async (config) => {
    // if (!config.headers['Authorization']) {
    //   config.headers['Authorization'] = `Bearer ${accessToken}`;
    // }

    let { data } = await axios.get(`${API_URL}/api/auth/refresh`);
    let token = data?.accessToken;
    console.log(token, 'token interceptor');
    localStorage.setItem('accessToken', token);
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// axiosPrivate.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const prevRequest = error?.config;
//     console.log(error?.response.status, prevRequest.method, error);
//     if (error?.response.status === 401 && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       const newAccessToken = await refresh();
//       prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//       return axiosPrivate(prevRequest);
//     }
//     return Promise.reject(error);
//   }
// );
