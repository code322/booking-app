import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/api';
import axios from 'axios';

export const register = createAsyncThunk(
  'auth/register',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/auth/register`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  'auth/login',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/auth/login`);
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

export default authSlice.reducer;