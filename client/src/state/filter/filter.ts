import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/api';
import { filterType } from '../../pages/Home/Home';
import { locationType } from '../locations/locationsSlicer';

export const getFilteredResult = createAsyncThunk(
  'filtered/getFilteredResult',
  async (body: filterType, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/locations/filtered-result`,
        body
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
