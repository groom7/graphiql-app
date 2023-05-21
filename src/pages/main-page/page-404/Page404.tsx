import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.module.css';

const Page404 = () => {
  return (
    <main className={`${styles.page404}`}>
      <p>Page not found</p>
      <p>
        {'Вернуться  на домашнюю страницу '}
        <Link className={styles.link} to="/">
          Go home page
        </Link>
      </p>
    </main>
  );
};

export default Page404;
