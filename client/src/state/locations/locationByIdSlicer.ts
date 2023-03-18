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
        `${API_URL}/api/location/get-location-by-id/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface locationByIdInterface {
  status: 'idle' | 'succeeded' | 'failed';

  location: locationType;
  error: any;
}

export const locationInitialState = {
  id: 0,
  details: {
    title: '',
    address: '',
    description: '',
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
  },
  photos: [],
  utils: {
    wifi: false,
    netflex: false,
    hydro: false,
    parking: false,
    water: false,
    gym: false,
  },
};

let initialState: locationByIdInterface = {
  status: 'idle',
  location: locationInitialState,
  error: null,
};
const getLocationByIdSlice = createSlice({
  name: 'locationById',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLocationById.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(getLocationById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.location = action.payload;
        state.error = null;
      })
      .addCase(getLocationById.rejected, (state, action) => {
        state.status = 'failed';
        state.location = initialState.location;
        state.error = action.payload;
      });
  },
});

export default getLocationByIdSlice.reducer;
export const selectLocationById = (state: RootState) =>
  state.locationByIdSlicer.location;
export const selectLocationByIdStatus = (state: RootState) =>
  state.locationByIdSlicer.status;
