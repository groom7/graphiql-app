import React, { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { toast } from 'react-toastify';
import FullScreenLoader from '../FullScreenLoader';
import styles from './QueryEditorSection.module.css';
import { useLazyGetGraphQLDataQuery } from '../../services/rickandmortyAPI';

const queryEditorInitialValue = `{
  characters {
    results {
      name
    }
  }
}`;
const QueryEditorSection = () => {
  const [queryEditorValue, setQueryEditorValue] = useState(queryEditorInitialValue);
  // const [getGraphqlData, { isLoading, isError, error }] = useGetGraphQLDataMutation();
  const [trigger, { data }] = useLazyGetGraphQLDataQuery();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // getGraphqlData(queryEditorValue);
    trigger(queryEditorValue);
  };
  console.log(data);

  // useEffect(() => {
  //   if (isError) {
  //     // eslint-disable-next-line no-console
  //     console.error(error);
  //     if (error instanceof Error) {
  //       toast.error(error.message);
  //     } else {
  //       try {
  //         toast.error(JSON.stringify(error));
  //       } catch {
  //         toast.error(String(error));
  //       }
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading]);

  return (
    <section className={styles.queryEditorSection}>
      <form className={styles.queryEditorSection__form} onSubmit={(event) => handleSubmit(event)}>
        <button className={styles.queryEditorSection__submitButton} type="submit">
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
