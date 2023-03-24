type Props = {
  children?: JSX.Element | JSX.Element[];
};
function Container({ children }: Props) {
  return <section className='max-w-6xl m-auto px-3 py-4 '>{children}</section>;
}

export default Container;
