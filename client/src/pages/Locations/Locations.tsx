import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import dummyData from '../../dummyData';
interface Props {
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}

function Locations({ setShowList }: Props) {
  console.log(dummyData);
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
        <div className='mt-4'>
          {dummyData.map((items) => (
            <Link
              to={'/account/locations/new/' + items.id}
              className='flex gap-4'
            >
              {items.photos.length > 0 && (
                <img
                  className='w-32 h-32  grow shrink-0'
                  src={items.photos[0]}
                  alt=''
                />
              )}
              <div className='shrink'>
                <p className=' font-semibold capitalize'>{items.title}</p>
                <p>{items.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Locations;
