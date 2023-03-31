import { IsLoggedLocalStorage } from './../../utils/auth';
import { RootState } from './../store';
import { inputTypes } from './../../pages/Register/Register';
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/api';
import axios from 'axios';
import { loginTypes } from '../../pages/Login/LogIn';

export const register = createAsyncThunk(
  'auth/register',
  async (body: inputTypes, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, body);
      localStorage.setItem('accessToken', data.accessToken);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  'auth/login',
  async (body: loginTypes, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, body);
      console.log(data.accessToken);
      localStorage.setItem('accessToken', data?.accessToken);

      IsLoggedLocalStorage.setIsLoggedInTrue();
      return data;
    } catch (error: any) {
      IsLoggedLocalStorage.setIsLoggedInFalse();
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
      localStorage.removeItem('accessToken');
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface authInterface {
  status: 'idle' | 'succeeded' | 'failed' | 'loggedOut';
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
  error?: any;
}

const initialState: authInterface = {
  status: 'idle',
  accessToken: '',
  user: {
    email: '',
    name: '',
  },
  error: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.status = 'loggedOut';
        state.accessToken = '';
        state.user = {
          email: '',
          name: '',
        };
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.status = 'idle';
      })
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, action) => {
          state.status = 'succeeded';
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.user;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(register.rejected, login.rejected),
        (state, action) => {
          state.status = 'failed';
          state.user = {
            email: '',
            name: '',
          };
          state.error = action.payload;
        }
      );
  },
});

export const userSelector = (state: RootState) => state.authReducer.user;
export const authStatusSelector = (state: RootState) =>
  state.authReducer.status;
export default authSlice.reducer;
