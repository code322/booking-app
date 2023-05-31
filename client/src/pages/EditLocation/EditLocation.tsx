import { useEffect } from 'react';
import LocationForm from '../LocationForm/LocationForm';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';

import {
  getLocationById,
  selectLocationById,
  selectLocationByIdStatus,
} from '../../state/locations/locationByIdSlicer';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Spinner from '../../utils/Spinner';

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
        <Spinner />
      ) : (
        <LocationForm
          detailsData={details}
          photosData={photos}
          utilsData={utils}
          editMode={true}
          id={locationId}
        />
      )}
    </Container>
  );
};

export default EditLocation;
