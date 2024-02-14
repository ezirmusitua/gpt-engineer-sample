import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/user-home');
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
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