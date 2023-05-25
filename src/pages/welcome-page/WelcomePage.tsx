import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-absolute-path
import graphiqlIcon from '/graphql.png';
import styles from './WelcomePage.module.css';
import useAuth from '../../hooks/useAuth';

const WelcomePage = () => {
  const { isAuth } = useAuth();

  return (
    <main className={`${styles.welcomePageContainer} main`}>
      <figure className={styles.graphiqlIconContainer}>
        <img className={styles.graphiqlIcon} src={graphiqlIcon} alt="graphiql icon" />
      </figure>
      <h1>GraphiQLefy it</h1>
      {isAuth ? (
        <Link className={`${styles.link} button`} to="/">
          Start
        </Link>
      ) : (
        <Link className={`${styles.link} button`} to="/login">
          Sign in
        </Link>
      )}
    </main>
  );
};

export default WelcomePage;
