import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import githubLogo from '../../assets/images/github-logo.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.navbar}>
        <ul className={`${styles.navbarList}`}>
          <li className={styles.githubBlock}>
            <Link to="https://github.com/groom7" className={`${styles.navbarList__link} button`}>
              <img className={styles.githubBlock__logo} src={githubLogo} alt="github logo" />
            </Link>
          </li>
          <li className={styles.rssBlock}>
            <Link to="https://rs.school/react/" className={`${styles.navbarList__link} button`}>
              <img src="https://rs.school/images/rs_school_js.svg" alt="rs.school logo" />
            </Link>
          </li>
          <li>
            <span>2023</span>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
