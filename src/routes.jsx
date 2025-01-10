import { createBrowserRouter } from 'react-router-dom';

//404 error handling page
import NotFound from './pages/NotFound';

//The sites landing page
import Home from './components/Home';

//Components for handling all authentication processes
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ChangePassword from './components/auth/ChangePassword';
import OTPVerification from './components/auth/OTPVerification';

//Components for the admin section
import AdminHome from './admin/AdminHome';
import AdminProducts from './admin/AdminProducts';
import AddProductForm from './admin/AddProductsForm';

import Proxy from './components/Proxy';
import Rdp from './components/Rdp';
import Checkout from './components/Checkout';
import Configure from './components/Configure';

export const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/proxy',
    element: <Proxy />,
  },
  {
    path: '/admin',
    element: <AdminHome />,
  },
  {
    path: '/rdp',
    element: <Rdp />,
  },
  {
    path: '/change-password',
    element: <ChangePassword />,
  },
  {
    path: '/otp',
    element: <OTPVerification />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/configure',
    element: <Configure />,
  },
  {
    path: '/admin/products',
    element: <AdminProducts />,
  },
  {
    path: '/admin/products/new',
    element: <AddProductForm />,
  },
]);
