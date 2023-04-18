import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/api';
import { filterType } from '../../pages/Home/Home';
import { locationType } from '../locations/locationsSlicer';
axios.defaults.withCredentials = true;

export const getFilteredResult = createAsyncThunk(
  'filtered/getFilteredResult',
  async (params: filterType, { rejectWithValue }) => {
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
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

let initialState: {
  locations: locationType[];
  err?: any;
} = {
  locations: [],
};

const filterSlice = createSlice({
  name: 'filteredResult',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredResult.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(getFilteredResult.rejected, (state, action) => {
        state.err = action.payload;
      });
  },
});

export default filterSlice.reducer;
