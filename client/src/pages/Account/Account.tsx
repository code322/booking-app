import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import Locations from '../Locations/Locations';
import {} from '../../state/locations/locationByIdSlicer';

import EditLocation from '../EditLocation/EditLocation';
import AddNewLocation from '../AddNewLocation/AddNewLocation';

function Account() {
  const [active, setActive] = useState<string>('profile');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [listId, setListId] = useState<number>(0);

  let inActiveNav = 'capitalize rounded-md p-2';
  let activeNav = 'capitalize rounded-md p-2 bg-custom-red text-white';

  return (
    <Container>
      <div className='w-full flex gap-4 justify-center'>
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
      </div>
      <>
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
      </>
    </Container>
  );
}

export default Account;
