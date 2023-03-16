import { RootState } from './../store';
import { API_URL } from './../../helpers/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllLocations = createAsyncThunk(
  'locations/getAllLocations',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/location/get-all-locations`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type locationType = {
  id: number;
  title: string;
  address: string;
  photos: string[];
  description: string;
  perks: {
    wifi: boolean;
    TV: boolean;
    pet: boolean;
    ['free parking spot']: boolean;
    radio: boolean;
    ['private entrance']: boolean;
  };
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  guests: string;
};
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

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllLocations.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(getAllLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
        state.error = null;
      })
      .addCase(getAllLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.locations = [];
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;

export const selectLocations = (state: RootState) => state.locationsSlicer;
