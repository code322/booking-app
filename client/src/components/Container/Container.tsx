type Props = {
  children?: JSX.Element | JSX.Element[];
  style?: string;
};
function Container({ children, style }: Props) {
  return (
    <section className={`max-w-6xl mr-auto ml-auto px-3 py-4 ${style}`}>
      {children}
    </section>
  );
}

export default Container;
