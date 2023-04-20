import Container from '../../components/Container/Container';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import {
  getAllLocations,
  selectLocations,
} from '../../state/locations/locationsSlicer';
import { API_URL } from '../../helpers/api';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import FilterForm from '../FilterForm/FilterForm';

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllLocations() as any);
  }, [dispatch]);

  const allLocations = useAppSelector(selectLocations);

  return (
    <>
      <div className='md:min-h-[calc(100vh_-_5rem)]  mb-10 md:mt-0  flex items-center'>
        <div className=' max-w-6xl px-4 m-auto relative flex md:flex-col flex-col-reverse'>
          <div className='flex flex-col sm:flex-row gap-8 md:gap-4 sm:py-8 sm:items-center'>
            <div className='flex-1'>
              <h2 className='font-semibold text-5xl mb-6 leading-[46px] md:text-6xl'>
                Travel, book & experience!
              </h2>
              <p className='text-gray-600 mb-2 md:text-lg md:max-w-[400px]'>
                Accompanied by us, make the memories you have always wanted!
                Book your dream resorts, villas, hotels and more...
              </p>
              <a
                className='bg-custom-red hover:shadow-md px-4 py-2 md:py-3 text-white rounded-3xl w-fit  mb-3 mt-6 md:mt-12  transition-all duration-300 ease-in-out font-bold flex items-center gap-2'
                href='##'
              >
                <Icon icon='material-symbols:call' className='text-2xl' />
                1-800-123-1234
              </a>
            </div>
            <div className='py-0 flex-1'>
              <img src='/assets/hero-right.webp' alt='' />
            </div>
          </div>

          {/* Filter  */}
          <>
            <FilterForm />
          </>
        </div>
      </div>
      <Container>
        <div className='my-6'>
          <h2 className='font-bold capitalize text-3xl md:text-4xl'>
            Our Best Locations
          </h2>
          <p className='text-gray-600 text-base'>
            Plenty of locations to assure your relaxation and conformability.
          </p>
        </div>
        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {allLocations?.map((locations) => {
            let price = Number(locations?.details?.price).toLocaleString(
              'en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            );

            return (
              <li key={locations?.id}>
                <div className='relative'>
                  <Link to={`/location/${locations?.id}`}>
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
                  <h2 className='font-semibold text-base capitalize text-gray-700 '>
                    {locations?.details?.title}
                  </h2>
                  <div className='flex items-center justify-start'>
                    <Icon
                      className='text-gray-600 mr-1 text-sm'
                      icon='material-symbols:location-on-outline'
                    />
                    <h2 className='text-gray-600 capitalize text-xs '>
                      {locations?.details?.address}
                    </h2>
                  </div>
                  <div className='flex items-center justify-start'>
                    <Icon
                      className='text-gray-600 mr-1 text-lg'
                      icon='mdi:bed-double-outline'
                    />
                    <h2 className='text-gray-600 text-xs '>
                      {locations?.details?.guests}
                    </h2>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}

export default Home;
