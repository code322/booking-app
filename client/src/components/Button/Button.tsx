import React from 'react';
type Props = {
  title: string;
};
function Button({ title }: Props) {
  return (
    <button className='bg-custom-red text-white outline-none p-3 rounded-md border-none capitalize'>
      {title}
    </button>
  );
}

export default Button;
