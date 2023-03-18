import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { API_URL } from '../../helpers/api';
import CheckBox from '../../components/CheckBoxes/CheckBoxes';
import InputFields from '../../components/InputFields/InputFields';
import { boxes, boxesType } from '../../components/CheckBoxes/boxesList';
import UploadPhotos from '../../components/UploadPhotos/UploadPhotos';
import Container from '../../components/Container/Container';
import { useAppDispatch } from '../../hooks/userTypeSelector';
import { addNewLocation } from '../../state/locations/locationsSlicer';
import {
  initialDetails,
  initialUtils,
  detailsTypes,
  utilsTypes,
} from '../../helpers/types';

export type newLocationType = {
  title: string;
  address: string;
  photos: string[];
  description: string;
  utils: {
    wifi: boolean;
    netflex: boolean;
    hydro: boolean;
    parking: boolean;
    water: boolean;
    gym: boolean;
  };
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  guests: string;
};
interface Props {
  detailsData?: detailsTypes;
  photosData?: string[];
  utilsData?: utilsTypes;
}
function LocationForm({ detailsData, photosData, utilsData }: Props) {
  const [utils, setUtils] = useState<utilsTypes>(initialUtils);
  const [photos, setPhotos] = useState<string[]>([]);
  const [details, setDetails] = useState<detailsTypes>(initialDetails);

  function handleCheckBoxes(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;

    setUtils({
      ...utils,
      [id]: checked,
    });
  }
  function handleInput(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDetails((preVal) => {
      return { ...preVal, [name]: value };
    });
  }

  const dispatch = useAppDispatch();
  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    let newLocation: newLocationType = {
      ...details,
      photos: photos,
      utils: utils,
    };
    dispatch(addNewLocation(newLocation) as any);
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
                defaultValue={detailsData?.title}
              />
            </Content>
            <Content label={'address'} info='Address to this place'>
              <InputFields
                name='address'
                handleChange={handleInput}
                defaultValue={detailsData?.address}
              />
            </Content>

            {/* upload photo */}
            <UploadPhotos addedPhotos={photosData} />

            {/* Description */}
            <Content label='description' info='add description of the place'>
              <textarea
                name='description'
                className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
                onChange={handleInput}
                defaultValue={detailsData?.description}
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
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'parking'}
                  icon={'fluent-mdl2:parking-location-mirrored'}
                  defaultChecked={utilsData?.parking}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'netflex'}
                  icon={'ic:round-tv'}
                  defaultChecked={utilsData?.netflex}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'water'}
                  icon={'ic:outline-water'}
                  defaultChecked={utilsData?.water}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'hydro'}
                  icon={'material-symbols:light-outline-rounded'}
                  defaultChecked={utilsData?.hydro}
                />
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={'gym'}
                  icon={'iconoir:gym'}
                  defaultChecked={utilsData?.gym}
                />
              </div>
            </Content>

            {/* Extra info */}
            <Content label='extra info' info='Add extra info'>
              <textarea
                name='extraInfo'
                className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
                onChange={handleInput}
                defaultValue={detailsData?.extraInfo}
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
                    defaultValue={detailsData?.checkIn}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='checkOut'>Check out time</label>
                  <input
                    className='flex border w-full flex-1'
                    name='checkOut'
                    type='time'
                    onChange={handleInput}
                    defaultValue={detailsData?.checkOut}
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
                    defaultValue={detailsData?.guests}
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
