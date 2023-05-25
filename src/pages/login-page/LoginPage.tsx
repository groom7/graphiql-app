import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { emailPattern, passwordPattern } from '../../utils/constants';
import { setUser } from '../../services/slices/userDataSlice';
import { IUserWithAccessToken } from '../../utils/types/types';
import { useAppDispatch } from '../../hooks/hooks';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const { t } = useTranslation();
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
      <form className="authForm" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <h1>{t('Sign in')}</h1>
        <label className="email" htmlFor="email">
          {t('Email')}:
          <input
            autoComplete="on"
            id="email"
            {...register('email', {
              required: `${t('Required error')}`,
              pattern: {
                value: emailPattern,
                message: `${t('Pattern error')}`,
              },
            })}
            placeholder={t('Email') || 'Email'}
            type="email"
          />
        </label>
        {errors?.email?.message && (
          <span className="field-error-text">{errors?.email?.message as string}</span>
        )}

        <label className="email" htmlFor="password">
          {t('Password')}:
          <input
            autoComplete="on"
            id="password"
            {...register('password', {
              required: `${t('Required error')}`,
              pattern: {
                value: passwordPattern,
                message: `${t('Pattern error')}`,
              },
            })}
            type="password"
            placeholder={t('Password') || 'Password'}
          />
        </label>
        {errors?.password?.message && (
          <span className="field-error-text">{errors?.password?.message as string}</span>
        )}

        <button className="button" type="submit">
          {t('Sign in')}
        </button>
        <p>
          {t('Are you new user')}
          <Link to="/register">{t('Sign up')}</Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
