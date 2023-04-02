import {} from '../../state/locations/locationByIdSlicer';

import { Link, useLocation } from 'react-router-dom';

function Account() {
  let inActiveNav = 'capitalize rounded-md p-2';
  let activeNav = 'capitalize rounded-md p-2 bg-custom-red text-white';

  let { pathname } = useLocation();

  return (
    <>
      <div className='flex sm:flex-col gap-2 min-w-[100.7333px]'>
        <Link
          className={pathname === '/account' ? activeNav : inActiveNav}
          to='/account'
        >
          My Listing
        </Link>

        <Link
          className={
            pathname === '/account/my-booking' ? activeNav : inActiveNav
          }
          to='/account/my-booking'
        >
          My Booking
        </Link>
        <Link
          className={
            pathname === '/account/new-listing' ? activeNav : inActiveNav
          }
          to='/account/new-listing'
        >
          add Listing
        </Link>
      </div>
    </>
  );
}

export default Account;
