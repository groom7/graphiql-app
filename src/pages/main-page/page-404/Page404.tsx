import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.module.css';

const Page404 = () => {
  return (
    <main className={`${styles.page404}`}>
      <p>Page not found</p>
      <p>
        {'Back to '}
        <Link className={styles.link} to="/">
          main page
        </Link>
      </p>
    </main>
  );
};

export default Page404;
