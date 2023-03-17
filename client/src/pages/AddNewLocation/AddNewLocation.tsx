import { useAppSelector } from '../../hooks/userTypeSelector';
import { selectUploadedPhotos } from '../../state/locations/upLoadPhotosSlicer';
import LocationForm from '../LocationForm/LocationForm';

const AddNewLocation = () => {
  const addedPhotos = useAppSelector(selectUploadedPhotos);
  return <LocationForm photosData={addedPhotos} />;
};

export default AddNewLocation;
