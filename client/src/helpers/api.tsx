import axios from 'axios';
import decode from 'jwt-decode';
axios.defaults.withCredentials = true;
export const API_URL: string =
  process.env.React_App_SERVER_URL! || 'http://localhost:5000';

export default axios.create({
  baseURL: API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let accessToken: string = localStorage.getItem('accessToken')!;
type decodeType = { exp: number; id: string; iat: number };

axiosPrivate.interceptors.response.use(
  async (config) => {
    if (!accessToken) {
      // accessToken =
      //   localStorage.getItem('accessToken')! ||
      //   JSON.parse(localStorage.getItem('accessToken')!);
      // config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    const decodedToken: decodeType = decode(accessToken);
    const isExpired: boolean = decodedToken?.exp * 1000 < new Date().getDate();
    if (!isExpired) return config;

    const { data: token } = await axios.get(`${API_URL}/api/auth/refresh`);
    localStorage.setItem('accessToken', token);

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    Promise.reject(error.message);
  }
);
