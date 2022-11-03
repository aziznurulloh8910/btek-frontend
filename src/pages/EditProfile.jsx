/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import * as profileAction from '../redux/asyncActions/profile';

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
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h className="text-xl font-bold text-center">Edit profile</h>
              <div className="form-control">
                <div className="flex justify-center items-center border-2 border-slate-500 rounded-xl py-2 my-2">
                  {userProfile?.picture && <img style={{ width: '240px', height: '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.picture} />}
                </div>
                <Formik
                  initialValues={{
                    fullName: '',
                    birthDate: '',
                  }}
                  validationSchema={editProfileSchema}
                  onSubmit={submitAction}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <label htmlFor="email">Full name</label>
                      <Field type="text" name="fullName" className="input input-bordered w-full max-w-xs mb-2" placeholder="Full name" />
                      {errors.fullName && touched.fullName ? (
                        <div className="text-red-400">{errors.fullName}</div>
                      ) : null}
                      <label htmlFor="picture">Picture</label>
                      <input type="file" onChange={(e) => setFile(e.target.files[0])} name="picture" className="file-input file-input-bordered w-full max-w-xs mb-2" />
                      {errors.picture && touched.picture ? (
                        <div className="text-red-400">{errors.picture}</div>
                      ) : null}
                      <label htmlFor="birtDate">Birth date</label>
                      <Field type="text" name="birthDate" className="input input-bordered w-full max-w-xs mb-5" placeholder="Birth date" />
                      {errors.birthDate && touched.birthDate ? (
                        <div className="text-red-400">{errors.birthDate}</div>
                      ) : null}
                      <button type="submit" className="btn btn-primary block w-full">save changes</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
