import { useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import InputFields from '../../components/InputFields/InputFields';
const Register = () => {
  type inputTypes = {
    name: string;
    email: string;
    password: string;
  };
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

  return (
    <>
      <AuthForm
        handleChange={handleChange}
        email={input.email}
        password={input.password}
        page='register'
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
