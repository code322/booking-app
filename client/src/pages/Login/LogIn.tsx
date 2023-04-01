import { useEffect, useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import {
  authStatusSelector,
  isLoggedInSelector,
  login,
} from '../../state/authSlicer/authSlicer';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
export type loginTypes = {
  email: string;
  password: string;
};
function LogIn() {
  const dispatch = useAppDispatch();
  // const [isAuth, setIsAuth]= useState

  const [input, setInput] = useState<loginTypes>({
    email: 'user@mail.com',
    password: 'password',
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(login(input) as any);
  }
  const location = useLocation();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      email={input.email}
      password={input.password}
      page='login'
    />
  );
}

export default LogIn;
