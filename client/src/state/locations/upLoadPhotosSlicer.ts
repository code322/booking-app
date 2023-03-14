import { RootState } from './../store';
import { API_URL } from './../../helpers/api';
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadSelectedPhoto = createAsyncThunk(
  'upload/uploadSelected',
  async (photos: any, { rejectWithValue }) => {
    const newData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      newData.append('photos', photos[i]);
    }
    try {
      const { data } = await axios.post(
        `${API_URL}/api/upload/upload-from-local`,
        newData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const uploadByLinkPhoto = createAsyncThunk(
  'upload/uploadByLink',
  async (photoLink: string, { rejectWithValue }) => {
    try {
      let { data } = await axios.post(
        `${API_URL}/api/upload/upload-by-link`,
        {
          link: photoLink,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface uploadPhotoInterface {
  status: 'idle' | 'succeeded' | 'failed';
  photos: string[];
  error?: any;
}
const initialState: uploadPhotoInterface = {
  status: 'idle',
  photos: [],
  error: null,
};

const uploadPhotosSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(uploadSelectedPhoto.pending, uploadByLinkPhoto.pending),
        (state) => {
          state.status = 'idle';
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(uploadSelectedPhoto.fulfilled, uploadByLinkPhoto.fulfilled),
        (state, action) => {
          state.status = 'succeeded';
          state.photos = [...state.photos, action.payload];
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(uploadSelectedPhoto.rejected, uploadByLinkPhoto.rejected),
        (state, action) => {
          state.status = 'failed';
          state.photos = [];
          state.error = action.payload;
        }
      );
  },
});

export default uploadPhotosSlice.reducer;

export const selectUploadedPhotos = (state: RootState) =>
  state.uploadPhotosSlice.photos;
