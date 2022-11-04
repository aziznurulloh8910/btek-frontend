import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

YupPassword(Yup);

function ResetPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    code: Yup.number().min(6).required(),
    newPassword: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.resetPassword(values));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.email) {
      dispatch(authReset.handleReset());
      navigate('/login');
    }
  }, [store]);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h className="text-xl font-bold text-center">Reset Password</h>
              <p className="text-center">Enter code confirmation that we sent</p>
              <div className="form-control">
                <Formik
                  initialValues={{
                    email: '',
                    code: '',
                    newPassword: '',
                    confirmPassword: '',
                  }}
                  validationSchema={basicAuthSchema}
                  onSubmit={submitAction}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field type="text" name="code" className="input input-bordered w-full max-w-xs" placeholder="Confirmation code" />
                      <br />
                      {errors.code && touched.code ? (
                        <div className="text-red-400">{errors.code}</div>
                      ) : null}
                      <br />
                      <Field type="text" name="email" className="input input-bordered w-full max-w-xs" placeholder="Your email" />
                      <br />
                      {errors.email && touched.email ? (
                        <div className="text-red-400">{errors.email}</div>
                      ) : null}
                      <br />
                      <Field type="password" name="newPassword" className="input input-bordered w-full max-w-xs" placeholder="New password" />
                      <br />
                      {errors.newPassword && touched.newPassword ? (
                        <div className="text-red-400">{errors.newPassword}</div>
                      ) : null}
                      <br />
                      <Field type="password" name="confirmPassword" className="input input-bordered w-full max-w-xs" placeholder="Confirm password" />
                      <br />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="text-red-400">{errors.confirmPassword}</div>
                      ) : null}
                      <br />
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

export default ResetPassword;
