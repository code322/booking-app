import { useEffect, useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import { authStatusSelector, login } from '../../state/authSlicer/authSlicer';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import { Navigate } from 'react-router-dom';
import { IsLoggedLocalStorage } from '../../utils/auth';
export type loginTypes = {
  email: string;
  password: string;
};
function LogIn() {
  const dispatch = useAppDispatch();
  // const [isAuth, setIsAuth]= useState

  const [input, setInput] = useState<loginTypes>({
    email: '',
    password: '',
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

  const authStatus = useAppSelector(authStatusSelector);
  const isLoggedIn = IsLoggedLocalStorage.getIsLoggedIn();

  if (authStatus === 'succeeded' && isLoggedIn) {
    return <Navigate to={'/'} />;
  }

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
