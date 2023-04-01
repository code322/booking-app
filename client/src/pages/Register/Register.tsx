import { useEffect, useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import InputFields from '../../components/InputFields/InputFields';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import {
  isLoggedInSelector,
  register,
} from '../../state/authSlicer/authSlicer';
import { useNavigate } from 'react-router-dom';

export type inputTypes = {
  name: string;
  email: string;
  password: string;
};
const Register = () => {
  const [input, setInput] = useState<inputTypes>({
    name: '',
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
  const dispatch = useAppDispatch();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(register(input) as any);
  }
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [navigate, isLoggedIn]);

  return (
    <>
      <AuthForm
        handleChange={handleChange}
        email={input.email}
        password={input.password}
        page='register'
        handleSubmit={handleSubmit}
      >
        <InputFields
          handleChange={handleChange}
          value={input.name}
          name='name'
          placeholder='Name'
          type='text'
        />
      </AuthForm>
    </>
  );
};

export default Register;
