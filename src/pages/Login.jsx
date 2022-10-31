/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http';

YupPassword(Yup);

function Login() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      const { data } = await http().post('/auth/login', form.toString());
      window.localStorage.setItem('token', data.results.token);
      navigate('/');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  validationSchema={basicAuthSchema}
                  onSubmit={submitAction}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <label htmlFor="email">Email</label>
                      <Field className="input input-bordered w-full max-w-xs" type="email" name="email" placeholder="Email" />
                      <br />
                      {errors.email && touched.email ? (
                        <div className="text-red-400">{errors.email}</div>
                      ) : null}
                      <br />
                      <label htmlFor="password">Password</label>
                      <Field className="input input-bordered w-full max-w-xs" type="password" name="password" placeholder="Password" />
                      <br />
                      {errors.password && touched.password ? (
                        <div className="text-red-400">{errors.password}</div>
                      ) : null}
                      <br />
                      <button className="btn btn-primary block w-full" type="submit">Login</button>
                      <Link className="link text-sm hover:text-primary" to="/forgot-password">Forgot Password?</Link>
                      <br />
                      <p>
                        If you dont have account, please <Link className="link text-sm hover:text-primary" to="/register">Register</Link>
                      </p>
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

export default Login;
