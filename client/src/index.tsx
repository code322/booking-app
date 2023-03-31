import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store, { persist } from './state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { API_URL, axiosPrivate } from './helpers/api';
import axios from 'axios';
import { logout } from './state/authSlicer/authSlicer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persist}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
const { getState, dispatch } = store;
let accessToken: string = getState().authReducer.accessToken;
axiosPrivate.interceptors.request.use(
  async (config) => {
    // console.log(config);
    let { data } = await axios.get(`${API_URL}/api/auth/refresh`);
    let token = data?.accessToken;
    localStorage.setItem('accessToken', token);
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      dispatch(logout() as any);
    }
    return Promise.reject(error);
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
