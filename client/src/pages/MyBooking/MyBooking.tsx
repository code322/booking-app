import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import Account from '../Account/Account';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import {
  deleteReservation,
  getAllReservations,
  selectAllReservations,
} from '../../state/reservation/reservation';

import Modal from '../../components/Modal/Modal';
import ModalMessage from '../../components/ModalMessage/ModalMessage';
import LocationsList from '../../components/Lists/LocationsList';

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
        <Modal
          showModal={showModal}
          handleNo={() => {
            setShowModal(false);
          }}
          handleYes={() => {
            dispatch(deleteReservation(modalInfo.id) as any);
            setShowModal(false);
          }}
        >
          <ModalMessage modalInfo={modalInfo} />
        </Modal>

        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {reservedList &&
            reservedList?.map((locations) => {
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
                <LocationsList locations={locations}>
                  <>
                    <div className='mt-2 flex justify-between '>
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
                  </>
                </LocationsList>
              );
            })}
        </ul>
      </div>
    </Container>
  );
};

export default MyBooking;
