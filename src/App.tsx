import { Route, Routes } from 'react-router';
import MainPage from './pages/main-page/MainPage';
import Page404 from './pages/page-404/Page404';
import LoginPage from './pages/login-page/LoginPage';
import RegisterPage from './pages/register-page/RegisterPage';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import WelcomePage from './pages/welcome-page/WelcomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<MainPage />} />
        <Route index path="/welcome" element={<WelcomePage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route index path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
