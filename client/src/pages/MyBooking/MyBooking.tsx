import React from 'react';
import Container from '../../components/Container/Container';
import Account from '../Account/Account';

const MyBooking = () => {
  return (
    <Container>
      <div className='flex gap-6 flex-col sm:flex-row min-h-[calc(100vh_-_4rem)]'>
        <Account />
      </div>
    </Container>
  );
};

export default MyBooking;
