import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LogIn from './pages/Login/LogIn';
import Register from './pages/Register/Register';
import Account from './pages/Account/Account';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account/:subpages?' element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
