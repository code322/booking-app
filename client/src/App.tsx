import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LogIn from './pages/Login/LogIn';
import Register from './pages/Register/Register';
import Account from './pages/Account/Account';
import Location from './pages/Location/Location';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/location/:id' element={<Location />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/account' element={<Account />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
