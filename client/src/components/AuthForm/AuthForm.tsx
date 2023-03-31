import Container from '../Container/Container';
import InputFields from '../InputFields/InputFields';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { validateEmail, validPassword } from '../../helpers/validateForm';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import {
  authStatusSelector,
  clearError,
  errorSelector,
} from '../../state/authSlicer/authSlicer';

type Props = {
  page: string;
  children?: JSX.Element;
  email: string;
  password: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
};
const AuthForm = (props: Props) => {
  const { page, children, email, password, handleChange, handleSubmit } = props;
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isValidPassword, setIsValidPassword] = useState<boolean>();

  const dispatch = useAppDispatch();
  const selectError = useAppSelector(errorSelector);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsValidEmail(() => validateEmail(email));
    setIsValidPassword(() => validPassword(password));
    if (selectError !== null) {
      dispatch(clearError() as any);
    }
  }, [email, password, pathname]);

  const isDisabled = isValidEmail && isValidPassword;

  return (
    <Container>
      <div className='flex flex-col justify-center w-full items-center h-[calc(100vh-5rem)]'>
        <h1 className='text-2xl mb-5 font-bold capitalize'>{page}</h1>
        <form className='flex flex-wrap w-full flex-col gap-3 max-w-xs'>
          {children}
          <div className='flex flex-col relative mb-4'>
            <InputFields
              name={'email'}
              value={email}
              placeholder='E-mail'
              type='text'
              handleChange={handleChange}
            />
            {isValidEmail === false && (
              <small className='absolute -bottom-4'>
                Please enter a valid email
              </small>
            )}
          </div>
          <div className='flex flex-col relative mb-4'>
            <InputFields
              name={'password'}
              value={password}
              placeholder='Password'
              type='password'
              handleChange={handleChange}
            />
            {isValidPassword === false && (
              <small className='absolute -bottom-4'>
                Please enter valid password
              </small>
            )}
          </div>

          <Button
            isDisabled={!isDisabled}
            handleSubmit={handleSubmit}
            title={page}
          />
          {selectError &&
            (page === 'login' ? (
              <small className='relative -mt-3 text-center'>
                Invalid email or password.
              </small>
            ) : (
              <small className='relative -mt-3 text-center'>
                {selectError}
              </small>
            ))}
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
