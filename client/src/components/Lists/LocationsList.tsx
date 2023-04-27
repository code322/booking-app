import { locationType } from '../../state/locations/locationsSlicer';
import { Link } from 'react-router-dom';
import { API_URL } from '../../helpers/api';
import { Icon } from '@iconify/react';
import { reservationType } from '../../state/reservation/reservation';

type Location = reservationType | locationType;
interface Props {
  locations: Location;
  children?: JSX.Element;
}
const LocationsList = ({ locations, children }: Props) => {
  let price = Number(locations?.details?.price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  const link =
    'locationId' in locations ? locations?.locationId : locations?.id;

  return (
    <li key={locations?.id}>
      <div className='relative'>
        <Link to={`/location/${link}`}>
          <img
            className='bg-blue-200 aspect-square object-cover rounded-lg w-full h-full'
            src={`${API_URL}/uploads/${locations?.photos?.[0]}`}
            alt='no_image'
          />
          <div className='absolute bg-gradient-to-b from-transparent to-gray-700 opacity-60 h-full w-full top-0 left-0 rounded-lg'></div>
          <div className='absolute bottom-2 text-white left-1'>
            <span className=' text-white text-xl font-semibold '>{price}</span>
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
      {children}
    </li>
  );
};

export default LocationsList;
