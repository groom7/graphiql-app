import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useTranslation } from 'react-i18next';
import FullScreenLoader from '../FullScreenLoader';
import styles from './ResponseData.module.css';
import { useGetGraphQLDataMutation } from '../../services/rickandmortyAPI';

const ResponseDataSection = () => {
  let content;
  const [, { data: graphQLresponseData, isLoading, isSuccess, isError }] =
    useGetGraphQLDataMutation({
      fixedCacheKey: 'shared-graphQL-data',
    });
  const { t } = useTranslation();

  if (!graphQLresponseData) {
    if (!isError) {
      content = <p>{t('Send query')}</p>;
    } else {
      content = <p>{t('Request error')}</p>;
    }
  }
  if (isSuccess)
    content = (
      <CodeEditor
        value={graphQLresponseData}
        language="js"
        readOnly
        className={styles.responseDataSection__responseDataArea}
      />
    );
  if (isLoading) content = <FullScreenLoader />;

  return <section className={styles.responseDataSection}>{content}</section>;
};

export default ResponseDataSection;
