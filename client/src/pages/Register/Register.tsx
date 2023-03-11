import { useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import InputFields from '../../components/InputFields/InputFields';
import { useAppDispatch, useAppSelector } from '../../hooks/userTypeSelector';
import { register, userSelector } from '../../state/authSlicer/authSlicer';

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
  const state = useAppSelector(userSelector);
  console.log(state);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(register(input) as any);
  }

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
