import React from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../helpers/http';

function Login() {
  const navigate = useNavigate();
  const submitAction = async (e) => {
    try {
      e.preventDefault();
      const form = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const encoded = new URLSearchParams(form);
      const { data } = await http().post('/auth/login', encoded.toString());
      window.localStorage.setItem('token', data.results.token);
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
    // if (e.target.email.value === 'admin@mail.com' && e.target.password.value === '1234') {
    //   window.localStorage.setItem('token', 'some token');
    //   window.alert('Login success');
    //   navigate('/');
    // } else {
    //   window.alert('Wrong email or password');
    // }
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
