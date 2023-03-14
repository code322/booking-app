import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LogIn from './pages/Login/LogIn';
import Register from './pages/Register/Register';
import Account from './pages/Account/Account';
import Location from './pages/Location/Location';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account/:subpages?' element={<Account />} />
        <Route path='/account/places/:subpages?' element={<Account />} />
        {/* <Route path='/account/places/:subpages?' element={<Account />} />? */}
      </Routes>
    </>
  );
}

export default App;

function NewLocation() {
  return <div>new location</div>;
}
