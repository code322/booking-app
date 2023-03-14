import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { API_URL } from '../../helpers/api';
import CheckBox from '../../components/CheckBoxes/CheckBoxes';
import InputFields from '../../components/InputFields/InputFields';
import { boxes } from '../../components/CheckBoxes/boxesList';
import UploadPhotos from '../../components/UploadPhotos/UploadPhotos';
import { useAppSelector } from '../../hooks/userTypeSelector';
import { selectUploadedPhotos } from '../../state/locations/upLoadPhotosSlicer';
import Container from '../../components/Container/Container';
import Account from '../Account/Account';

type perksTypes = {
  wifi: boolean;
  TV: boolean;
  pet: boolean;
  ['free parking spot']: boolean;
  radio: boolean;
  ['private entrance']: boolean;
};
function NewLocation() {
  const addedPhotos = useAppSelector(selectUploadedPhotos);

  const [isChecked, setIsChecked] = useState<perksTypes>({
    wifi: false,
    TV: false,
    pet: false,
    ['free parking spot']: false,
    radio: false,
    ['private entrance']: false,
  });

  const [input, setInput] = useState({
    title: '',
    address: '',
    description: '',
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

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
                {boxes.map(({ label, icon }) => (
                  <CheckBox
                    handleBoxes={handleCheckBoxes}
                    label={label}
                    icon={icon}
                  />
                ))}
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

export default NewLocation;

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
