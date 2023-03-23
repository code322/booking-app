import React, { useState } from 'react';
import { Content } from '../../pages/LocationForm/LocationForm';
import InputFields from '../InputFields/InputFields';
import { Icon } from '@iconify/react';
import { API_URL } from '../../helpers/api';
import { useAppDispatch } from '../../hooks/userTypeSelector';
import {
  uploadByLinkPhoto,
  uploadSelectedPhoto,
} from '../../state/locations/upLoadPhotosSlicer';
import axios from 'axios';
interface Props {
  addedPhotos: string[];
}
function UploadPhotos({ addedPhotos }: Props) {
  const [photoLink, setPhotoLink] = useState<string>('');
  const [locationPhotos, setLocationPhotos] = useState<string[]>(addedPhotos);
  const dispatch = useAppDispatch();

  async function handleUploadPhoto(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(uploadByLinkPhoto(photoLink) as any);
    setPhotoLink('');
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    let photos: any = e.target.files;
    // dispatch(uploadSelectedPhoto(files) as any);

    const newData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      newData.append('photos', photos[i]);
    }
    try {
      const { data } = await axios.post(
        `${API_URL}/api/upload/upload-from-local`,
        newData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setLocationPhotos((preVal) => [...preVal, ...data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function removePhoto(link: string, index: number) {
    // console.log(index);
    try {
      await axios.delete(`${API_URL}/api/upload/remove-photo/${index}`, {
        data: {
          link,
        },
      });
      setLocationPhotos(() => locationPhotos.filter((_, i) => i !== index));
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
          {locationPhotos &&
            locationPhotos.length > 0 &&
            locationPhotos.map((links: any, index: number) => (
              <div className='relative ' key={index}>
                <img
                  className='h-28 w-28 object-cover rounded-md'
                  src={`${API_URL}/uploads/` + links}
                  alt=''
                />
                <button
                  className='absolute -bottom-4 -left-3 z-10 bg-gray-200 rounded-full p-2 opacity-80'
                  onClick={(e) => {
                    e.preventDefault();
                    removePhoto(links, index);
                    console.log(index);
                  }}
                >
                  <Icon
                    icon='ic:baseline-delete'
                    className='text-xl text-gray-800'
                  />
                </button>
              </div>
            ))}
        </>
      </div>
    </>
  );
}

export default UploadPhotos;
