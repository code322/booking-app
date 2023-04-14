import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getLocationById,
  selectLocationById,
  selectLocationByIdStatus,
} from '../../state/locations/locationByIdSlicer';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import Container from '../../components/Container/Container';
import { API_URL } from '../../helpers/api';
import { Icon } from '@iconify/react';
import Spinner from '../../components/Spinner';
import { differenceInCalendarDays } from 'date-fns';
import { convertToDollars } from '../../utils';
import { addNewReservation } from '../../state/reservation/reservation';
import { isLoggedInSelector } from '../../state/authSlicer/authSlicer';

export type reserveType = {
  checkOut: string;
  checkIn: string;
  locationId: number;
  totalCost: number;
};
type bookingFormType = {
  checkIn: string;
  checkOut: string;
  guests: string;
};
const Location = () => {
  const { id } = useParams<{ id?: string }>();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<bookingFormType>({
    checkIn: '',
    checkOut: '',
    guests: '1',
  });

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
  const [current, setCurrent] = useState(0);

  let photosLength = location?.photos?.length - 1;

  //right button
  function handleRight() {
    if (current < photosLength) {
      return setCurrent((preVal) => preVal + 1);
    }
    return setCurrent(0);
  }

  //left button
  function handleLeft() {
    if (current > 0) {
      return setCurrent((preVal) => preVal - 1);
    }
    return setCurrent(photosLength);
  }

  useEffect(() => {
    document.body.style.overflow = 'unset';
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    }
  }, [isExpanded]);

  let totalCost = useMemo(() => {
    let cleaningFee = 10;
    let serviceFee = 20;
    let numberOfNights = 0;
    numberOfNights = differenceInCalendarDays(
      new Date(bookingData.checkOut),
      new Date(bookingData.checkIn)
    );
    if (bookingData.checkIn && bookingData.checkOut && numberOfNights > 0) {
      let costPerNight =
        Number(location?.details?.price) *
        Number(bookingData.guests) *
        numberOfNights;

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
  }, [bookingData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setBookingData((preVal) => ({ ...preVal, [id]: value }));
  }

  const isDisabled = totalCost.numberOfNights ? true : false;

  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const navigate = useNavigate();

  const handleBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    let body: reserveType = {
      checkOut: bookingData.checkOut,
      checkIn: bookingData.checkIn,
      locationId: Number(id),
      totalCost: totalCost.total,
    };
    dispatch(addNewReservation(body) as any);
    setBookingData({
      checkIn: '',
      checkOut: '',
      guests: '1',
    });
  };

  function handleSlideKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      handleRight();
    }
    if (e.key === 'ArrowLeft') {
      handleLeft();
    }
    if (e.key === 'Escape') {
      setIsExpanded(false);
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleSlideKeydown);

    return () => {
      window.removeEventListener('keydown', handleSlideKeydown);
    };
  }, [current, photosLength]);
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
            <div
              // onKeyDown={handleSlideKeydown}
              className={`fixed bottom-0 w-full bg-white left-0 transition-all duration-200 ease-in-out  pb-4 ${
                isExpanded ? 'h-full' : 'h-0'
              }`}
            >
              <div
                className='bg-white h-full flex justify-center items-center '
                onClick={() => setIsExpanded(false)}
              >
                <div className='max-w-5xl m-auto px-3 py-4   w-full'>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className='text-white text-2xl p-2 bg-custom-red rounded-full relative left-2 top-14 z-30 '
                  >
                    <Icon icon='mdi:close-thick' />
                  </button>
                  <div className='flex flex-col gap-2 mt-2 relative'>
                    <div className='absolute flex justify-between items-center  px-2 w-full h-full'>
                      <button
                        onClick={handleLeft}
                        className='text-white text-3xl p-1 bg-custom-red rounded-full'
                      >
                        <Icon icon='ph:arrow-left-bold' />
                      </button>
                      <button
                        onClick={handleRight}
                        className='text-white text-3xl p-1 bg-custom-red rounded-full'
                      >
                        <Icon icon='ph:arrow-right-bold' />
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
          <div className='flex flex-col'>
            <div className='mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]'>
              {/* ---DESCRIPTION--- */}

              <div>
                <h2 className='font-bold text-xl text-black'>Description</h2>
                <p>{location?.details?.description}</p>
              </div>
              {/* ---BOOKING--- */}
              <div className='shadow-customShadow p-6 rounded-md'>
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
                        className='font-bold uppercase text-xs'
                        htmlFor='check-in'
                      >
                        check-in
                      </label>
                      <input
                        onChange={handleChange}
                        className='text-xs outline-none'
                        id='checkIn'
                        type='date'
                        value={bookingData.checkIn}
                      />
                    </div>
                    <div className='flex flex-col flex-1 p-2'>
                      <label
                        className=' font-bold uppercase text-xs'
                        htmlFor='check-in'
                      >
                        checkout
                      </label>
                      <input
                        onChange={handleChange}
                        className='text-xs outline-none'
                        id='checkOut'
                        type='date'
                        value={bookingData.checkOut}
                      />
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
                      onChange={handleChange}
                      min={1}
                      className='border mx-2 text-base p-1 outline-none'
                      type='text'
                      id='guests'
                      value={
                        bookingData.guests > location?.details?.guests
                          ? location?.details?.guests
                          : bookingData.guests
                      }
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
                            <span> X {bookingData.guests} guest(s)</span>
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
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Location;
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
