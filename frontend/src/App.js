import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBackComponent from './ErrorFallBackComponent';
import NotFound from './Common/NotFound';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './ProtectedRoute';
import { userRoleEnum } from './Common/constants';
import Loading from './Common/Loading';
import ContactUs from './ContactUs/ContactUs';
import Profile from './Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';

// Lazy load components
const Nav1 = lazy(() => import('./Nav/Nav1'));
const Home = lazy(() => import('./Home/Home'));
const Nav2 = lazy(() => import('./Nav/Nav2'));
const Footer = lazy(() => import('./Footer/Footer'));
const About = lazy(() => import('./About/About'));
const Menu = lazy(() => import('./Menu/Menu'));
const Book = lazy(() => import('./Book/Book'));
function App() {
  return (
    <Router>
        <ErrorBoundary FallbackComponent={ErrorFallBackComponent} onReset={() => window.location.href = '/'}>
          <Suspense fallback={<Loading/>}>
            <header>
              <Nav1 />
            </header>
            <header className='sticky-top'>
              <Nav2 />
            </header>
            <main>
              <Routings />
              <ToastContainer />
            </main>
            <footer>
              <Footer />
            </footer>
          </Suspense>
        </ErrorBoundary>
    </Router>
  );
}

const Routings = () => {
    const {isLoggedIn} = useSelector((state) => state.auth);
  console.log("isLoggedIn:" +isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="*" element={<NotFound />} />
      <Route path="menu" element={<ProtectedRoute auth={isLoggedIn}>
        <Menu />
      </ProtectedRoute>} />
      <Route path="booking" element={<ProtectedRoute auth={isLoggedIn}>
        <Book />
      </ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute auth={isLoggedIn}>
        <Profile />
      </ProtectedRoute>} />

    </Routes>
  );
};
export default App;
