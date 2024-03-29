import React, { useState } from 'react';

import CheckBox from '../../components/CheckBoxes/CheckBoxes';
import InputFields from '../../components/InputFields/InputFields';
import UploadPhotos from '../../components/UploadPhotos/UploadPhotos';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';

import {
  detailsTypes,
  initialDetails,
  initialUtils,
  utilsTypes,
} from '../../helpers/types';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../state/auth/authSlice';
import { newLocationType } from '../../state/userList/userListTypes';
import { addNewList, updateUserList } from '../../state/userList/userListSlice';

interface Props {
  detailsData: detailsTypes;
  photosData: string[];
  utilsData: utilsTypes;
  editMode?: boolean;
  id: number;
}
function LocationForm({
  detailsData,
  photosData,
  utilsData,
  editMode = false,
  id,
}: Props) {
  // State Variables
  const [utils, setUtils] = useState<utilsTypes>(utilsData);
  const [photos, setPhotos] = useState<string[]>(photosData);
  const [details, setDetails] = useState<detailsTypes>(detailsData);

  // Redux dispatch and navigation
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  let locationData = {
    id,
    userId: user.id,
    details,
    photos,
    utils,
  };

  //Event handlers
  function handleCheckBoxes(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;

    setUtils({
      ...utils,
      [id]: checked,
    });
  }
  function handleInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDetails((preVal) => {
      return { ...preVal, [name]: value };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    let newLocation: newLocationType = {
      userId: user.id,
      details,
      photos,
      utils,
    };
    dispatch(addNewList(newLocation) as any);
    setPhotos([]);
    setUtils(initialUtils);
    setDetails(initialDetails);
  }

  async function handleSave(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    let update = {
      userId: user.id,
      id,
      details,
      photos,
      utils,
    };

    dispatch(updateUserList(update) as any);
    navigate(-1);
  }

  // Dynamically render submit button based on edit mode
  const renderSubmitButton = () => {
    if (editMode) {
      return (
        <button
          onClick={handleSave}
          className='bg-custom-red mt-4 text-white rounded-md capitalize py-2 flex-1 border-transparent outline-none '
        >
          save
        </button>
      );
    } else {
      return (
        <button
          onClick={handleSubmit}
          className='bg-custom-red mt-4 text-white rounded-md capitalize py-2 flex-1 border-transparent outline-none '
        >
          submit
        </button>
      );
    }
  };

  return (
    <form className='flex flex-col flex-1'>
      <Content
        label={'title'}
        info='Title for your place, should be short and catchy as in advertisement'
      >
        <InputFields
          type={'text'}
          name='title'
          handleChange={handleInput}
          value={details.title}
        />
      </Content>
      <Content label={'address'} info='Address to this place'>
        <InputFields
          name='address'
          handleChange={handleInput}
          value={details.address}
        />
      </Content>

      {/* upload photo */}
      <UploadPhotos
        photos={photos}
        setPhotos={setPhotos}
        locationData={locationData}
      />

      {/* Description */}
      <Content label='description' info='add description of the place'>
        <textarea
          name='description'
          className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
          onChange={handleInput}
          value={details.description}
        ></textarea>
      </Content>
      {/* Perks */}
      <Content label='utils' info='Selected all the utils of your place'>
        <div className='mt-4 grid grid-cols-2 md:grid-cols-3 gap-2'>
          {/* {boxes.map((items: boxesType) => (
                  <CheckBox
                    handleBoxes={handleCheckBoxes}
                    label={items.label}
                    icon={items.icon}
                    checked={utils[`${items.label}`]}
                  />
                ))} */}
          <CheckBox
            handleBoxes={handleCheckBoxes}
            label={'wifi'}
            icon={'material-symbols:wifi'}
            defaultChecked={utilsData?.wifi}
            checked={utils?.wifi}
          />
          <CheckBox
            handleBoxes={handleCheckBoxes}
            label={'parking'}
            icon={'fluent-mdl2:parking-location-mirrored'}
            defaultChecked={utilsData?.parking}
            checked={utils?.parking}
          />
          <CheckBox
            handleBoxes={handleCheckBoxes}
            label={'netflex'}
            icon={'ic:round-tv'}
            defaultChecked={utilsData?.netflex}
            checked={utils?.netflex}
          />
          <CheckBox
            handleBoxes={handleCheckBoxes}
            label={'water'}
            icon={'ic:outline-water'}
            checked={utils?.water}
          />
          <CheckBox
            handleBoxes={handleCheckBoxes}
            label={'hydro'}
            icon={'material-symbols:light-outline-rounded'}
            checked={utils?.hydro}
          />
          <CheckBox
            handleBoxes={handleCheckBoxes}
            label={'gym'}
            icon={'iconoir:gym'}
            checked={utils?.gym}
          />
        </div>
      </Content>

      {/* Extra info */}
      <Content label='extra info' info='Add extra info'>
        <textarea
          name='extraInfo'
          className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
          onChange={handleInput}
          value={details?.extraInfo}
        ></textarea>
      </Content>

      {/* checkIn and checkout time */}
      <Content
        label='checking in and out time'
        info=' Add check in and out times. Remember to have soe time window for
              cleaning the room between guests.'
      >
        <div className='flex justify-between gap-2'>
          <div className='flex flex-col'>
            <label htmlFor='checkIn'>Check in time</label>
            <input
              className='flex border w-full flex-1'
              name='checkIn'
              type='time'
              onChange={handleInput}
              value={details?.checkIn}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='checkOut'>Check out time</label>
            <input
              className='flex border w-full flex-1'
              name='checkOut'
              type='time'
              onChange={handleInput}
              value={details?.checkOut}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='guests'>Guests</label>
            <input
              className='flex border w-full flex-1'
              name='guests'
              type='number'
              placeholder='Guests'
              min={1}
              onChange={handleInput}
              value={details?.guests}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='guests'>Price</label>
            <input
              className='flex border w-full flex-1'
              name='price'
              type='number'
              placeholder='Price'
              min={1}
              max={100}
              onChange={handleInput}
              value={details?.price}
            />
          </div>
        </div>
      </Content>

      <div className='flex flex-col sm:flex-row sm:gap-4 justify-between mt-4'>
        {/* Dynamically render submit button */}
        {renderSubmitButton()}

        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className='mt-4 text-black rounded-md capitalize py-2 flex-1 border  outline-none'
        >
          cancel
        </button>
      </div>
    </form>
  );
}

export default LocationForm;

type contentType = {
  label: string;
  info: string;
  children: JSX.Element;
};

export const Content = ({ label, info, children }: contentType) => (
  <div className='mt-2 flex flex-col flex-1'>
    <label className=' capitalize by-2' htmlFor={label}>
      {label}
    </label>
    <small className='text-xs text-gray-400'>{info}</small>
    {children}
  </div>
);
