import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/pages/Loader';

//The sites landing page
import Home from './components/layout/Home';

//Components for handling all authentication processes
const Signup = lazy(() => import('./components/auth/Signup'))
const Login = lazy(() => import('./components/auth/Login'))
const OTPVerification = lazy(() => import('./components/auth/OTPVerification'))
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'))
const ChangePassword = lazy(() => import('./components/client/account/ChangePassword'))
const CheckMail = lazy(() => import('./components/auth/CheckMail'))

//Components for the admin section

import AdminProducts from '../src/components/admin/AdminProducts';


// import Proxy from './components/proxy/Proxy';
import Rdp from '../src/components/rdp/Rdp';
import Test from './components/payment/Test'
import Checkout from './components/Checkout';
import Configure from './components/Configure';

import ContactUs from '../src/components/contact/ContactUs';
import Mpesa from '../src/components/payment/Mpesa';

//Component for showing when the contact us page has now worked well
import Delivered from './components/pages/Delivered';

//Component pages for the when the user has signed in
import Dashboard from './components/client/dashboard/Dashboard';
import ProxyClient from './components/client/proxy/ProxyClient'
import SettingsPage from './components/client/account/SettingsPage';
import Orders from './components/client/order/Orders';
// import Rating from './components/icons/Rating';

//Implementing lazy loading
const NotFound = lazy(() => import('../src/components/errors/NotFound'))
const MaintenancePage = lazy(() => import('../src/components/errors/MaintainancePage'))
const Proxy = lazy(() => import('./components/proxy/Proxy'))
const AdminHome = lazy(() => import('../src/components/admin/AdminHome'))
const AddProductForm = lazy(() => import('../src/components/admin/AddProductsForm'))


export const router = createBrowserRouter([
  {
    path: '/account/signup',
    element: (
      <Suspense fallback={<Loader />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: '/account/login',
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: '/proxy',
    element: (
      <Suspense fallback={<Loader />}>
        <Proxy />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<Loader />}>
        <AdminHome />
      </Suspense>
    ),
  },
  {
    path: '/rdp',
    element: <Rdp />,
  },
  {
    path: '/account/forgotpassword',
    element: (
      <Suspense fallback={<Loader />}>
        <ForgotPassword />
      </Suspense>
    )
  },
  {
    path: '/account/changepassword',
    element: (
      <Suspense fallback={<Loader />}>
        <ChangePassword />
      </Suspense>

    ),
  },
  {
    path: '/account/otp',
    element: (
      <Suspense fallback={<Loader />}>
        <OTPVerification />
      </Suspense>

    )
  },
  {
    path: '/account/email',
    element: (
      <Suspense fallback={<Loader />}>
        <CheckMail />
      </Suspense>

    ),
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
    element: (
      <Suspense fallback={<Loader />}>
        <AddProductForm />
      </Suspense>
    ),
  },
  {
    path: '/maintainance',
    element: (
      <Suspense fallback={<Loader />}>
        <MaintenancePage />
      </Suspense>
    ),
  },
  {
    path: '/contact',
    element: <ContactUs />,
  },
  {
    path: '/mpesa-checkout',
    element: <Mpesa />,
  },
  {
    path: '/delivered',
    element: <Delivered />
  }, {
    path: '/dashboard',
    element: <Dashboard />
  }, {
    path: '/account/settings',
    element: <SettingsPage />
  },
  {
    path: '/client/proxy',
    element: <ProxyClient />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/orders',
    element: <Orders />
  },

]);
