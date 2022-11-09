/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import http from '../helpers/http';

import * as profileAction from '../redux/asyncActions/profile';
import * as profileReducerAction from '../redux/reducers/profile';

function Profile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.user);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Your Profile</h1>
          <div className="flex justify-center items-center">
            {userProfile?.picture && <img style={{ width: '50%', height: '50%' }} src={`${userProfile?.picture}`} alt={userProfile?.picture} />}
          </div>
          <p className="py-6">
            Hallo, {userProfile?.fullName}. Your birtdate is {userProfile?.birthDate}
          </p>
          <button type="button" className="btn btn-primary mx-1 btn-outline">
            <Link to="/">Back</Link>
          </button>
          <button type="button" className="btn btn-primary mx-1">
            <Link to="/profile/edit">Edit Profile</Link>
          </button>
          <button type="button" className="btn btn-primary mx-1 btn-outline" onClick={() => dispatch(profileReducerAction.resetProfile())}>Reset data redux</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
