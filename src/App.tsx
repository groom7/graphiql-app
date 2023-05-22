import { Route, Routes } from 'react-router';
import MainPage from './pages/main-page/MainPage';
import Page404 from './pages/page-404/Page404';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index path="/" element={<MainPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
