type Props = {
  children?: JSX.Element | JSX.Element[];
};
function Container({ children }: Props) {
  return (
    <section className='max-w-6xl mr-auto ml-auto px-3 py-4 min-h-[calc(100vh_-_3.5rem)]'>
      {children}
    </section>
  );
}

export default Container;
