import { locationType } from '../locations/locationsSlicer';
import { RootState } from '../store';
import { API_URL } from '../../helpers/api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../helpers/api';

export const getUserList = createAsyncThunk(
  'locations/getUserList',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(
        `${API_URL}/api/users/user-data/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface locationInterface {
  status: 'idle' | 'succeeded' | 'failed';
  locations: locationType[];
  error: any;
}
const initialState: locationInterface = {
  status: 'idle',
  locations: [],
  error: null,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
        state.error = null;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;

export const selectUsersList = (state: RootState) =>
  state.userReducer.locations;
