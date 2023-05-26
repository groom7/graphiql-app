import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-absolute-path
import graphiqlIcon from '/graphql.png';
import { useTranslation } from 'react-i18next';
import styles from './WelcomePage.module.css';
import useAuth from '../../hooks/useAuth';

const WelcomePage = () => {
  const { isAuth } = useAuth();
  const { t } = useTranslation();

  return (
    <main className={`${styles.welcomePageContainer} main`}>
      <figure className={styles.graphiqlIconContainer}>
        <img className={styles.graphiqlIcon} src={graphiqlIcon} alt="graphiql icon" />
      </figure>
      <h1>{t('GraphiQLefy it')}</h1>
      {isAuth ? (
        <Link className={`${styles.link} button`} to="/">
          {t('Start')}
        </Link>
      ) : (
        <Link className={`${styles.link} button`} to="/login">
          {t('Sign in')}
        </Link>
      )}
    </main>
  );
};

export default WelcomePage;
