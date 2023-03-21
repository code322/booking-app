import { useState } from 'react';
import { useAppSelector } from '../../hooks/userTypeSelector';
import { selectUploadedPhotos } from '../../state/locations/upLoadPhotosSlicer';
import LocationForm from '../LocationForm/LocationForm';
import {
  detailsTypes,
  initialDetails,
  initialUtils,
  utilsTypes,
} from '../../helpers/types';
import Account from '../Account/Account';
import Container from '../../components/Container/Container';

const AddNewLocation = () => {
  const addedPhotos = useAppSelector(selectUploadedPhotos);
  const [utils, setUtils] = useState<utilsTypes>(initialUtils);
  const [details, setDetails] = useState<detailsTypes>(initialDetails);
  return (
    <Container>
      <div className='flex gap-6 flex-col sm:flex-row'>
        <Account />
        <LocationForm
          photosData={addedPhotos}
          detailsData={details}
          utilsData={utils}
        />
      </div>
    </Container>
  );
};

export default AddNewLocation;
