import { detailsTypes, utilsTypes } from './../../helpers/types';
import { RootState } from './../store';
import { API_URL } from './../../helpers/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { newLocationType } from '../../pages/LocationForm/LocationForm';
import { axiosPrivate } from './../../helpers/api';

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
export const updateLocation = createAsyncThunk(
  'locations/updateLocation',
  async (location: locationType, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.patch(
        `/api/location/update-location/${location.id}`,
        location
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  'locations/deleteLocation',
  async (id: number | undefined, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/location/delete-location/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export type locationType = {
  id: number | undefined;
  details: detailsTypes;
  utils: utilsTypes;
  photos: string[];
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
      //add new location
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
      })

      //update location
      .addCase(updateLocation.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        let updatedLocation = action.payload;
        state.status = 'succeeded';
        state.locations = state.locations.map((location) =>
          location.id === action.payload.id ? action.payload : location
        );
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //delete location
      .addCase(deleteLocation.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let data = state.locations.filter(
          (items) => items.id !== action.payload
        );
        state.locations = data;
        state.error = null;
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;

export const selectLocations = (state: RootState) =>
  state.locationsSlicer.locations;
