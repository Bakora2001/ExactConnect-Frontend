import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/pages/Loader';

//The sites landing page
import Home from './components/layout/Home';

//Implementing lazy loading

//Components for handling all authentication processes
const Signup = lazy(() => import('./components/auth/Signup'))
const Login = lazy(() => import('./components/auth/Login'))
const OTPVerification = lazy(() => import('./components/auth/OTPVerification'))
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'))
const ChangePassword = lazy(() => import('./components/client/account/ChangePassword'))
const CheckMail = lazy(() => import('./components/auth/CheckMail'))

//Pages for handling page visit errors
const NotFound = lazy(() => import('../src/components/errors/NotFound'))
const MaintenancePage = lazy(() => import('../src/components/errors/MaintainancePage'))

//Component pages for the when the user has signed in
// const Dashboard = lazy(() => import('./components/client/dashboard/Dashboard'))
import Dashboard from './components/client/dashboard/Dashboard'
import ProxyClient from './components/client/proxy/ProxyClient'
import Orders from './components/client/order/Orders'
// const ProxyClient = lazy(() => import('./components/client/proxy/ProxyClient'))
const SettingsPage = lazy(() => import('./components/client/account/SettingsPage'))
// const Orders = lazy(() => import('./components/client/order/Orders'))

const Proxy = lazy(() => import('./components/proxy/Proxy'))
const AdminHome = lazy(() => import('../src/components/admin/AdminHome'))
const AddProductForm = lazy(() => import('../src/components/admin/AddProductsForm'))
const ContactUs = lazy(() => import('../src/components/contact/ContactUs'))
const Rdp = lazy(() => import('../src/components/rdp/Rdp'))
const AdminProducts = lazy(() => import('../src/components/admin/AdminProducts'))
const Delivered = lazy(() => import('./components/pages/Delivered'))
import Test from './components/payment/Test'
// const Test = lazy(() => import('./components/payment/Test'))
const Configure = lazy(() => import('./components/Configure'))
const Checkout = lazy(() => import('./components/Checkout'))

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
    element: (
      <Suspense fallback={<Loader />}>
        <Rdp />
      </Suspense>

    ),
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
    element: (
      <Suspense fallback={<Loader />}>
        <Checkout />
      </Suspense>

    ),
  },
  {
    path: '/configure',
    element: (
      <Suspense fallback={<Loader />}>
        <Configure />
      </Suspense>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <Suspense fallback={<Loader />}>
        <AdminProducts />
      </Suspense>

    ),
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
    element: (
      <Suspense fallback={<Loader />}>
        <ContactUs />
      </Suspense>

    ),
  },
  {
    path: '/delivered',
    element: (
      <Suspense fallback={<Loader />}>
        <Delivered />
      </Suspense>
    )
  }, {
    path: '/dashboard',
    element: <Dashboard />
  }, {
    path: '/account/settings',
    element: (
      <Suspense fallback={<Loader />}>
        <SettingsPage />
      </Suspense>

    )
  },
  {
    path: '/client/proxy',
    element:

      <ProxyClient />


  },
  {
    path: '/test',
    element: 
     
        <Test />
     
    
  },
  {
    path: '/orders',
    element:

      <Orders />

  },

]);
