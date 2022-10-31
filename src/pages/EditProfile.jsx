import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import * as profileAction from '../redux/asyncActions/profile';
// import http from '../helpers/http';

YupPassword(Yup);

function EditProfile() {
  const navigate = useNavigate();

  const editProfileSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    birthDate: Yup.string().required(),
    picture: Yup.mixed().nullable(),
  });

  const userProfile = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();

  // const [userProfile, setUserProfile] = React.useState({});
  // const getProfile = async () => {
  //   const token = window.localStorage.getItem('token');
  //   const { data } = await http(token).get('/profile');
  //   setUserProfile(data.results);
  // };

  // const [file, setFile] = React.useState(null);
  // const submitAction = async (values) => {
  //   const token = window.localStorage.getItem('token');
  //   const form = new FormData();
  //   form.append('fullName', values.fullName);
  //   form.append('birthDate', values.birthDate);
  //   form.append('picture', file);
  //   const { data } = await http(token).put('/profile', form, {
  //     headers: {
  //       'Content-Type': 'multypart/form-data',
  //     },
  //   });
  //   setUserProfile(data.results);
  //   navigate('/profile');
  // };

  const [file, setFile] = React.useState(null);
  const submitAction = (e) => {
    const token = window.localStorage.getItem('token');
    const data = {
      fullName: e.fullName,
      birthDate: e.birthDate,
      picture: file,
    };

    dispatch(profileAction.editData({ token, data }));
    navigate('/profile');
  };

  React.useEffect(() => {
    // getProfile();
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);

  return (
    <>
      {userProfile?.picture && <img style={{ width: '240px', height: '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.picture} />}
      <Formik
        initialValues={{
          fullName: userProfile?.fullName,
          birthDate: userProfile?.birthDate,
        }}
        validationSchema={editProfileSchema}
        onSubmit={submitAction}
      >
        {({ errors, touched }) => (
          <Form>
            <Field type="text" name="fullName" />
            <br />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} name="picture" />
            <br />
            {errors.picture && touched.picture ? (
              <div>{errors.picture}</div>
            ) : null}
            <br />
            <Field type="text" name="birthDate" />
            <br />
            {errors.birthDate && touched.birthDate ? (
              <div>{errors.birthDate}</div>
            ) : null}
            <br />
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditProfile;
