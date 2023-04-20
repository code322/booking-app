interface Props {
  children: JSX.Element;
  handleYes: React.MouseEventHandler<HTMLButtonElement>;
  handleNo: React.MouseEventHandler<HTMLButtonElement>;
  showModal: boolean;
}

const Modal = ({ children, handleYes, handleNo, showModal }: Props) => {
  return (
    <>
      {showModal && (
        <div className='max-w-sm fixed max-h-60 w-full z-20  h-64  translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] mr-2'>
          <div className='flex flex-col justify-between mx-3 h-full bg-white p-4 shadow-customShadow border rounded-md'>
            {children}
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
      )}
    </>
  );
};

export default Modal;
