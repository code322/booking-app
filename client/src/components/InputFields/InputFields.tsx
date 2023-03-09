type Props = {
  placeholder: string;
  type: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputFields({ placeholder, type, name, value, handleChange }: Props) {
  return (
    <input
      className='p-3 border border-gray-200 text-base outline-none'
      type={'text' || type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
}

export default InputFields;
