import { locationType } from '../locations/locationsSlicer';
import { RootState } from '../store';
import { API_URL } from '../../helpers/api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../helpers/api';
import { idsType, newLocationType } from './userListTypes';
import { id } from 'date-fns/locale';

export const getUserList = createAsyncThunk(
  'locations/getUserList',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(
        `${API_URL}/api/users/user-data/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addNewList = createAsyncThunk(
  'locations/addNewList',
  async (newLocation: newLocationType, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(
        `${API_URL}/api/users/user-data/${newLocation.userId}`,
        newLocation
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserList = createAsyncThunk(
  'locations/updateUserList',
  async (location: locationType, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.patch(
        `/api/users/user-data/${location.userId}`,
        location
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserList = createAsyncThunk(
  'locations/deleteUserList',
  async (ids: idsType, { rejectWithValue }) => {
    try {
      await axiosPrivate.delete(
        `${API_URL}/api/users/user-data/${ids.id}/${ids.listId}`
      );
      return ids.listId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // get all the list
      .addCase(getUserList.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
        state.error = null;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //add a new list
      .addCase(addNewList.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(addNewList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations.push(action.payload);
      })
      .addCase(addNewList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //update a list
      .addCase(updateUserList.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(updateUserList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = state.locations.map((location) =>
          location.id === action.payload.id ? action.payload : location
        );
      })
      .addCase(updateUserList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // delete a list
      .addCase(deleteUserList.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(deleteUserList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let data = state.locations.filter(
          (items) => items.id !== action.payload
        );
        state.locations = data;
        state.error = null;
      })
      .addCase(deleteUserList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;

export const selectUsersList = (state: RootState) =>
  state.userReducer.locations;
