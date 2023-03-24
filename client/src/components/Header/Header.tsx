import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import { logout, userSelector } from '../../state/authSlicer/authSlicer';
import { IsLoggedLocalStorage } from '../../utils/auth';
import { Container } from '@mui/material';

function Header() {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  console.log(user.name);
  return (
    <header className='py-8 h-[3.5rem] border-b flex justify-center '>
      <Container>
        <div className='px-3  flex  justify-between h-full items-center w-full'>
          {/* logo */}
          <Link to={'/'} className='h-8 w-8 text-custom-red'>
            <Icon className='h-10 w-10' icon='logos:airbnb-icon' />
          </Link>
          {/* nav */}
          <div className='flex items-center gap-3'>
            <Link
              to={'/account'}
              className='p-3 bg-custom-red text-white rounded-md outline-none flex items-center gap-2'
            >
              <span>My Listing</span>
            </Link>
            <Link to={user.name ? '/' : '/login'}>
              {user.name ? (
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
      </Container>
    </header>
  );
}

export default Header;
