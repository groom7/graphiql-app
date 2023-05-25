import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAuth, signOut } from 'firebase/auth';
import styles from './Header.module.css';
import useTokenExpiration from '../../hooks/useTokenExpiration';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { removeUser } from '../../services/slices/userDataSlice';
import setLinkActiveStyle from '../../utils/setLinkActiveStyle';
import { setCurrentLanguage } from '../../services/slices/currentLanguageSlice';

const AppHeader = () => {
  let content;
  const dispatch = useAppDispatch();
  const isTokenExpired = useTokenExpiration();
  const handleLogout = () => {
    const auth = getAuth();

    dispatch(removeUser());
    signOut(auth);
  };
  const { currentLanguage } = useAppSelector((state) => state.currentLanguage);
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(setCurrentLanguage(language));
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
            {t('Sign in')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={`${styles.navbarList__link} button`}
            style={setLinkActiveStyle}
          >
            {t('Sign up')}
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
            {t('Main')}
          </NavLink>
        </li>
        <li>
          <button
            className={`${styles.navbarList__link} button`}
            onClick={handleLogout}
            type="button"
          >
            {t('Sign out')}
          </button>
        </li>
      </>
    );
  }

  return (
    <header className={styles.header}>
      <nav>
        <ul className={`${styles.navbarList}`}>
          <li>
            <button
              className={`${styles.navbarList__link} button`}
              onClick={() => handleLanguageChange('en')}
              style={setLinkActiveStyle({ isActive: currentLanguage === 'en' })}
              type="button"
            >
              En
            </button>
          </li>
          <li>
            <button
              className={`${styles.navbarList__link} button`}
              onClick={() => handleLanguageChange('ru')}
              style={setLinkActiveStyle({ isActive: currentLanguage === 'ru' })}
              type="button"
            >
              Ru
            </button>
          </li>
          <li>
            <NavLink
              to="/welcome"
              className={`${styles.navbarList__link} button`}
              style={setLinkActiveStyle}
            >
              {t('Welcome')}
            </NavLink>
          </li>
          {content}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
