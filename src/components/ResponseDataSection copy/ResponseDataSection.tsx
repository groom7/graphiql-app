import React, { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { toast } from 'react-toastify';
import FullScreenLoader from '../FullScreenLoader';
import styles from './ResponseData.module.css';
import {
  useGetGraphQLDataMutation,
  useGetGraphQLIntrospectionQuery,
} from '../../services/rickandmortyAPI';

const ResponseDataSection = () => {
  const [, { data: graphQLresponseData, isLoading, isSuccess, isError, error }] =
    useGetGraphQLDataMutation();

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        try {
          toast.error(JSON.stringify(error));
        } catch {
          toast.error(String(error));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // if (isLoading) content = <FullScreenLoader />;
  console.log('isSuccess', isSuccess, graphQLresponseData);

  return (
    <section className={styles.responseDataSection}>
      {isSuccess && (
        <CodeEditor
          value={graphQLresponseData}
          language="js"
          readOnly
          className={styles.responseDataSection__responseDataArea}
        />
      )}
      {isLoading && <FullScreenLoader />}
    </section>
  );
};

export default ResponseDataSection;
