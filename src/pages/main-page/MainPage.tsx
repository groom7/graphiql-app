import React from 'react';
import { ToastContainer } from 'react-toastify';
import DocumentationSection from '../../components/DocumentationSection/DocumentationSection';
import styles from './MainPage.module.css';
import QueryEditorSection from '../../components/QueryEditorSection/QueryEditorSection';
import ResponseDataSection from '../../components/ResponseDataSection copy/ResponseDataSection';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = () => {
  return (
    <main className={styles.mainContainer}>
      <DocumentationSection />
      <QueryEditorSection />
      <ResponseDataSection />
      <ToastContainer />
    </main>
  );
};

export default MainPage;
