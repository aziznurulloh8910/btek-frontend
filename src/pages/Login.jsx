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
    <div className="h-screen flex justify-center items-center">
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
            <Link to="/forgot-password">Forgot Password</Link>
            <br />
            <Link to="/register">Register</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
