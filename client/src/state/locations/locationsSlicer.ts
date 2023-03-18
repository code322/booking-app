import { RootState } from './../store';
import { API_URL } from './../../helpers/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { newLocationType } from '../../pages/LocationForm/LocationForm';

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

export const addNewLocation = createAsyncThunk(
  'locations/addNewLocation',
  async (newLocation: newLocationType, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/location/new-location`,
        newLocation
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export type locationType = {
  id: number;
  title: string;
  address: string;
  description: string;
  utils: {
    wifi: boolean;
    TV: boolean;
    pet: boolean;
    ['free parking spot']: boolean;
    radio: boolean;
    ['private entrance']: boolean;
  };
  photos: string[];
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
      })
      .addCase(addNewLocation.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(addNewLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations.push(action.payload);
      })
      .addCase(addNewLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;

export const selectLocations = (state: RootState) =>
  state.locationsSlicer.locations;
