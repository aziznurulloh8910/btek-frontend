import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Home() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>
      Home &middot;
      <br />
      <Link to="/profile">Profile</Link>
      <br />
      <Link to="/profile/edit">Edit Profile</Link>
      <br />
      <button type="button" onClick={logout}>Logout</button>
      <Button>OK</Button>
    </div>
  );
}

export default Home;
