import LocationForm from '../LocationForm/LocationForm';
import { useAppSelector } from '../../hooks/userTypeSelector';

import {
  selectLocationById,
  selectLocationByIdStatus,
} from '../../state/locations/locationByIdSlicer';
import {} from '../../helpers/types';
interface Props {
  id: number;
}

const EditLocation = ({ id }: Props) => {
  const location = useAppSelector(selectLocationById);

  const {
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    guests,
    utils,
    photos,
  } = location;
  const detailsData = {
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    guests,
  };
  const status = useAppSelector(selectLocationByIdStatus);

  return (
    <>
      {status !== 'succeeded' ? (
        <div>loading...</div>
      ) : (
        <LocationForm
          detailsData={detailsData}
          photosData={photos}
          utilsData={utils}
        />
      )}
    </>
  );
};

export default EditLocation;
