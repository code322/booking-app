import axios from 'axios';
import { API_URL } from './api';

export const refresh = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/refresh`);
    return response?.data?.accessToken;
  } catch (error) {
    return error;
  }
};
