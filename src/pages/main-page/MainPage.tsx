import React, { Suspense, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import DocumentationSection from '../../components/DocumentationSection/DocumentationSection';
import styles from './MainPage.module.css';
import QueryEditorSection from '../../components/QueryEditorSection/QueryEditorSection';
import ResponseDataSection from '../../components/ResponseDataSection copy/ResponseDataSection';
import { useGetGraphQLDataMutation } from '../../services/rickandmortyAPI';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import useTokenExpiration from '../../hooks/useTokenExpiration';
import { removeUser } from '../../services/slices/userDataSlice';

const MainPage = () => {
  const [, { isSuccess: isGraphQLDataRequestSucces }] = useGetGraphQLDataMutation({
    fixedCacheKey: 'shared-graphQL-data',
  });
  const { isAuth } = useAuth();
  const { token } = useAppSelector((state) => state.userData);
  const isTokenExpired = useTokenExpiration();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null && isTokenExpired) {
      dispatch(removeUser());
      navigate('/welcome');
    }
  }, [dispatch, isTokenExpired, navigate, token]);

  return isAuth ? (
    <main className="main">
      <div className={styles.mainPageContainer}>
        {isGraphQLDataRequestSucces && (
          <Suspense fallback={<CircularProgress />}>
            <DocumentationSection />
          </Suspense>
        )}
        <QueryEditorSection />
        <ResponseDataSection />
      </div>
    </main>
  ) : (
    <Navigate to="/welcome" replace />
  );
};

export default MainPage;
