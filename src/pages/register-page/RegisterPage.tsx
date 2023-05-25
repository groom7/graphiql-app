import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { emailPattern, passwordPattern } from '../../utils/constants';
import { useAppDispatch } from '../../hooks/hooks';
import { IUserWithAccessToken } from '../../utils/types/types';
import { setUser } from '../../services/slices/userDataSlice';
import useAuth from '../../hooks/useAuth';
import FullScreenLoader from '../../components/FullScreenLoader';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, authWasListened } = useAuth();
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

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const { user } = userCredential;
        const { accessToken } = user as IUserWithAccessToken;

        dispatch(setUser({ email: user.email, id: user.uid, token: accessToken }));
        toast.success('Success sign up', { draggable: false });
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(`${errorCode} ${errorMessage}`, { draggable: false });
      });
    reset();
  };

  if (authWasListened) return <FullScreenLoader />;

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
      <h1>{t('Sign up')}</h1>
      <label className="email" htmlFor="email">
        {t('Email')}:
        <input
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
        {t('Sign up')}
      </button>
      <p>
        {t('Already have an account')}
        <Link to="/login">{t('Sign in')}</Link>
      </p>
    </form>
  );
};

export default LoginPage;
