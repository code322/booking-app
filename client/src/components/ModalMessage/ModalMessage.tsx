import { Icon } from '@iconify/react';

interface Props {
  modalInfo: {
    message: string;
    title: string;
    location: string;
  };
}
const ModalMessage = ({ modalInfo }: Props) => {
  return (
    <div>
      <div>
        <p className='text-center font-semibold'>{modalInfo.message}</p>
      </div>
      <div className='mt-6'>
        <div className='flex items-center gap-3 text-gray-700 text-base'>
          <Icon icon='ph:house-line' />
          <p>{modalInfo.title}</p>
        </div>
        <div className='flex items-center gap-3 text-gray-700 text-base'>
          <Icon icon='material-symbols:location-on-outline' />
          <p>{modalInfo.location}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
