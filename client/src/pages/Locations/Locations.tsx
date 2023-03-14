import { Link, useParams } from 'react-router-dom';

import NewLocation from '../NewLocation/NewLocation';
import Container from '../../components/Container/Container';
import Account from '../Account/Account';
interface Props {
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}
function Locations({ setShowList }: Props) {
  return (
    <Container>
      <div className='mt-4'>
        <div>
          <button
            onClick={() => setShowList((preVal) => !preVal)}
            className='bg-custom-red py-2 px-3 text-white rounded-md capitalize text-sm'
          >
            {' '}
            + add new location
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Locations;
