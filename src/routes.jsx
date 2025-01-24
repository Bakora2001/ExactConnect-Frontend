import { createBrowserRouter } from 'react-router-dom';

//404 error handling page
import NotFound from '../src/components/errors/NotFound';

//Under maintainance page
import MaintenancePage from '../src/components/errors/MaintainancePage';

//The sites landing page
import Home from './components/layout/Home';

//Components for handling all authentication processes
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import OTPVerification from './components/auth/OTPVerification';

//Components for the admin section
import AdminHome from '../src/components/admin/AdminHome';
import AdminProducts from '../src/components/admin/AdminProducts';
import AddProductForm from '../src/components/admin/AddProductsForm';

import Proxy from '../src/components/proxy/Proxy';
import Rdp from '../src/components/rdp/Rdp';
import Checkout from './components/Checkout';
import Configure from './components/Configure';

import ContactUs from '../src/components/contact/ContactUs';
import Mpesa from '../src/components/payment/Mpesa';
import ChangePassword from './components/auth/ChangePassword';
import CheckMail from './components/auth/CheckMail';

export const router = createBrowserRouter([
  {
    path: '/account/signup',
    element: <Signup />,
  },
  {
    path: '/account/login',
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
    path: '/account/forgotpassword',
    element: <ForgotPassword />,
  },
  {
    path: '/account/changepassword',
    element: <ChangePassword />,
  },
  {
    path: '/account/otp',
    element: <OTPVerification />,
  },
  {
    path: '/account/email',
    element: <CheckMail />,
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
  {
    path: '/maintainance',
    element: <MaintenancePage />,
  },
  {
    path: '/contact',
    element: <ContactUs />,
  },
  {
    path: '/mpesa-checkout',
    element: <Mpesa />,
  },
]);
