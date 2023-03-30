import axios from 'axios';
import { API_URL } from './../helpers/api';

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/refresh`);
      return response?.data?.accessToken;
    } catch (error) {
      return error;
    }
  };
  return refresh;
};

export default useRefreshToken;
