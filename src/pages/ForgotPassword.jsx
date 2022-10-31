/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import http from '../helpers/http';

function ForgotPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      await http().post('/auth/forgot-password', form.toString());
      navigate('/reset-password');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h className="text-xl font-bold text-center">Forgot Password</h>
              <p className="text-center">we will send a confirmation code to the email address entered</p>
              <div className="form-control">
                <Formik
                  initialValues={{
                    email: '',
                  }}
                  validationSchema={basicAuthSchema}
                  onSubmit={submitAction}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field className="input input-bordered w-full max-w-xs" type="email" name="email" placeholder="Email" />
                      <br />
                      {errors.email && touched.email ? (
                        <div className="text-red-400">{errors.email}</div>
                      ) : null}
                      <br />
                      <button type="submit" className="btn btn-primary block w-full">Send code</button>
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

export default ForgotPassword;
