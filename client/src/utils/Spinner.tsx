import ReactLoading from 'react-loading';

const Spinner = () => {
  return (
    <div className='flex  justify-center items-center h-screen w-full'>
      <ReactLoading type={'spin'} color='#000' />
    </div>
  );
};

export default Spinner;
