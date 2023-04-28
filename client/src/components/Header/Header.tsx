import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import { isLoggedInSelector, logout } from '../../state/authSlicer/authSlicer';

function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  return (
    <header className='py-8 h-[5rem] border-b flex justify-center m-auto '>
      <div className='px-3  flex  justify-between h-full items-center w-full  max-w-6xl'>
        {/* logo */}
        <Link to={'/'} className='h-10 w-10 overflow-hidden rounded-full'>
          <img src='/assets/logo.png' alt='' />
        </Link>
        {/* nav */}
        <div className='flex items-center gap-4'>
          <Link
            to={'/'}
            className=' text-3xl text-custom-red  hover:cursor-pointer  hover:bg-red-200 p-2 rounded-md transition-all ease-out duration-300 outline-none flex items-center justify-center '
          >
            <Icon icon='material-symbols:home' />
          </Link>
          <Link
            to={'/account'}
            className=' text-3xl text-custom-red hover:cursor-pointer  hover:bg-red-200 p-2 rounded-md transition-all ease-out duration-300 outline-none flex items-center justify-center '
          >
            <Icon icon='mdi:user-circle' />
          </Link>
          <Link
            className='text-3xl text-custom-red  hover:cursor-pointer  hover:bg-red-200 p-2 rounded-md transition-all ease-out duration-300 outline-none flex items-center justify-center '
            to={isLoggedIn ? '/' : '/login'}
          >
            {isLoggedIn ? (
              <>
                <Icon
                  onClick={() => {
                    dispatch(logout() as any);
                  }}
                  icon='ri:logout-circle-fill'
                />
              </>
            ) : (
              <Icon icon='ri:login-circle-fill' />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
