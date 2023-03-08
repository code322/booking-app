import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='py-8 h-[3.5rem] border-b flex justify-center '>
      <div className='px-3 max-w-5xl flex  justify-between h-full items-center w-full'>
        {/* logo */}
        <a className='h-8 w-8' href=''>
          <Icon
            className='h-10 w-10'
            icon='material-symbols:location-on'
            color='#ff385c'
          />
        </a>
        {/* nav */}
        <div className='flex items-center gap-3'>
          <Link to='/listing'>
            <a className='p-3 bg-custom-red text-white rounded-md outline-none flex items-center gap-2'>
              <Icon icon='material-symbols:add' color='white' />
              <span>Add Listing</span>
            </a>
          </Link>
          <Link to={'/login'}>
            <a>
              <Icon
                className='text-gray-700'
                height={30}
                icon='mdi:user-circle'
              />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
