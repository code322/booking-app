import { useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
function LogIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return <AuthForm email={email} password={password} page='login' />;
}

export default LogIn;
