import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getLocationById,
  selectLocationById,
  selectLocationByIdStatus,
} from '../../state/locations/locationByIdSlicer';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import Container from '../../components/Container/Container';
import { API_URL } from '../../helpers/api';
import { Icon } from '@iconify/react';
import ReactLoading from 'react-loading';
import Spinner from '../../components/Spinner';

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
  const status = useAppSelector(selectLocationByIdStatus);

  return (
    <>
      {status !== 'succeeded' ? (
        <Container>
          <Spinner />
        </Container>
      ) : (
        <Container>
          <div className='flex flex-col'>
            <h2 className='capitalize text-xl'>{location?.details?.title}</h2>
            <small className='font-bold underline underline-offset-2 decoration  capitalize text-xs'>
              {location?.details.address}
            </small>
          </div>
          <div className='grid gap-2 sm:grid-cols-[2fr_1fr] mt-6 rounded-2xl overflow-hidden'>
            <div className='w-full'>
              <img
                onClick={() => {
                  setIsExpanded(true);
                  setCurrent(0);
                }}
                className='aspect-square object-cover hover:cursor-pointer w-full'
                src={`${API_URL}/uploads/${location?.photos?.[0]}`}
                alt=''
              />
            </div>
            <div className='grid relative overflow-hidden'>
              {location?.photos?.map((_, index) =>
                index === 0 || index > 2 ? (
                  ''
                ) : (
                  <div className={``}>
                    <img
                      onClick={() => {
                        setIsExpanded(true);
                        setCurrent(index);
                      }}
                      className={`aspect-square object-cover relative hover:cursor-pointer w-full ${
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

            {/* ---SLIDE SHOWS--- */}
            <div
              className={`fixed bottom-0 w-full bg-white left-0 transition-all duration-200 ease-in-out  pb-4 ${
                isExpanded ? 'h-full' : 'h-0'
              }`}
            >
              <div className='bg-white h-full flex justify-center items-center '>
                <div className='max-w-5xl m-auto px-3 py-4   w-full'>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className='text-gray-900 relative left-0 p-1 rounded-full border-2 font-bold border-gray-900 h-10 w-10 flex justify-center items-center'
                  >
                    <Icon icon='ic:outline-close' className='text-2xl' />
                  </button>
                  <div className='flex flex-col gap-2 mt-2 relative'>
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
          {/* ---DESCRIPTION AND BOOKING--- */}
          <div>
            <div className='mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]'>
              {/* ---DESCRIPTION--- */}

              <div>
                <h2 className='font-bold text-xl text-black'>Description</h2>
                <p>{location.details.description}</p>
              </div>
              {/* ---BOOKING--- */}
              <div className='shadow-customShadow border p-6 rounded-md'>
                <div className='mb-2'>
                  <p className='text-xs'>
                    <span className='font-bold text-xl'>
                      ${location?.details?.price}
                    </span>
                    <span>/night</span>
                  </p>
                </div>
                <div className='rounded-md border'>
                  <div className='flex border-b'>
                    <div className='flex flex-col flex-1 p-2 border-r'>
                      <label
                        className=' font-bold uppercase text-xs'
                        htmlFor='check-in'
                      >
                        check-in
                      </label>
                      <input className='text-xs' id='check-in' type='date' />
                    </div>
                    <div className='flex flex-col flex-1 p-2'>
                      <label
                        className=' font-bold uppercase text-xs'
                        htmlFor='check-in'
                      >
                        checkout
                      </label>
                      <input className='text-xs' id='checkout' type='date' />
                    </div>
                  </div>
                  <div className='flex flex-col py-4'>
                    <label
                      className='capitalize text-xs font-bold px-2 pb-1'
                      htmlFor=''
                    >
                      Number of guests
                    </label>
                    <input
                      min={1}
                      className='border mx-2 text-base p-1 outline-none'
                      type='number'
                    />
                  </div>
                </div>
                <button className='text-white bg-custom-red text-center w-full rounded-md outline-none py-2 mt-2 capitalize'>
                  reserve
                </button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Location;
