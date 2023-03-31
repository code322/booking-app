// import { axiosPrivate } from './../../helpers/api';
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

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface authInterface {
  status: 'idle' | 'succeeded' | 'failed' | 'loggedOut';
  isLoggedIn: boolean;
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
  error?: any;
}

const initialState: authInterface = {
  status: 'idle',
  isLoggedIn: false,
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
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.status = 'loggedOut';
        state.isLoggedIn = false;
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
          state.isLoggedIn = true;
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.user;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(register.rejected, login.rejected),
        (state, action) => {
          state.status = 'failed';
          state.isLoggedIn = false;
          state.accessToken = '';
          state.user = {
            email: '',
            name: '',
          };
          state.error = action.payload;
        }
      );
  },
});

//selectors
export const userSelector = (state: RootState) => state.authReducer.user;
export const isLoggedInSelector = (state: RootState) =>
  state.authReducer.isLoggedIn;

export const accessTokenSelector = (state: RootState) =>
  state?.authReducer?.accessToken;
export const authStatusSelector = (state: RootState) =>
  state.authReducer.status;

//reducer
export default authSlice.reducer;

//actions
export const { setAccessToken } = authSlice.actions;
