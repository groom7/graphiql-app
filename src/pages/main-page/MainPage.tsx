import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import DocumentationSection from '../../components/DocumentationSection/DocumentationSection';
import styles from './MainPage.module.css';
import QueryEditorSection from '../../components/QueryEditorSection/QueryEditorSection';
import ResponseDataSection from '../../components/ResponseDataSection copy/ResponseDataSection';
import 'react-toastify/dist/ReactToastify.css';
import { useGetGraphQLDataMutation } from '../../services/rickandmortyAPI';

const MainPage = () => {
  const [, { isSuccess: isGraphQLDataRequestSucces }] = useGetGraphQLDataMutation({
    fixedCacheKey: 'shared-graphQL-data',
  });

  return (
    <main className={styles.mainContainer}>
      {isGraphQLDataRequestSucces && (
        <Suspense fallback={<CircularProgress />}>
          <DocumentationSection />
        </Suspense>
      )}
      <QueryEditorSection />
      <ResponseDataSection />
      <ToastContainer />
    </main>
  );
};

export default MainPage;
