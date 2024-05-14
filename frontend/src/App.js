import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, redirect, Navigate, useNavigate } from 'react-router-dom';
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
import AuthModel from './Models/AuthModel';
import User from './User/User';
import AddProduct from './Menu/AddProduct';

// Lazy load components
const Nav1 = lazy(() => import('./Nav/Nav1'));
const Home = lazy(() => import('./Home/Home'));
const Nav2 = lazy(() => import('./Nav/Nav2'));
const Footer = lazy(() => import('./Footer/Footer'));
const About = lazy(() => import('./About/About'));
const Menu = lazy(() => import('./Menu/Menu'));
const Book = lazy(() => import('./Book/Book'));
const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const BookingDisplay = lazy(() => import('./Book/BookingDisplay'));
function Elements() {
  let location = useLocation();

  if (location.pathname === '/404') {
    return( 
    <main>
      <Routings />
    </main>)
  }
  return (<div>
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
  </div>)
}
function redirect404() {
  redirect("/404")
}
function App() {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallBackComponent} onReset={() => window.location.href = '/'}>
        <Suspense fallback={<Loading />}>
          <Elements />
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

const Routings = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const auth: AuthModel = user;
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/menu" element={<ProtectedRoute auth={isLoggedIn}>
        <Menu />
      </ProtectedRoute>} />
      <Route path="/booking" element={<ProtectedRoute auth={isLoggedIn}>
        <Book />
      </ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute auth={isLoggedIn}>
        <Profile />
      </ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute auth={isLoggedIn && auth && auth.userRole === userRoleEnum.Admin}>
        <Dashboard />
      </ProtectedRoute>} />
      <Route path="/dashboard/users" element={<ProtectedRoute auth={isLoggedIn && auth && auth.userRole === userRoleEnum.Admin}>
        <User />
      </ProtectedRoute>} />
      <Route path="/add-product" element={<ProtectedRoute auth={isLoggedIn && auth && auth.userRole === userRoleEnum.Admin}>
        <AddProduct />
      </ProtectedRoute>} />
      <Route path="/booking/:userID" element={<ProtectedRoute auth={isLoggedIn}>
        <BookingDisplay />
      </ProtectedRoute>} />
      <Route path="/bookingList" element={<ProtectedRoute auth={isLoggedIn}>
        <BookingDisplay />
      </ProtectedRoute>} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" exact={true} />} />
    </Routes>
  );
};
export default App;
