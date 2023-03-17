type Props = {
  placeholder?: string;
  type?: string;
  name: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

function InputFields({
  placeholder,
  type,
  name,
  value,
  handleChange,
  defaultValue,
}: Props) {
  return (
    <input
      className='p-3 border border-gray-200 text-base outline-none'
      type={type || 'text'}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
      defaultValue={defaultValue}
    />
  );
}

export default InputFields;
