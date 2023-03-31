import React from 'react';
type Props = {
  title: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
  isDisabled?: boolean;
};
function Button({ title, handleSubmit, isDisabled }: Props) {
  return (
    <button
      disabled={isDisabled}
      onClick={handleSubmit}
      className='bg-custom-red text-white outline-none p-3 rounded-md border-none capitalize'
    >
      {title}
    </button>
  );
}

export default Button;
