import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import Account from '../Account/Account';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import {
  deleteReservation,
  getAllReservations,
  selectAllReservations,
} from '../../state/reservation/reservation';
import { Icon } from '@iconify/react';
import { API_URL } from '../../helpers/api';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

export type modalType = {
  message: string;
  title: string;
  location: string;
  id: number;
};
const MyBooking = () => {
  const dispatch = useAppDispatch();
  const reservedList = useAppSelector(selectAllReservations);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalType>({
    title: '',
    location: '',
    message: '',
    id: 0,
  });
  useEffect(() => {
    dispatch(getAllReservations() as any);
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = 'unset';
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
  }, [showModal]);

  function handleCancelReservation(
    title: string,
    location: string,
    message: string,
    id: number
  ) {
    setModalInfo({
      title,
      location,
      message,
      id,
    });
    setShowModal(true);
  }

  return (
    <Container>
      <div className='flex gap-6 flex-col sm:flex-row min-h-[calc(100vh_-_4rem)] relative'>
        <Account />
        {showModal && (
          <Modal
            message={modalInfo.message}
            title={modalInfo.title}
            location={modalInfo.location}
            handleNo={() => setShowModal(false)}
            handleYes={() => {
              dispatch(deleteReservation(modalInfo.id) as any);
              setShowModal(false);
            }}
          />
        )}

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {reservedList &&
            reservedList?.map((locations, index) => {
              let price = Number(locations?.details?.price).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }
              );
              let totalCost = Number(locations?.totalCost).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }
              );

              return (
                <div key={index}>
                  <div className='relative'>
                    <Link to={`/location/${locations?.locationId}`}>
                      <img
                        className='bg-blue-200 aspect-square object-cover rounded-lg w-full h-full'
                        src={`${API_URL}/uploads/${locations?.photos?.[0]}`}
                        alt='no_image'
                      />
                      <div className='absolute bg-gradient-to-b from-transparent to-gray-700 opacity-60 h-full w-full top-0 left-0 rounded-lg'></div>
                      <div className='absolute bottom-2 text-white left-1'>
                        <span className=' text-white text-xl font-semibold '>
                          {price}
                        </span>
                        <span className='text-xs'>/night</span>
                      </div>
                    </Link>
                  </div>
                  <div className='py-3 '>
                    <h2 className='font-semibold text-base capitalize text-gray-700'>
                      {locations?.details?.title}
                    </h2>
                    <div className='flex items-center justify-start'>
                      <Icon
                        className='text-gray-600 mr-1 text-sm'
                        icon='material-symbols:location-on-outline'
                      />
                      <h2 className='text-gray-600 capitalize text-xs'>
                        {locations?.details?.address}
                      </h2>
                    </div>
                    <div className='flex items-center justify-start'>
                      <Icon
                        className='text-gray-600 mr-1 text-lg'
                        icon='mdi:bed-double-outline'
                      />
                      <h2 className='text-gray-600 text-xs'>
                        {locations?.details?.guests}
                      </h2>
                    </div>
                    <div className='mt-4 flex justify-between '>
                      <div className='flex gap-2'>
                        <div>
                          <p className='text-gray-800 text-xs font-bold uppercase'>
                            Check-In:
                          </p>
                          <p className='text-gray-600 text-xs'>
                            {locations?.checkIn}
                          </p>
                        </div>
                        <div>
                          <p className='text-gray-800 text-xs font-bold uppercase'>
                            checkout:
                          </p>
                          <p className='text-gray-600 text-xs'>
                            {locations?.checkOut}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className='text-gray-800 text-xs font-bold uppercase'>
                          Total Cost:
                        </p>
                        <p className='text-gray-600 text-xs text-end'>
                          {totalCost}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCancelReservation(
                          locations?.details?.title,
                          locations?.details?.address,
                          'Are you sure you want to cancel the reservation?',
                          locations?.id
                        )
                      }
                      className='bg-custom-red text-white
                     w-full py-2 rounded-md mt-2'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default MyBooking;
