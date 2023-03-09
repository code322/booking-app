import { useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
function LogIn() {
  type inputTypes = {
    email: string;
    password: string;
  };

  const [input, setInput] = useState<inputTypes>({
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

  function handleSubmit() {}

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
