import {
  detailsTypes,
  initialDetails,
  utilsTypes,
  initialUtils,
} from './../../helpers/types';
import { axiosPrivate } from './../../helpers/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllReservations = createAsyncThunk(
  'reservations/getAllReservations',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(
        '/api/reservations/get-all-reservations'
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface reservationTypes {
  status: 'idle' | 'succeeded' | 'failed';
  reservations: {
    id?: number;
    details: detailsTypes;
    photos: string[];
    utils: utilsTypes;
    checkIn: string;
    checkOut: string;
    locationId?: number;
    totalCost: number;
  };
  error: any;
}
const initialState: reservationTypes = {
  status: 'idle',
  reservations: {
    details: initialDetails,
    photos: [],
    utils: initialUtils,
    checkIn: '',
    checkOut: '',
    totalCost: 0,
  },
  error: null,
};
const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllReservations.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
        state.error = null;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default reservationsSlice.reducer;
