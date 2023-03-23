import Container from '../../components/Container/Container';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import {
  getAllLocations,
  selectLocations,
} from '../../state/locations/locationsSlicer';
import { API_URL } from '../../helpers/api';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllLocations() as any);
  }, [dispatch]);

  const allLocations = useAppSelector(selectLocations);
  // console.log(allLocations);

  return (
    <Container>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {allLocations &&
          allLocations.map((locations) => {
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
              <div key={locations?.id}>
                <div className='relative'>
                  <Link to={`/location/${locations?.id}`}>
                    <img
                      className='bg-blue-200 aspect-square object-cover rounded-lg'
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
                    <h2 className='text-gray-600 capitalize text-sm'>
                      {locations?.details?.address}
                    </h2>
                  </div>
                  <div className='flex items-center justify-start'>
                    <Icon
                      className='text-gray-600 mr-1 text-lg'
                      icon='mdi:bed-double-outline'
                    />
                    <h2 className='text-gray-600 text-sm'>
                      {locations?.details?.guests}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Container>
  );
}

export default Home;
