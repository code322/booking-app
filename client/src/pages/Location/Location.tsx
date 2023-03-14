import { Link, useParams } from 'react-router-dom';

import NewLocation from '../NewLocation/NewLocation';

function Places() {
  const { subpages } = useParams();

  return (
    <div className='m-4'>
      {subpages === 'new' && <NewLocation />}
      <div>
        <Link
          className='bg-custom-red py-2 px-3 text-white rounded-md capitalize text-sm'
          to={'/account/places/new'}
        >
          {' '}
          + add new location
        </Link>
      </div>
    </div>
  );
}

export default Places;
