import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LogIn from './pages/Login/LogIn';
import Register from './pages/Register/Register';
import Location from './pages/Location/Location';
import PrivateRoutes from './utils/PrivateRoutes';
import Locations from './pages/Listing/Listing';
import AddNewLocation from './pages/AddNewLocation/AddNewLocation';
import MyBooking from './pages/MyBooking/MyBooking';
import EditLocation from './pages/EditLocation/EditLocation';
import Layout from './components/Layout';
import FilterResult from './pages/FilterResult/FilterResult';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Home />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/location/:id' element={<Location />} />
          <Route path='/filtered-result' element={<FilterResult />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/account' element={<Locations />} />
            <Route path='/account/new-listing' element={<AddNewLocation />} />
            <Route path='/account/my-booking' element={<MyBooking />} />
            <Route
              path='/account/edit-listing-location/:id'
              element={<EditLocation />}
            />
          </Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
