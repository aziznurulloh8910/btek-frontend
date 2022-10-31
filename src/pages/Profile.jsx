import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import http from '../helpers/http';

import * as profileAction from '../redux/asyncActions/profile';

function Profile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.user);
  // const [userProfile, setUserProfile] = React.useState({});
  // const getProfile = async () => {
  //   const token = window.localStorage.getItem('token');
  //   const { data } = await http(token).get('/profile');
  //   setUserProfile(data.results);
  // };

  React.useEffect(() => {
    // getProfile();
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);
  return (
    <div>
      {userProfile?.picture && <img style={{ width: '240px', height: '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.picture} />}
      <div>
        Full Name :
        {' '}
        {userProfile?.fullName}
      </div>
      <div>
        Birth Date :
        {' '}
        {userProfile?.birthDate}
      </div>
      <div>
        Picture :
        {' '}
        {userProfile?.picture}
      </div>
      <div>
        <Link to="/profile/edit">Edit Profile</Link>
      </div>
    </div>
  );
}

export default Profile;
