import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import dummyData from '../../dummyData';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import {
  getAllLocations,
  selectLocations,
} from '../../state/locations/locationsSlicer';
import { API_URL } from '../../helpers/api';
import { getLocationById } from '../../state/locations/locationByIdSlicer';
interface Props {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setListId: React.Dispatch<React.SetStateAction<number>>;
}

function Locations({ setShowForm, setEditMode, setListId }: Props) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllLocations() as any);
  }, [dispatch]);

  const locationsList = useAppSelector(selectLocations);

  return (
    <Container>
      <div className='mt-4'>
        <div>
          <button
            onClick={() => setShowForm((preVal) => !preVal)}
            className='bg-custom-red py-2 px-3 text-white rounded-md capitalize text-sm'
          >
            {' '}
            + add new location
          </button>
        </div>
        <div className='mt-4 flex flex-col gap-4'>
          {locationsList &&
            locationsList.map((items, index) => {
              console.log(items.photos);
              return (
                <span
                  key={index}
                  onClick={() => {
                    setShowForm(true);
                    setEditMode(true);
                    dispatch(getLocationById(items.id) as any);
                    setListId(items.id);
                  }}
                  className='flex gap-4 cursor-pointer'
                >
                  {items.photos.length > 0 && (
                    <img
                      className='w-32 h-32 '
                      src={`${API_URL}/uploads/${items.photos[0]}`}
                      alt=''
                    />
                  )}
                  <div className='shrink'>
                    <p className=' font-semibold capitalize'>
                      {items.details?.title}
                    </p>
                    <p>{items.details?.description}</p>
                  </div>
                </span>
              );
            })}
        </div>
      </div>
    </Container>
  );
}

export default Locations;
