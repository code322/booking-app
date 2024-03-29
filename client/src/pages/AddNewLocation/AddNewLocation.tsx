import { useState } from 'react';
import { useAppSelector } from '../../hooks/useTypeSelector';
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
  const [photos, setPhotos] = useState([]);
  const [utils, setUtils] = useState<utilsTypes>(initialUtils);
  const [details, setDetails] = useState<detailsTypes>(initialDetails);
  return (
    <Container>
      <div className='flex gap-6 flex-col sm:flex-row'>
        <Account />
        <LocationForm
          id={0}
          photosData={photos}
          detailsData={details}
          utilsData={utils}
        />
      </div>
    </Container>
  );
};

export default AddNewLocation;
