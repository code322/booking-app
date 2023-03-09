import { useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import InputFields from '../../components/InputFields/InputFields';
const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <>
      <AuthForm email={email} password={password} page='register'>
        <InputFields value={name} name='name' placeholder='Name' type='text' />
      </AuthForm>
    </>
  );
};

export default Register;
