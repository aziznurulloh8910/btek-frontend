import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const submitAction = (e) => {
    e.preventDefault();
    if (e.target.email.value === 'admin@mail.com' && e.target.password.value === '1234') {
      window.localStorage.setItem('token', 'some token');
      window.alert('Login success');
      navigate('/');
    } else {
      window.alert('Wrong email or password');
    }
  };
  return (
    <form onSubmit={submitAction}>
      <input type="email" name="email" />
      <br />
      <input type="password" name="password" />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
