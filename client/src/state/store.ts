import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import locationsSlicer from './locations/locationsSlicer';
import locationByIdSlicer from './locations/locationByIdSlicer';
import reservationReducer from './reservation/reservation';
import userReducer from './userListSlice/userListSlice';

const reducers = combineReducers({
  authReducer,
  locationsSlicer,
  locationByIdSlicer,
  reservationReducer,
  userReducer,
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
