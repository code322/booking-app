import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import { logout, userSelector } from '../../state/authSlicer/authSlicer';
import { IsLoggedLocalStorage } from '../../utils/auth';
import { Container } from '@mui/material';
import { useState } from 'react';

function Header() {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const isLoggedIn: boolean | null = IsLoggedLocalStorage.getIsLoggedIn();
  const [isAuth, setIsAuth] = useState<boolean | null>(
    IsLoggedLocalStorage.getIsLoggedIn()
  );
  console.log(isAuth, 'header');
  return (
    <header className='py-8 h-[3.5rem] border-b flex justify-center m-auto '>
      <div className='px-3  flex  justify-between h-full items-center w-full  max-w-6xl'>
        {/* logo */}
        <Link to={'/'} className='h-8 w-8 text-custom-red overflow-hidden'>
          <Icon className='h-8 w-8' icon='logos:airbnb-icon' />
        </Link>
        {/* nav */}
        <div className='flex items-center gap-3'>
          <Link
            to={'/account'}
            className='py-2 px-3 bg-custom-red text-white rounded-md outline-none flex items-center gap-2'
          >
            <span>My Account</span>
          </Link>
          <Link to={isLoggedIn ? '/' : '/login'}>
            {isLoggedIn ? (
              <>
                <Icon
                  onClick={() => {
                    IsLoggedLocalStorage.setIsLoggedInFalse();
                    dispatch(logout() as any);
                  }}
                  className='text-gray-700'
                  height={30}
                  icon='la:sign-out-alt'
                />
              </>
            ) : (
              <Icon
                className='text-gray-400'
                height={30}
                icon='mdi:user-circle'
              />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
