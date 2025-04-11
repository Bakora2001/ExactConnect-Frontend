// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/pages/Loader';
import ProtectedRoute from './components/auth/ProtectedRoute';

//The sites landing page
import Home from './components/layout/Home';

//Implementing lazy loading

//Components for handling all authentication processes
const Signup = lazy(() => import('./components/auth/Signup'));
const Login = lazy(() => import('./components/auth/Login'));
const OTPVerification = lazy(() => import('./components/auth/OTPVerification'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ChangePassword = lazy(() =>
  import('./components/client/account/ChangePassword')
);
const CheckMail = lazy(() => import('./components/auth/CheckMail'));

//Pages for handling page visit errors
const NotFound = lazy(() => import('../src/components/errors/NotFound'));
const MaintenancePage = lazy(() =>
  import('../src/components/errors/MaintainancePage')
);

//Dashboard and related components
import Dashboard from './components/dashboard/Dashboard';
import DashboardOverview from './components/dashboard/DashboardOverview';
import ProxiesPage from './components/client/proxy/ProxyClient';
import VpsPage from './components/dashboard/VpsPage';
import TemplatesPage from './components/dashboard/TemplatesPage';
import NonVoipPage from './components/dashboard/NonVoipPage';
import VccPage from './components/dashboard/VccPage';
import OrdersPage from './components/dashboard/OrdersPage';
import ProfilePage from './components/dashboard/ProfilePage';
import Orders from './components/client/order/Orders';

// Other components
const Residential = lazy(() => import('./components/residential/Residential'));
const AdminHome = lazy(() => import('../src/components/admin/AdminHome'));
const Psd = lazy(() => import('./components/psd-template/Psd'));
const AddProductForm = lazy(() =>
  import('../src/components/admin/AddProductsForm')
);
const ContactUs = lazy(() => import('../src/components/contact/ContactUs'));
const Rdp = lazy(() => import('../src/components/rdp/Rdp'));

const AdminProducts = lazy(() =>
  import('../src/components/admin/AdminProducts')
);
const Delivered = lazy(() => import('./components/pages/Delivered'));
import Test from './components/payment/Test';
import Mpesa from './components/payment/Mpesa';
import MailConfirmation from './components/pages/Mail';
import PaymentFailed from './components/pages/PaymentFailed';
import PaymentSuccessful from './components/pages/PaymentSuccessful';
import ComingSoon from './components/pages/ComingSoon';
import TermsAndPrivacy from './components/pages/TermsAndPrivacy';

const SettingsPage = lazy(() =>
  import('./components/client/account/SettingsPage')
);
const Configure = lazy(() => import('./components/Configure'));
const Checkout = lazy(() => import('./components/Checkout'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
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
  // Dashboard with nested routes - Protected
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <DashboardOverview /> },
      { path: 'proxies', element: <ProxiesPage /> },
      { path: 'vps', element: <VpsPage /> },
      { path: 'templates', element: <TemplatesPage /> },
      { path: 'nonvoip', element: <NonVoipPage /> },
      { path: 'vcc', element: <VccPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ]
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
    path: '/residential',
    element: (
      <Suspense fallback={<Loader />}>
        <Residential />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <AdminHome />
        </Suspense>
      </ProtectedRoute>
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
    path: '/psd-template',
    element: (
      <Suspense fallback={<Loader />}>
        <Psd />
      </Suspense>
    ),
  },
  {
    path: '/account/forgotpassword',
    element: (
      <Suspense fallback={<Loader />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: '/account/changepassword',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <ChangePassword />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/account/otp',
    element: (
      <Suspense fallback={<Loader />}>
        <OTPVerification />
      </Suspense>
    ),
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
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <Checkout />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/configure',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <Configure />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <AdminProducts />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/products/new',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <AddProductForm />
        </Suspense>
      </ProtectedRoute>
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
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <Delivered />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/account/settings',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <SettingsPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: 'checkout/mpesa',
    element: (
      <ProtectedRoute>
        <Test />
      </ProtectedRoute>
    ),
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: '/test',
    element: <Mpesa />,
  },
  {
    path: '/openmail',
    element: <MailConfirmation />,
  },
  {
    path: '/status/failed',
    element: <PaymentFailed />,
  },
  {
    path: '/status/success',
    element: <PaymentSuccessful />,
  },
  {
    path: '/coming-soon',
    element: <ComingSoon />,
  },
  {
    path: '/privacy',
    element: <TermsAndPrivacy />,
  },
]);


// import { createBrowserRouter } from 'react-router-dom';

// // Import Components
// import App from './App';
// import Home from './components/Home';
// import Rdp from './components/Rdp';
// import Configure from './components/Configure'; 
// import Checkout from './components/Checkout'; 
// import Proxy from './components/Proxy';

// // Admin components
// import AdminHome from './admin/AdminHome'; 
// import AdminProducts from './admin/AdminProducts';
// import AddProductForm from './admin/AddProductsForm';

// // Authentication components
// import ChangePassword from './components/auth/ChangePassword';
// import OTPVerification from './components/auth/OTPVerification';
// import Signup from './components/auth/Signup';
// import Login from './components/auth/Login';

// // Dashboard components
// import Dashboard from './components/dashboard/Dashboard';
// import DashboardOverview from './components/dashboard/DashboardOverview';
// import ProxiesPage from './components/dashboard/ProxiesPage';
// import VpsPage from './components/dashboard/VpsPage';
// import TemplatesPage from './components/dashboard/TemplatesPage';
// import NonVoipPage from './components/dashboard/NonVoipPage';
// import VccPage from './components/dashboard/VccPage';
// import OrdersPage from './components/dashboard/OrdersPage';
// import ProfilePage from './components/dashboard/ProfilePage';

// // Create router
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: <Home />
//       },
//       {
//         path: '/rdp',
//         element: <Rdp />
//       },
//       {
//         path: '/configure',
//         element: <Configure />
//       },
//       {
//         path: '/checkout',
//         element: <Checkout />
//       },
//       {
//         path: '/proxy',
//         element: <Proxy />
//       },
      
//       // Authentication Routes
//       {
//         path: '/signup',
//         element: <Signup />
//       },
//       {
//         path: '/login',
//         element: <Login />
//       },
//       {
//         path: '/change-password',
//         element: <ChangePassword />
//       },
//       {
//         path: '/verify-otp',
//         element: <OTPVerification />
//       },
      
//       // Admin Routes
//       {
//         path: '/admin/home',
//         element: <AdminHome />
//       },
//       {
//         path: '/admin/products',
//         element: <AdminProducts />
//       },
//       {
//         path: '/admin/products/new',
//         element: <AddProductForm />
//       },
//       {
//         path: '/admin/users',
//         element: <div>Manage Users</div>
//       },
//       {
//         path: '/admin/analytics',
//         element: <div>Admin Analytics</div>
//       },
//       {
//         path: '/admin/settings',
//         element: <div>Admin Settings</div>
//       },
      
//       // Dashboard Routes
//       {
//         path: '/dashboard',
//         element: <Dashboard />,
//         children: [
//           {
//             path: '',
//             element: <DashboardOverview />
//           },
//           {
//             path: 'proxies',
//             element: <ProxiesPage />
//           },
//           {
//             path: 'vps',
//             element: <VpsPage />
//           },
//           {
//             path: 'templates',
//             element: <TemplatesPage />
//           },
//           {
//             path: 'nonvoip',
//             element: <NonVoipPage />
//           },
//           {
//             path: 'vcc',
//             element: <VccPage />
//           },
//           {
//             path: 'orders',
//             element: <OrdersPage />
//           },
//           {
//             path: 'profile',
//             element: <ProfilePage />
//           }
//         ]
//       }
//     ]
//   }
// ]);

// export default router;