import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.module.css';

const Page404 = () => {
  return (
    <main className={`${styles.page404} main`}>
      <p>Page not found</p>
      <p>Back to</p>
      <Link className={`${styles.link} button`} to="/">
        Main page
      </Link>
    </main>
  );
};

export default Page404;
