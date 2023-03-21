import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import Locations from '../Locations/Locations';
import {} from '../../state/locations/locationByIdSlicer';

import EditLocation from '../EditLocation/EditLocation';
import AddNewLocation from '../AddNewLocation/AddNewLocation';
import { Link, useLocation } from 'react-router-dom';

function Account() {
  const [active, setActive] = useState<string>('profile');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [listId, setListId] = useState<number>(0);

  let inActiveNav = 'capitalize rounded-md p-2';
  let activeNav = 'capitalize rounded-md p-2 bg-custom-red text-white';

  let { pathname } = useLocation();

  return (
    <>
      <div className='flex sm:flex-col gap-2'>
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

      {/* <div className='w-full flex gap-4 justify-center'>
        <button
          className={active === 'profile' ? activeNav : inActiveNav}
          onClick={() => {
            setActive('profile');
            setEditMode(false);
          }}
        >
          profile
        </button>
        <button
          className={active === 'booking' ? activeNav : inActiveNav}
          onClick={() => {
            setActive('booking');
            setEditMode(false);
          }}
        >
          booking
        </button>
        <button
          className={active === 'location' ? activeNav : inActiveNav}
          onClick={() => {
            setEditMode(false);
            setActive('location');
            setShowForm(false);
          }}
        >
          Locations
        </button>
      </div> */}
      {/* <>
        {active === 'location' && editMode && showForm && <EditLocation />}
        {active === 'location' && !editMode && showForm && <AddNewLocation />}
        {active === 'location' && !showForm && (
          <Locations
            setShowForm={setShowForm}
            setEditMode={setEditMode}
            setListId={setListId}
          />
        )}

        {active === 'profile' && 'profile'}
        {active === 'booking' && 'booking'}
      </> */}
    </>
  );
}

export default Account;
