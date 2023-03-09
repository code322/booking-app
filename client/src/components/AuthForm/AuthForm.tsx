import Container from '../Container/Container';
import InputFields from '../InputFields/InputFields';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

type Props = {
  page: string;
};
const AuthForm = (props: Props) => {
  const { page } = props;
  return (
    <Container>
      <div className='flex flex-col justify-center w-full items-center h-[calc(100vh-5rem)]'>
        <h1 className='text-2xl mb-5 font-bold capitalize'>{page}</h1>
        <form className='flex flex-wrap w-full flex-col gap-3 max-w-xs'>
          <InputFields placeholder='E-mail' type='text' />
          <InputFields placeholder='Password' type='password' />
          <Button title={page} />
        </form>
        {page === 'login' ? (
          <Message page='login' message="Don't have an account yet?" />
        ) : (
          <Message page='register' message='Already have an account?' />
        )}
      </div>
    </Container>
  );
};

export default AuthForm;

type messageProps = {
  page: string;
  message: string;
};

function Message({ message, page }: messageProps) {
  let linkTo: string = page === 'login' ? 'register' : 'login';

  return (
    <small>
      <span>{message}</span>{' '}
      <Link
        to={`/${linkTo}`}
        className='underline mt-5 decoration-custom-red decoration-2 underline-offset-4 font-semibold capitalize'
      >
        {linkTo}
      </Link>
    </small>
  );
}
