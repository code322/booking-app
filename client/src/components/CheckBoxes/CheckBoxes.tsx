import { Icon } from '@iconify/react';
type checkBoxType = {
  label: string;
  icon: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  handleBoxes: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({
  label,
  icon,
  value,
  checked,
  handleBoxes,
}: checkBoxType) => (
  <>
    <label
      className='capitalize text-sm cursor-pointer flex gap-2 items-center
      border p-2 rounded-md'
      htmlFor={label}
    >
      <input
        id={label}
        type='checkbox'
        value={value}
        onChange={handleBoxes}
        checked={checked}
      />
      <Icon className='text-gray-400' icon={icon} />
      {label}
    </label>
  </>
);

export default CheckBox;
