import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { emailPattern, passwordPattern } from '../../utils/constants';
import { setUser } from '../../services/slices/userDataSlice';
import { IUserWithAccessToken } from '../../utils/types';
import { useAppDispatch } from '../../hooks/hooks';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const { user } = userCredential;
        const { accessToken } = user as IUserWithAccessToken;

        dispatch(setUser({ email: user.email, id: user.uid, token: accessToken }));
        toast.success('Success sign in');
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(`${errorCode} ${errorMessage}`);
      });
    reset();
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="main">
      <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in</h1>
        <label className="email" htmlFor="email">
          Email:
          <input
            id="email"
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: emailPattern,
                message:
                  'Entered value does not match email format, minimum 8 symbols, at least one letter, one digit, one special character',
              },
            })}
            placeholder="Email"
            type="email"
          />
        </label>
        {errors?.email?.message && (
          <span className="field-error-text">{errors?.email?.message as string}</span>
        )}

        <label className="email" htmlFor="password">
          Password:
          <input
            id="password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: passwordPattern,
                message: 'minimum 8 symbols, at least one letter, one digit, one special character',
              },
              minLength: {
                value: 8,
                message: 'min length is 8',
              },
            })}
            type="password"
            placeholder="Password"
          />
        </label>
        {errors?.password?.message && (
          <span className="field-error-text">{errors?.password?.message as string}</span>
        )}

        <button className="button" type="submit">
          Sign in
        </button>
        <p>
          {'Are you new user? '}
          <Link to="/register">Sign up</Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
