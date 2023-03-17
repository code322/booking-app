import { RootState } from './../store';
import { API_URL } from './../../helpers/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadSelectedPhoto = createAsyncThunk(
  'upload/uploadSelected',
  async (photos: string[], { rejectWithValue }) => {
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
      .addCase(uploadSelectedPhoto.pending, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(uploadSelectedPhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach((item: string) => {
          state.photos.push(item);
        });
        state.error = null;
      })
      .addCase(uploadSelectedPhoto.rejected, (state, action) => {
        state.status = 'failed';
        state.photos = [];
        state.error = action.payload;
      })
      .addCase(uploadByLinkPhoto.pending, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(uploadByLinkPhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photos.push(action.payload);
        state.error = null;
      })
      .addCase(uploadByLinkPhoto.rejected, (state, action) => {
        state.status = 'failed';
        state.photos = [];
        state.error = action.payload;
      });
  },
});

export default uploadPhotosSlice.reducer;

export const selectUploadedPhotos = (state: RootState) =>
  state.uploadPhotosSlice.photos;
