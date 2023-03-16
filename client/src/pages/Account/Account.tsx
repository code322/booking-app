import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import LocationForm from '../LocationForm/LocationForm';
import Locations from '../Locations/Locations';
import { selectUploadedPhotos } from '../../state/locations/upLoadPhotosSlicer';
import dummyData from '../../dummyData';
import {
  getAllLocations,
  locationType,
  selectLocations,
} from '../../state/locations/locationsSlicer';

export type perksTypes = {
  wifi: boolean;
  TV: boolean;
  pet: boolean;
  ['free parking spot']: boolean;
  radio: boolean;
  ['private entrance']: boolean;
};
export type inputTypes = {
  title: string;
  address: string;
  description: string;
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  guests: string;
};

function Account() {
  const [active, setActive] = useState<string>('profile');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const addedPhotos = useAppSelector(selectUploadedPhotos);
  const [listId, setListId] = useState<number>(0);
  const [editPhotos, setEditPhotos] = useState<string[]>([]);
  const [editPerks, setEditPerks] = useState<perksTypes>({
    wifi: false,
    TV: false,
    pet: false,
    ['free parking spot']: false,
    radio: false,
    ['private entrance']: false,
  });
  const [editInput, setEditInput] = useState<inputTypes>({
    title: '',
    address: '',
    description: '',
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });
  const locationsList = useAppSelector(selectLocations);

  const [input, setInput] = useState<inputTypes>({
    title: '',
    address: '',
    description: '',
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
  });

  const [isChecked, setIsChecked] = useState<perksTypes>({
    wifi: false,
    TV: false,
    pet: false,
    ['free parking spot']: false,
    radio: false,
    ['private entrance']: false,
  });

  // ? Disabling type checking is always an option to get rid of TypeScript
  // errors, but I personally don't recommend using it if there are other alternatives.
  // @ts-ignore:next-line
  const location: any = locationsList.find((item) => item.id === listId);
  const {
    id,
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    guests,
    perks,
    photos,
  } = location;

  let inputData = {
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    guests,
  };

  useEffect(() => {
    setEditInput(inputData);
    setEditPerks(perks);
    setEditPhotos(photos);
  }, [listId]);

  let inActiveNav = 'capitalize rounded-md p-2';
  let activeNav = 'capitalize rounded-md p-2 bg-custom-red text-white';
  // console.log(editPerks);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllLocations() as any);
  }, []);

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
          <LocationForm
            input={editInput}
            setInput={setEditInput}
            addedPhotos={editPhotos}
            isChecked={editPerks}
            setIsChecked={setEditPerks}
          />
        )}
        {active === 'location' && !editMode && showForm && (
          <LocationForm
            input={input}
            setInput={setInput}
            addedPhotos={addedPhotos}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        )}
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
