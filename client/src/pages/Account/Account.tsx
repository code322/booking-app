import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import LocationForm from '../LocationForm/LocationForm';
import Locations from '../Locations/Locations';
import { selectUploadedPhotos } from '../../state/locations/upLoadPhotosSlicer';
import dummyData from '../../dummyData';
import {
  getAllLocations,
  selectLocations,
} from '../../state/locations/locationsSlicer';
import {} from '../../state/locations/locationByIdSlicer';
import {
  perksTypes,
  inputTypes,
  initialPerks,
  initialInput,
} from '../../helpers/types';
import EditLocation from '../EditLocation/EditLocation';

function Account() {
  const [active, setActive] = useState<string>('profile');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const addedPhotos = useAppSelector(selectUploadedPhotos);
  const [listId, setListId] = useState<number>(0);

  const locationsList = useAppSelector(selectLocations);

  const [input, setInput] = useState<inputTypes>(initialInput);

  const [isChecked, setIsChecked] = useState<perksTypes>(initialPerks);

  let inActiveNav = 'capitalize rounded-md p-2';
  let activeNav = 'capitalize rounded-md p-2 bg-custom-red text-white';

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllLocations() as any);
  }, [dispatch]);

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
        {active === 'location' && editMode && showForm && (
          <EditLocation id={listId} />
        )}
        {active === 'location' && !editMode && showForm && <LocationForm />}
        {active === 'location' && !showForm && (
          <Locations
            locationsList={locationsList}
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
