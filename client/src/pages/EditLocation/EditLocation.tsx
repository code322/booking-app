import { useEffect } from 'react';
import LocationForm from '../LocationForm/LocationForm';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';

import {
  getLocationById,
  selectLocationById,
  selectLocationByIdStatus,
} from '../../state/locations/locationByIdSlicer';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';

const EditLocation = () => {
  const { id } = useParams();
  let locationId = Number(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLocationById(locationId) as any);
  }, [locationId, dispatch]);
  const location = useAppSelector(selectLocationById);

  const { details, utils, photos } = location;
  const status = useAppSelector(selectLocationByIdStatus);

  return (
    <Container>
      {status !== 'succeeded' ? (
        <div>loading...</div>
      ) : (
        <LocationForm
          detailsData={details}
          photosData={photos}
          utilsData={utils}
          editMode={true}
        />
      )}
    </Container>
  );
};

export default EditLocation;
