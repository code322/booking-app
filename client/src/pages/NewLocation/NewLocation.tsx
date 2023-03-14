import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { API_URL } from '../../helpers/api';

type perksTypes = {
  wifi: boolean;
  TV: boolean;
  pet: boolean;
  ['free parking spot']: boolean;
  radio: boolean;
  ['private entrance']: boolean;
};
function NewLocation() {
  const [addedPhotos, setAddedPhots] = useState<any>([]);
  const [photoLink, setPhotoLink] = useState<string>();

  const [isChecked, setIsChecked] = useState<perksTypes>({
    wifi: false,
    TV: false,
    pet: false,
    ['free parking spot']: false,
    radio: false,
    ['private entrance']: false,
  });

  const boxes = [
    {
      label: 'wifi',
      icon: 'material-symbols:wifi',
    },
    {
      label: 'free parking spot',
      icon: 'fluent-mdl2:parking-location-mirrored',
    },
    {
      label: 'TV',
      icon: 'ic:round-tv',
    },
    {
      label: 'radio',
      icon: 'ic:outline-radio',
    },
    {
      label: 'pet',
      icon: 'map:pet-store',
    },
    {
      label: 'private entrance',
      icon: 'material-symbols:door-back-outline',
    },
  ];

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
    const { id, value } = e.target;
    setInput((preVal) => {
      return { ...preVal, [id]: value };
    });
  }
  async function handleUploadPhoto(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        `${API_URL}/api/upload/upload-by-link`,
        {
          link: photoLink,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setAddedPhots([...addedPhotos, data]);
      setPhotoLink('');
    } catch (error: any) {
      console.log(error.response);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    let files: any = e.target.files;

    const newData = new FormData();
    for (let i = 0; i < files.length; i++) {
      newData.append('photos', files[i]);
    }
    try {
      let { data } = await axios.post(
        `${API_URL}/api/upload/upload-from-local`,
        newData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setAddedPhots([...addedPhotos, ...data]);
    } catch (error) {
      console.log(error);
    }
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
    <div className='m-4'>
      <div className='mt-10'>
        <form className='flex flex-col'>
          <Fields
            message='Title for your place, should be short and catchy as in advertisement'
            label='title'
            placeholder='Title'
            handleChange={handleInput}
          />
          <Fields
            message='Address to this place'
            label='address'
            placeholder='Address'
            handleChange={handleInput}
          />
          <div className='flex gap-2'>
            <Fields
              message='More = better'
              label='photos'
              placeholder='Add using a link ...jpg'
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhotoLink(e.target.value)
              }
              value={photoLink}
            />
            <button
              className='bg-custom-red rounded-md flex items-center gap-2 text-xs text-white self-end p-2 capitalize'
              onClick={handleUploadPhoto}
            >
              <Icon icon='ic:twotone-cloud-upload' />
              <span>add photo</span>
            </button>
          </div>
          <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            <label
              className='border h-28 w-28  rounded-md text-gray-500 flex justify-center items-center gap-2 cursor-pointer'
              htmlFor='photoInput'
            >
              <Icon icon='ic:twotone-cloud-upload' />
              Upload
              <input
                id='photoInput'
                className='hidden'
                type='file'
                accept='image/*'
                multiple
                onChange={handleUpload}
              />
            </label>

            <>
              {addedPhotos.length > 0 &&
                addedPhotos.map((links: any) => (
                  <div>
                    <img
                      className='h-28 w-28 object-cover center object-center rounded-md'
                      src={`${API_URL}/uploads/` + links}
                      alt=''
                    />
                  </div>
                ))}
            </>
          </div>

          <div className='mt-2 flex flex-col'>
            <label htmlFor='textarea'>Description</label>
            <small className='text-xs text-gray-400'>
              Description of the place
            </small>
            <textarea
              id='description'
              className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
              onChange={handleInput}
            ></textarea>
          </div>
          <div className='mt-4'>
            <h2>Perks</h2>
            <small className='text-gray-400'>
              Selected all the perks of your place
            </small>
            <div className='mt-4 grid grid-cols-2 md:grid-cols-3 gap-2'>
              {boxes.map(({ label, icon }) => (
                <CheckBox
                  handleBoxes={handleCheckBoxes}
                  label={label}
                  icon={icon}
                />
              ))}
            </div>
          </div>
          <div className='mt-4'>
            <h2 className=''>Extra Info</h2>

            <textarea
              id='extraInfo'
              className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
              onChange={handleInput}
            ></textarea>
          </div>
          <div className='mt-4'>
            <h2>Checking In and Out time</h2>
            <small className='text-xs text-gray-400'>
              Add check in and out times. Remember to have soe time window for
              cleaning the room between guests.
            </small>
            <div className='flex justify-between gap-2'>
              <div className='flex flex-col'>
                <label htmlFor='checkIn'>Check in time</label>
                <input
                  className='flex border w-full flex-1'
                  id='checkIn'
                  type='time'
                  onChange={handleInput}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='checkOut'>Check out time</label>
                <input
                  className='flex border w-full flex-1'
                  id='checkOut'
                  type='time'
                  onChange={handleInput}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='guests'>Guests</label>
                <input
                  className='flex border w-full flex-1'
                  id='guests'
                  type='number'
                  placeholder='Guests'
                  min={1}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className='bg-custom-red mt-4 text-white rounded-md capitalize py-2'
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewLocation;
type fieldsType = {
  label: string;
  placeholder: string;
  message: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const Fields = ({ label, placeholder, message, handleChange }: fieldsType) => (
  <div className='flex flex-col flex-1'>
    <label className=' capitalize py-2' htmlFor={label}>
      {label}
    </label>
    <small className=' text-gray-400 text-xs'>{message}</small>
    <input
      className='rounded-full outline-none border px-4 py-2 text-base '
      id={label}
      type='text'
      placeholder={placeholder}
      onChange={handleChange}
    />
  </div>
);

type checkBoxType = {
  label: string;
  icon: string;
  value?: string;
  handleBoxes: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CheckBox = ({ label, icon, value, handleBoxes }: checkBoxType) => (
  <>
    <label
      className='capitalize text-sm cursor-pointer flex gap-2 items-center
      border p-2 rounded-md'
      htmlFor={label}
    >
      <input
        id={label}
        type='checkbox'
        value={value}
        onChange={handleBoxes}
        // checked={true}
      />
      <Icon className='text-gray-400' icon={icon} />
      {label}
    </label>
  </>
);
