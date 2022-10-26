import React from 'react';
import http from '../helpers/http';

function Profile() {
  const [userProfile, setUserProfile] = React.useState({});
  const getProfile = async () => {
    const token = window.localStorage.getItem('token');
    const { data } = await http(token).get('/profile');
    setUserProfile(data.results);
  };

  React.useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
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
    </div>
  );
}

export default Profile;