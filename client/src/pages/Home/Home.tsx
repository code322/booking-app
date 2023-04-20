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
import LocationsList from '../../components/Lists/LocationsList';

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

        {/* List of Locations */}
        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {allLocations?.map((locations) => {
            return <LocationsList locations={locations} />;
          })}
        </ul>
      </Container>
    </>
  );
}

export default Home;
