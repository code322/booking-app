import { Icon } from '@iconify/react';
type checkBoxType = {
  label: string;
  icon: string;
  value?: string;
  handleBoxes: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({ label, icon, value, handleBoxes }: checkBoxType) => (
  <>
    <label
      className='capitalize text-sm cursor-pointer flex gap-2 items-center
      border p-2 rounded-md'
      htmlFor={label}
    >
      <input id={label} type='checkbox' value={value} onChange={handleBoxes} />
      <Icon className='text-gray-400' icon={icon} />
      {label}
    </label>
  </>
);

export default CheckBox;
