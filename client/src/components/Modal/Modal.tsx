import { Icon } from '@iconify/react';

interface Props {
  title: string;
  location: string;
  message: string;
  handleYes: React.MouseEventHandler<HTMLButtonElement>;
  handleNo: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ message, title, location, handleYes, handleNo }: Props) => {
  return (
    <div className='max-w-sm fixed max-h-60 w-full z-20  h-64  translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] mr-2'>
      <div className='flex flex-col justify-between mx-3 h-full bg-white p-4 shadow-customShadow border rounded-md'>
        <div>
          <div>
            <p className='text-center font-semibold'>{message}</p>
          </div>
          <div className='mt-6'>
            <div className='flex items-center gap-3 text-gray-700 text-base'>
              <Icon icon='ph:house-line' />
              <p>{title}</p>
            </div>
            <div className='flex items-center gap-3 text-gray-700 text-base'>
              <Icon icon='material-symbols:location-on-outline' />
              <p>{location}</p>
            </div>
          </div>
        </div>
        <div className='flex justify-between gap-3 '>
          <button
            className=' border w-full rounded-md py-2 outline-none bg-custom-red text-white'
            onClick={handleYes}
          >
            YES
          </button>
          <button
            className=' border w-full rounded-md py-2 outline-none'
            onClick={handleNo}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
