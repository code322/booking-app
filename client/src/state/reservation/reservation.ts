import { RootState } from './../store';
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
        '/api/reservation/get-all-reserves'
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

type reservationType = {
  id?: number;
  details: detailsTypes;
  photos: string[];
  utils: utilsTypes;
  checkIn: string;
  checkOut: string;
  locationId?: number;
  totalCost: number;
};

interface reservationInterface {
  status: 'idle' | 'succeeded' | 'failed';
  reservations: reservationType[];
  error: any;
}
const initialState: reservationInterface = {
  status: 'idle',
  reservations: [],
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
      .addCase(getAllReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectAllReservations = (state: RootState) =>
  state.reservationReducer;
export default reservationsSlice.reducer;