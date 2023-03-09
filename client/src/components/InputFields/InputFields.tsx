type Props = {
  placeholder: string;
  type: string;
};

function InputFields({ placeholder, type }: Props) {
  return (
    <input
      className='p-3 border border-gray-200 text-base outline-none'
      type={'text' || type}
      placeholder={placeholder}
    />
  );
}

export default InputFields;
