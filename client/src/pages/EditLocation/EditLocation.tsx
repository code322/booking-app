import LocationForm from '../LocationForm/LocationForm';
import { useAppSelector } from '../../hooks/userTypeSelector';

import {
  selectLocationById,
  selectLocationByIdStatus,
} from '../../state/locations/locationByIdSlicer';

const EditLocation = () => {
  const location = useAppSelector(selectLocationById);

  const { details, utils, photos } = location;
  const status = useAppSelector(selectLocationByIdStatus);

  return (
    <>
      {status !== 'succeeded' ? (
        <div>loading...</div>
      ) : (
        <LocationForm
          detailsData={details}
          photosData={photos}
          utilsData={utils}
        />
      )}
    </>
  );
};

export default EditLocation;
