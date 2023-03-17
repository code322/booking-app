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
interface Props {
  addedPhotos?: string[];
}
function UploadPhotos({ addedPhotos }: Props) {
  const [photoLink, setPhotoLink] = useState<string>('');
  const dispatch = useAppDispatch();

  async function handleUploadPhoto(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(uploadByLinkPhoto(photoLink) as any);
    setPhotoLink('');
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    let files: any = e.target.files;
    dispatch(uploadSelectedPhoto(files) as any);
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
          {addedPhotos &&
            addedPhotos.length > 0 &&
            addedPhotos.map((links: any, index: number) => (
              <div key={index}>
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
