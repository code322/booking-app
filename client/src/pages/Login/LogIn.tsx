import { useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import { login } from '../../state/authSlicer/authSlicer';
import { useAppDispatch } from '../../hooks/userTypeSelector';
export type loginTypes = {
  email: string;
  password: string;
};
function LogIn() {
  const dispatch = useAppDispatch();

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
