import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';
import dummyData from '../../dummyData';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import {
  getAllLocations,
  selectLocations,
} from '../../state/locations/locationsSlicer';
import { API_URL } from '../../helpers/api';
import { getLocationById } from '../../state/locations/locationByIdSlicer';
import Account from '../Account/Account';
import { Icon } from '@iconify/react';
interface Props {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setListId: React.Dispatch<React.SetStateAction<number>>;
}

function Locations() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllLocations() as any);
  }, [dispatch]);

  const locationsList = useAppSelector(selectLocations);
  const navigate = useNavigate();

  return (
    <Container>
      <div className='flex flex-col sm:flex-row gap-6'>
        <Account />
        <ul className='flex flex-col gap-4 flex-1'>
          {locationsList &&
            locationsList.map((items, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {}}
                  className='flex gap-4  justify-between shadow-customShadow rounded-lg p-2 overflow-hidden'
                >
                  <div className='flex gap-4 '>
                    {items.photos.length > 0 && (
                      <Link to={`/location/${items?.id}`}>
                        <img
                          className='w-32 h-32 rounded-md'
                          src={`${API_URL}/uploads/${items.photos[0]}`}
                          alt=''
                        />
                      </Link>
                    )}
                    <div className='flex flex-col justify-between'>
                      <div>
                        <p className=' font-semibold capitalize'>
                          {items.details?.title}
                        </p>
                        <p className='text-gray-600'>
                          {items?.details?.address}
                        </p>
                      </div>
                      <div className='flex items-end gap-2 text-gray-600'>
                        <Icon icon='material-symbols:bed-outline' />
                        <p className='text-xs text-gray-600'>
                          {items?.details?.guests}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <button
                      className='bg-gray-200 w-fit h-fit p-2 rounded-md outline-none'
                      onClick={() =>
                        navigate(`/account/edit-listing-location/${items?.id}`)
                      }
                    >
                      <Icon
                        className='text-gray-600'
                        icon='material-symbols:edit'
                      />
                    </button>
                    <button className='bg-gray-200 w-fit h-fit p-2 rounded-md outline-none'>
                      <Icon
                        className='text-gray-600'
                        icon='ic:baseline-delete'
                      />
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </Container>
  );
}

export default Locations;
