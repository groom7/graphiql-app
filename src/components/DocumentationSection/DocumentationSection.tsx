/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { toast } from 'react-toastify';
import { useGetGraphQLIntrospectionQuery } from '../../services/rickandmortyAPI';
import FullScreenLoader from '../FullScreenLoader';
import introspectionToString from '../../utils/introspectionToString';
import styles from './DocumentationSection.module.css';

const DocumentationSection = () => {
  let content;
  const {
    data: graphQLIntrospection,
    isLoading,
    isFetching,
    isSuccess,
    error,
    isError,
  } = useGetGraphQLIntrospectionQuery();

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

  if (isSuccess)
    content = (
      <section className={styles.documentaionSection}>
        <h1>Docs</h1>
        <CodeEditor
          value={introspectionToString(graphQLIntrospection)}
          language="graphql"
          readOnly
          className={styles.documentaionSection__textArea}
        />
      </section>
    );
  if (isLoading || isFetching) content = <FullScreenLoader />;

  return <div>{content}</div>;
};

export default DocumentationSection;
