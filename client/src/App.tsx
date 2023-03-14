import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LogIn from './pages/Login/LogIn';
import Register from './pages/Register/Register';
import Account from './pages/Account/Account';
import Locations from './pages/Location/Location';
import NewLocation from './pages/NewLocation/NewLocation';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
