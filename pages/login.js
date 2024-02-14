import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      router.push('/user-home');
    } else {
      setLoginError(true);
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      {loginError && <p>Login failed. Please try again.</p>}
    </div>
  );
};

export default Login;