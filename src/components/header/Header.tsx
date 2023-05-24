import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import useTokenExpiration from '../../hooks/useTokenExpiration';
import { useAppDispatch } from '../../hooks/hooks';
import { removeUser } from '../../services/slices/userDataSlice';
import setLinkActiveStyle from '../../utils/setLinkActiveStyle';

const AppHeader = () => {
  let content;
  const dispatch = useAppDispatch();
  const isTokenExpired = useTokenExpiration();
  const handleLogout = () => {
    dispatch(removeUser());
  };

  if (isTokenExpired) {
    content = (
      <>
        <li>
          <NavLink
            to="/login"
            className={`${styles.navbarList__link} button`}
            style={setLinkActiveStyle}
          >
            Sign in
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={`${styles.navbarList__link} button`}
            style={setLinkActiveStyle}
          >
            Sign up
          </NavLink>
        </li>
      </>
    );
  } else {
    content = (
      <>
        <li>
          <NavLink
            to="/"
            className={`${styles.navbarList__link} button`}
            style={setLinkActiveStyle}
          >
            Main page
          </NavLink>
        </li>
        <li>
          <button
            className={`${styles.navbarList__link} button`}
            onClick={handleLogout}
            type="button"
          >
            Sign out
          </button>
        </li>
      </>
    );
  }

  return (
    <header className={styles.header}>
      <nav>
        <ul className={`${styles.navbarList}`}>{content}</ul>
      </nav>
    </header>
  );
};

export default AppHeader;
