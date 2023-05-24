import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';
import DocumentationSection from '../../components/DocumentationSection/DocumentationSection';
import styles from './MainPage.module.css';
import QueryEditorSection from '../../components/QueryEditorSection/QueryEditorSection';
import ResponseDataSection from '../../components/ResponseDataSection copy/ResponseDataSection';
import { useGetGraphQLDataMutation } from '../../services/rickandmortyAPI';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../hooks/hooks';
import { removeUser } from '../../services/slices/userDataSlice';

const MainPage = () => {
  const [, { isSuccess: isGraphQLDataRequestSucces }] = useGetGraphQLDataMutation({
    fixedCacheKey: 'shared-graphQL-data',
  });
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  return isAuth ? (
    <main className={styles.mainContainer}>
      {isGraphQLDataRequestSucces && (
        <Suspense fallback={<CircularProgress />}>
          <DocumentationSection />
        </Suspense>
      )}
      <QueryEditorSection />
      <ResponseDataSection />
      <button
        type="button"
        onClick={() => {
          dispatch(removeUser());
        }}
      >
        Sign Out
      </button>
    </main>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default MainPage;
