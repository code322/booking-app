import { locationType } from './locationsSlicer';
import { RootState } from '../store';
import { API_URL } from '../../helpers/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLocationById = createAsyncThunk(
  'locationById/getLocationById',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/location/get-location-by-id/:${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface locationByIdInterface {
  status: 'idle' | 'succeeded' | 'failed';
  location: locationType | null;
  error: any;
}

let initialState: locationByIdInterface = {
  status: 'idle',
  location: null,
  error: null,
};
const getLocationByIdSlice = createSlice({
  name: 'locationById',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLocationById.pending, (state) => {
        state = initialState;
      })
      .addCase(getLocationById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.location = action.payload;
        state.error = null;
      })
      .addCase(getLocationById.rejected, (state, action) => {
        state.status = 'failed';
        state.location = null;
        state.error = action.payload;
      });
  },
});

export default getLocationByIdSlice.reducer;
export const selectLocationById = (state: RootState) =>
  state.locationByIdSlicer.location;
