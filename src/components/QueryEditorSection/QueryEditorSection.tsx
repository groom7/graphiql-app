import React, { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { toast } from 'react-toastify';
import styles from './QueryEditorSection.module.css';
import { useGetGraphQLDataMutation } from '../../services/rickandmortyAPI';
import { IResponseError } from '../../utils/types';

const queryEditorInitialValue = `{
  characters {
    results {
      name
    }
  }
}`;
const QueryEditorSection = () => {
  const [queryEditorValue, setQueryEditorValue] = useState(queryEditorInitialValue);
  const [getGraphqlData, { isLoading, isError, error }] = useGetGraphQLDataMutation({
    fixedCacheKey: 'shared-graphQL-data',
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getGraphqlData(queryEditorValue);
  };

  useEffect(() => {
    if (isError) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      if (error && 'data' in error) {
        const { data } = error as IResponseError;

        if (data && 'errors' in data) {
          if (Array.isArray((error as IResponseError)?.data?.errors)) {
            (error as IResponseError)?.data?.errors?.forEach((item) => toast.error(item.message));
          } else {
            try {
              toast.error(JSON.stringify(error));
            } catch {
              toast.error(String(error));
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <section className={styles.queryEditorSection}>
      <form className={styles.queryEditorSection__form} onSubmit={(event) => handleSubmit(event)}>
        <button className="button" type="submit">
          Query
        </button>
        <CodeEditor
          value={queryEditorValue}
          onChange={(event) => setQueryEditorValue(event.target.value)}
          language="graphql"
          className={styles.queryEditorSection__queryEditorArea}
        />
      </form>
    </section>
  );
};

export default QueryEditorSection;
