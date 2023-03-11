import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/userTypeSelector';
import { userSelector } from '../../state/authSlicer/authSlicer';

function Header() {
  const user = useAppSelector(userSelector);
  console.log(user.name);
  return (
    <header className='py-8 h-[3.5rem] border-b flex justify-center '>
      <div className='px-3 max-w-5xl flex  justify-between h-full items-center w-full'>
        {/* logo */}
        <Link to='/'>
          <a className='h-8 w-8' href=''>
            <Icon
              className='h-10 w-10'
              icon='material-symbols:location-on'
              color='#ff385c'
            />
          </a>
        </Link>
        {/* nav */}
        <div className='flex items-center gap-3'>
          <Link to='/listing'>
            <a className='p-3 bg-custom-red text-white rounded-md outline-none flex items-center gap-2'>
              <Icon icon='material-symbols:add' color='white' />
              <span>Add Listing</span>
            </a>
          </Link>
          <Link to={user ? '/' : '/login'}>
            {user ? (
              <>
                <Icon
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
          {<p className='capitalize'>{user?.name}</p>}
        </div>
      </div>
    </header>
  );
}

export default Header;
