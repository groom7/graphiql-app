import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

interface ISetLinkActiveStyleArg {
  isActive: boolean;
}
type TSetLinkActiveStyle = (object: ISetLinkActiveStyleArg) => { [key: string]: string };
const setLinkActiveStyle: TSetLinkActiveStyle = ({ isActive }) => ({
  color: isActive ? '#fff' : '#000',
  backgroundColor: isActive ? '#61892F' : '#86C232',
});

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={`${styles.navbarList}`}>
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
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
