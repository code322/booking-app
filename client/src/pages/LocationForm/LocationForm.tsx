import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { API_URL } from '../../helpers/api';
import CheckBox from '../../components/CheckBoxes/CheckBoxes';
import InputFields from '../../components/InputFields/InputFields';
import { boxes, boxesType } from '../../components/CheckBoxes/boxesList';
import UploadPhotos from '../../components/UploadPhotos/UploadPhotos';
import Container from '../../components/Container/Container';
import { inputTypes, perksTypes } from '../Account/Account';

interface Props {
  input: inputTypes;
  setInput: React.Dispatch<React.SetStateAction<inputTypes>>;
  addedPhotos: string[];
  isChecked: perksTypes;
  setIsChecked: React.Dispatch<React.SetStateAction<perksTypes>>;
}
function LocationForm({
  input,
  setInput,
  addedPhotos,
  isChecked,
  setIsChecked,
}: Props) {
  function handleCheckBoxes(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;

    setIsChecked({
      ...isChecked,
      [id]: checked,
    });
  }
  function handleInput(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setInput((preVal) => {
      return { ...preVal, [name]: value };
    });
  }

  console.log();

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    let newPlace = {
      ...input,
      photos: addedPhotos,
      perks: isChecked,
    };
    try {
      let { data } = await axios.post(
        `${API_URL}/api/location/new-location`,
        newPlace
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <div className='m-4'>
        <div className='mt-10'>
          <form className='flex flex-col'>
            <Content
              label={'title'}
              info='Title for your place, should be short and catchy as in advertisement'
            >
              <InputFields
                type={'text'}
                name='title'
                handleChange={handleInput}
                value={input.title}
              />
            </Content>
            <Content label={'address'} info='Address to this place'>
              <InputFields
                name='address'
                handleChange={handleInput}
                value={input.address}
              />
            </Content>

            {/* upload photo */}
            <UploadPhotos addedPhotos={addedPhotos} />

            {/* Description */}
            <Content label='description' info='add description of the place'>
              <textarea
                name='description'
                className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
                onChange={handleInput}
                value={input.description}
              ></textarea>
            </Content>
            {/* Perks */}
            <Content label='perks' info='Selected all the perks of your place'>
              <div className='mt-4 grid grid-cols-2 md:grid-cols-3 gap-2'>
                {/* {boxes.map((items: boxesType) => (
                  <CheckBox
                    handleBoxes={handleCheckBoxes}
                    label={items.label}
                    icon={items.icon}
                    checked={isChecked[`${items.label}`]}
                  />
                ))} */}
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'wifi'}
                  icon={'material-symbols:wifi'}
                  checked={isChecked.wifi}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'free parking spot'}
                  icon={'fluent-mdl2:parking-location-mirrored'}
                  checked={isChecked['free parking spot']}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'TV'}
                  icon={'ic:round-tv'}
                  checked={isChecked.TV}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'radio'}
                  icon={'ic:outline-radio'}
                  checked={isChecked.radio}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'pet'}
                  icon={'map:pet-store'}
                  checked={isChecked.pet}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'private entrance'}
                  icon={'material-symbols:door-back-outline'}
                  checked={isChecked['private entrance']}
                />
              </div>
            </Content>

            {/* Extra info */}
            <Content label='extra info' info='Add extra info'>
              <textarea
                name='extraInfo'
                className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
                onChange={handleInput}
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
                    value={input.checkIn}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='checkOut'>Check out time</label>
                  <input
                    className='flex border w-full flex-1'
                    name='checkOut'
                    type='time'
                    onChange={handleInput}
                    value={input.checkOut}
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
                    value={input.guests}
                  />
                </div>
              </div>
            </Content>

            {/* submit button */}
            <button
              onClick={handleSubmit}
              className='bg-custom-red mt-4 text-white rounded-md capitalize py-2'
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </Container>
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
    <label className=' capitalize py-2' htmlFor={label}>
      {label}
    </label>
    <small className='text-xs text-gray-400'>{info}</small>
    {children}
  </div>
);
