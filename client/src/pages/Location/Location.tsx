import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getLocationById,
  selectLocationById,
} from '../../state/locations/locationByIdSlicer';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import Container from '../../components/Container/Container';
import { API_URL } from '../../helpers/api';
import { Icon } from '@iconify/react';

const Location = () => {
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (!id) return;
    dispatch(getLocationById(Number(id)) as any);
  }, [id, dispatch]);

  const location = useAppSelector(selectLocationById);
  const [current, setCurrent] = useState(0);

  let photoLength = location?.photos?.length - 1;

  function handleRight() {
    if (current < photoLength) {
      return setCurrent((preVal) => preVal + 1);
    }
    return setCurrent(0);
  }
  function handleLeft() {
    if (current > 0) {
      return setCurrent((preVal) => preVal - 1);
    }
    return setCurrent(photoLength);
  }
  console.log(current);
  return (
    <Container>
      <div className='flex flex-col'>
        <h2 className='capitalize text-xl'>{location?.details?.title}</h2>
        <small className='font-bold underline underline-offset-2 decoration  capitalize text-xs'>
          {location?.details.address}
        </small>
      </div>
      <div className='grid gap-2 sm:grid-cols-[2fr_1fr] mt-6'>
        <div className='w-full'>
          <img
            onClick={() => {
              setIsExpanded(true);
              setCurrent(0);
            }}
            className='aspect-square object-cover hover:cursor-pointer rounded-md min-w-full'
            src={`${API_URL}/uploads/${location?.photos?.[0]}`}
            alt=''
          />
        </div>
        <div className='grid relative overflow-hidden'>
          {location?.photos?.map((photos, index) =>
            index === 0 || index > 2 ? (
              ''
            ) : (
              <div className={``}>
                <img
                  onClick={() => {
                    setIsExpanded(true);
                    setCurrent(index);
                  }}
                  className={`'aspect-square object-cover relative hover:cursor-pointer w-full rounded-md ${
                    index === 2 ? ' top-2' : ''
                  }`}
                  src={`${API_URL}/uploads/${location?.photos?.[index]}`}
                  alt=''
                />
              </div>
            )
          )}
          <button
            onClick={() => setIsExpanded(true)}
            className='absolute right-2 bottom-2 bg-gray-200 text-black p-2 rounded text-center text-xs flex items-center gap-2 hover:bg-gray-300 transition-all duration-100 ease-in-out'
          >
            <Icon icon='material-symbols:grid-on-sharp' />
            <span>Show more photos</span>
          </button>
        </div>
        <div
          className={`fixed bottom-0 w-full bg-gray-900 left-0 transition-all duration-200 ease-in-out overflow-scroll pb-4 ${
            isExpanded ? 'h-full' : 'h-0'
          }`}
        >
          <div className='bg-gray-900 h-full flex justify-center items-center '>
            <div className='max-w-5xl m-auto px-3 py-4   w-full'>
              <button
                onClick={() => setIsExpanded(false)}
                className='text-white relative left-0'
              >
                X Close
              </button>
              <div className='flex flex-col gap-2 mt-2 min-h-full relative'>
                <div className='absolute flex justify-between items-center  px-2 w-full h-full'>
                  <button
                    onClick={handleLeft}
                    className='text-gray-900 text-5xl'
                  >
                    <Icon icon='material-symbols:arrow-circle-left' />{' '}
                  </button>
                  <button
                    onClick={handleRight}
                    className='text-gray-900 text-5xl'
                  >
                    <Icon icon='material-symbols:arrow-circle-right' />{' '}
                  </button>
                </div>

                {location?.photos && (
                  <img
                    className='rounded-md'
                    src={`${API_URL}/uploads/${location?.photos[current]}`}
                    alt=''
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Location;
