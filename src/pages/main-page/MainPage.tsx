import React, { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import DocumentationSection from '../../components/DocumentationSection/DocumentationSection';
import styles from './MainPage.module.css';
import { useGetGraphQLDataMutation } from '../../services/rickandmortyAPI';
import QueryEditorSection from '../../components/QueryEditorSection/QueryEditorSection';
import ResponseDataSection from '../../components/ResponseDataSection copy/ResponseDataSection';

const MainPage = () => {
  return (
    <main className={styles.mainContainer}>
      <DocumentationSection />
      <QueryEditorSection />
      {/* <ResponseDataSection /> */}
    </main>
  );
};

export default MainPage;
