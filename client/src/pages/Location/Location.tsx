import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getLocationById,
  selectLocationById,
  selectLocationByIdStatus,
} from '../../state/locations/locationByIdSlicer';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import Container from '../../components/Container/Container';
import { API_URL } from '../../helpers/api';
import { Icon } from '@iconify/react';
import Spinner from '../../utils/Spinner';

import Slides from '../../components/Slides/Slides';
import BookingForm from '../../components/BookingForm/BookingForm';

const Location = () => {
  const { id } = useParams<{ id?: string }>();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);

  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (!id) return;
    dispatch(getLocationById(Number(id)) as any);
  }, [id, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useAppSelector(selectLocationById);
  const status = useAppSelector(selectLocationByIdStatus);

  //disable scrolling during slide
  useEffect(() => {
    document.body.style.overflow = 'unset';
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    }
  }, [isExpanded]);

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
              {location?.details?.address}
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
                  <div key={index}>
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
                className='absolute right-2 bottom-2 bg-custom-red text-black p-2 rounded text-center text-xs flex items-center gap-2 hover:bg-opacity-95 transition-all duration-300 ease-in-out'
              >
                <Icon
                  className='text-white'
                  icon='material-symbols:grid-on-sharp'
                />
                <span className='text-white'>Show more photos</span>
              </button>
            </div>

            {/* ---SLIDES--- */}
            <Slides
              location={location}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              current={current}
              setCurrent={setCurrent}
            />
          </div>
          {/* ---DESCRIPTION AND BOOKING--- */}
          <div className='flex flex-col'>
            <div className='mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]'>
              {/* ---DESCRIPTION--- */}

              <div>
                <h2 className='font-bold text-xl text-black'>Description</h2>
                <p>{location?.details?.description}</p>
              </div>

              {/* ---BOOKING--- */}
              <>
                <BookingForm location={location} />
              </>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Location;
