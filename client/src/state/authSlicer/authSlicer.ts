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
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface authInterface {
  status: 'idle' | 'succeeded' | 'failed';
  user: {
    email: string;
    name: string;
  };
  error?: any;
}

const initialState: authInterface = {
  status: 'idle',
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
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.status = 'idle';
      })
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
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
export default authSlice.reducer;
