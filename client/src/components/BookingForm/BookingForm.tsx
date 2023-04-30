import React, { useMemo, useState, memo } from 'react';
import { convertToDollars } from '../../utils';
import { differenceInCalendarDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  isLoggedInSelector,
  selectUser,
} from '../../state/authSlicer/authSlicer';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import { locationType } from '../../state/locations/locationsSlicer';
import { addNewReservation } from '../../state/reservation/reservation';

export type reserveType = {
  userId: number;
  checkOut: string;
  checkIn: string;
  locationId: number;
  totalCost: number;
};

interface Props {
  location: locationType;
}
const BookingForm = ({ location }: Props) => {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<string>('1');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let totalCost = useMemo(() => {
    let cleaningFee = 10;
    let serviceFee = 20;
    let numberOfNights = 0;
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    if (checkIn && checkOut && numberOfNights > 0) {
      let costPerNight =
        Number(location?.details?.price) * Number(guests) * numberOfNights;

      let taxes = (costPerNight + cleaningFee + serviceFee) * 0.13;
      let total = costPerNight + cleaningFee + serviceFee + taxes;

      return {
        numberOfNights,
        costPerNight,
        cleaningFee,
        serviceFee,
        taxes,
        total,
      };
    }
    return {
      numberOfNights: 0,
      costPerNight: 0,
      cleaningFee: 0,
      serviceFee: 0,
      taxes: 0,
      total: 0,
    };
  }, [checkIn, checkOut, guests]);

  let today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T')[0];

  const isDisabled = totalCost.numberOfNights ? true : false;
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user = useAppSelector(selectUser);

  const handleBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    let body: reserveType = {
      userId: user.id,
      checkOut: checkOut,
      checkIn: checkIn,
      locationId: Number(location.id),
      totalCost: totalCost.total,
    };
    dispatch(addNewReservation(body) as any);
    setCheckIn('');
    setCheckOut('');
    setGuests('');
  };

  return (
    <div className='shadow-customShadow p-6 rounded-md'>
      <div className='mb-2'>
        <p className='text-xs'>
          <span className='font-bold text-xl'>${location?.details?.price}</span>
          <span>/night</span>
        </p>
      </div>
      <div className='rounded-md border'>
        <div className='flex border-b'>
          <div className='flex flex-col flex-1 p-2 border-r'>
            <label className='font-bold uppercase text-xs' htmlFor='check-in'>
              check-in
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCheckIn(e.target.value)
              }
              className='text-xs outline-none'
              id='checkIn'
              type='date'
              value={checkIn}
              min={today}
              required
            />
          </div>
          <div className='flex flex-col flex-1 p-2'>
            <label className=' font-bold uppercase text-xs' htmlFor='check-in'>
              checkout
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCheckOut(e.target.value)
              }
              className='text-xs outline-none'
              id='checkOut'
              type='date'
              value={checkOut}
              min={today}
              required
            />
          </div>
        </div>
        <div className='flex flex-col py-4'>
          <label className='capitalize text-xs font-bold px-2 pb-1' htmlFor=''>
            Number of guests
          </label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              let val = e.target.value;
              let maxGuests = location?.details?.guests;
              setGuests(() =>
                Number(val) > Number(maxGuests) ? maxGuests : val
              );
            }}
            min={1}
            className='border mx-2 text-base p-1 outline-none'
            type='text'
            id='guests'
            value={guests}
            max={location?.details?.guests}
            maxLength={location?.details?.guests?.length}
            pattern='[0-9]*'
            // maxLength={1}
          />
        </div>
      </div>
      <button
        disabled={!isDisabled}
        onClick={handleBooking}
        className={`text-white bg-custom-red text-center w-full rounded-md outline-none py-2 mt-2 capitalize ${
          isDisabled ? 'bg-opacity-100' : 'bg-opacity-40'
        }`}
      >
        reserve
      </button>
      <>
        <table className='w-full mt-6'>
          <tbody>
            <TableRow
              label={
                <>
                  <span>${location?.details?.price}</span>
                  <span> X {guests} guest(s)</span>
                  <span> X {totalCost.numberOfNights} night(s)</span>
                </>
              }
              data={convertToDollars(totalCost.costPerNight)}
            />
            <TableRow
              label={<span>Cleaning fee</span>}
              data={convertToDollars(totalCost.cleaningFee)}
            />
            <TableRow
              label={<span>Service fee</span>}
              data={convertToDollars(totalCost.serviceFee)}
            />
            <TableRow
              label={<span>Taxes</span>}
              data={convertToDollars(totalCost.taxes)}
            />
            <tr className='w-full border'></tr>
            <TableRow
              label={
                <span
                  className='font-bold text-lg
                      '
                >
                  Total
                </span>
              }
              data={convertToDollars(totalCost.total)}
            />
          </tbody>
        </table>
      </>
    </div>
  );
};

export default memo(BookingForm);

type tableRowTypes = {
  label?: JSX.Element;
  data?: string;
};
const TableRow = ({ label, data }: tableRowTypes) => {
  return (
    <tr className='flex justify-between '>
      <td>{label}</td>
      <td>{data}</td>
    </tr>
  );
};
