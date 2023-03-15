import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { useAppSelector } from '../../hooks/userTypeSelector';
import { userSelector } from '../../state/authSlicer/authSlicer';
import NewLocation from '../LocationForm/LocationForm';
import Locations from '../Locations/Locations';

function Account() {
  const user = useAppSelector(userSelector);
  const [active, setActive] = useState<string>('profile');
  const [showList, setShowList] = useState(true);
  console.log(active, showList);

  let inActiveNav = 'capitalize rounded-md p-2';
  let activeNav = 'capitalize rounded-md p-2 bg-custom-red text-white';
  return (
    <Container>
      <div className='w-full flex gap-4 justify-center'>
        <button
          className={active === 'profile' ? activeNav : inActiveNav}
          onClick={() => setActive('profile')}
        >
          profile
        </button>
        <button
          className={active === 'booking' ? activeNav : inActiveNav}
          onClick={() => setActive('booking')}
        >
          booking
        </button>
        <button
          className={active === 'location' ? activeNav : inActiveNav}
          onClick={() => {
            setActive('location');
            setShowList(true);
          }}
        >
          Locations
        </button>
      </div>
      <>
        {active === 'location' && !showList && <NewLocation />}
        {active === 'location' && showList && (
          <Locations setShowList={setShowList} />
        )}
        {active === 'profile' && 'profile'}
        {active === 'booking' && 'booking'}
        {/* {active === 'profile' ? (
          'profile'
        ) : active === 'booking' ? (
          'booking'
        ) : active === 'location' && !showList ? (
          <NewLocation />
        ) : active === 'location' ? (
          <Locations setShowList={setShowList} />
        ) : (
          ''
        )} */}
      </>
    </Container>
  );
}

export default Account;
