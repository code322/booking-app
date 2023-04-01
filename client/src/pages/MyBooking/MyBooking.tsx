import React, { useEffect } from 'react';
import Container from '../../components/Container/Container';
import Account from '../Account/Account';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import {
  getAllReservations,
  selectAllReservations,
} from '../../state/reservation/reservation';

const MyBooking = () => {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector(selectAllReservations);

  useEffect(() => {
    dispatch(getAllReservations() as any);
  }, [dispatch]);

  console.log(reservations);

  return (
    <Container>
      <div className='flex gap-6 flex-col sm:flex-row min-h-[calc(100vh_-_4rem)]'>
        <Account />
        <p>adsfa</p>
      </div>
    </Container>
  );
};

export default MyBooking;
