import React from 'react';
import { Content } from '../../pages/NewLocation/NewLocation';
import InputFields from '../InputFields/InputFields';
import { Icon } from '@iconify/react';
import { API_URL } from '../../helpers/api';
import axios from 'axios';
type uploadPhotosType = {
  photoLink: string;
  setAddedPhots: (value: any) => void;
  addedPhotos: any;
  setPhotoLink: (value: React.SetStateAction<string>) => void;
};
function UploadPhotos({
  photoLink,
  addedPhotos,
  setPhotoLink,
  setAddedPhots,
}: uploadPhotosType) {
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
  return (
    <>
      <div className='flex gap-2'>
        <Content label={'photos'} info='More =  better'>
          <InputFields
            name='photo'
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhotoLink(e.target.value)
            }
            placeholder='Add a photo link...'
            value={photoLink}
          />
        </Content>
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
    </>
  );
}

export default UploadPhotos;
