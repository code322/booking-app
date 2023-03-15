import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import dummyData from '../../dummyData';
interface Props {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setListId: React.Dispatch<React.SetStateAction<number>>;
}

function Locations({ setShowForm, setEditMode, setListId }: Props) {
  return (
    <Container>
      <div className='mt-4'>
        <div>
          <button
            onClick={() => setShowForm((preVal) => !preVal)}
            className='bg-custom-red py-2 px-3 text-white rounded-md capitalize text-sm'
          >
            {' '}
            + add new location
          </button>
        </div>
        <div className='mt-4 flex flex-col gap-4'>
          {dummyData().map((items) => (
            <span
              onClick={() => {
                setShowForm(true);
                setEditMode(true);
                setListId(items.id);
              }}
              className='flex gap-4 cursor-pointer'
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
            </span>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Locations;
