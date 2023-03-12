import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Places() {
  return (
    <div>
      <div>
        <Link
          className='bg-custom-red py-2 px-3 text-white rounded-md capitalize text-sm'
          to={'/account/places/new'}
        >
          {' '}
          + add new place
        </Link>
      </div>
      <div className='mt-10'>
        <form className='flex flex-col'>
          <Fields
            message='Title for your place, should be short and catchy as in advertisement'
            label='title'
            placeholder='Title'
          />
          <Fields
            message='Address to this place'
            label='address'
            placeholder='Address'
          />
          <div className='flex gap-2'>
            <Fields
              message='More = better'
              label='photos'
              placeholder='Add using a link ...jpg'
            />
            <button className='bg-custom-red rounded-md text-white self-end p-2 capitalize'>
              add photo
            </button>
          </div>
          <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            <button className='border h-32 w-32 rounded-md text-gray-500'>
              Upload
            </button>
          </div>
          <div className='mt-2 flex flex-col'>
            <label htmlFor='textarea'>Description</label>
            <small className='text-xs text-gray-400'>
              Description of the place
            </small>
            <textarea
              id='textarea'
              className='w-full resize-none border min-h-[100px] mt-2 outline-none p-2'
            ></textarea>
          </div>
          <div></div>
          <div className='mt-4 grid grid-cols-2 md:grid-cols-3 gap-2'>
            <Boxes label='wifi' icon='material-symbols:wifi' />
            <Boxes
              label='free parking spot'
              icon='fluent-mdl2:parking-location-mirrored'
            />
            <Boxes label='TV' icon='ic:round-tv' />
            <Boxes label='radio' icon='ic:outline-radio' />
            <Boxes label='pet' icon='map:pet-store' />
            <Boxes
              label='private entrance'
              icon='material-symbols:door-back-outline'
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Places;
type fieldsType = {
  label: string;
  placeholder: string;
  message: string;
};

const Fields = ({ label, placeholder, message }: fieldsType) => (
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
    />
  </div>
);

type boxTypes = {
  label: string;
  icon: string;
};
const Boxes = ({ label, icon }: boxTypes) => (
  <>
    <label
      className='capitalize text-sm cursor-pointer flex gap-2 items-center
      border p-2 rounded-md'
      htmlFor={label}
    >
      <input id={label} type='checkbox' />
      <Icon className='text-gray-400' icon={icon} />
      {label}
    </label>
  </>
);
