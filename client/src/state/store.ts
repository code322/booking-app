import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlicer/authSlicer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import uploadPhotosSlice from './locations/upLoadPhotosSlicer';
import locationsSlicer from './locations/locationsSlicer';

const reducers = combineReducers({
  authReducer,
  uploadPhotosSlice,
  locationsSlicer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persist = persistStore(store);

export default store;
