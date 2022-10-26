/* eslint-disable no-alert */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const register = async (e) => {
    try {
      e.preventDefault();
      navigate('/login');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={register}>
      Email :
      <br />
      <input type="email" name="email" />
      <br />
      Password :
      <br />
      <input type="password" name="password" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
