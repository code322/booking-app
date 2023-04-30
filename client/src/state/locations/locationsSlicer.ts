import { detailsTypes, utilsTypes } from './../../helpers/types';
import { RootState } from './../store';
import { API_URL } from './../../helpers/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { axiosPrivate } from './../../helpers/api';
import { filterType } from '../../pages/FilterForm/FilterForm';
import { newLocationType } from '../userListSlice/userListTypes';

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

export const getFilteredResult = createAsyncThunk(
  'filtered/getFilteredResult',
  async (params: filterType, { rejectWithValue, fulfillWithValue }) => {
    const request = {
      params: {
        query: params.query,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        maxBeds: params.maxBeds,
      },
    };
    try {
      const { data } = await axios.get(
        `${API_URL}/api/location/filtered-result`,
        request
      );
      return fulfillWithValue(data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export type locationType = {
  id: number;
  userId: number;
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

      .addCase(getFilteredResult.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(getFilteredResult.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;

export const selectLocations = (state: RootState) =>
  state.locationsSlicer.locations;

export const selectLocationsStatus = (state: RootState) =>
  state.locationByIdSlicer.status;
