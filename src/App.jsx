import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.jsx';
import { AuthProvider } from './context/AuthContext';

// Import Components
import Home from './components/Home'; // Import Home component
import Rdp from './components/Rdp';   // Import Rdp component
import Configure from './components/Configure'; 
import Checkout from './components/Checkout'; 
import Proxy from './components/Proxy'; // Import Proxy component
import Dashboard from './components/dashboard//Dashboard'
import MPesaPaymentForm from './components/payments/MPesaPaymentForm';

// Admin components
import AdminSidebar from './admin/AdminSidebar'; 
import AdminHome from './admin/AdminHome'; 
import AdminProducts from './admin/AdminProducts';
import AddProductForm from './admin/AddProductsForm'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


import ChangePassword from './components/auth/ChangePassword';
import OTPVerification from './components/auth/OTPVerification';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

// AdminRoute component to protect admin routes
const AdminRoute = ({ children }) => {
  const isAdmin = true; // Replace with actual admin authentication logic
  return isAdmin ? children : <Navigate to="/login" />; // Redirect to login if not admin
};

// Layout component for handling sidebar and main content
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if the current route starts with "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex">
      {/* Conditionally render the Admin Sidebar based on the route */}
      {isAdminRoute && <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

      {/* Main content */}
      <div className={`flex-1 ${isAdminRoute ? (sidebarOpen ? 'ml-64' : 'ml-0') : 'ml-0'} ${isAdminRoute ? 'md:ml-64' : ''} transition-all duration-300`}>
        {/* Hamburger Icon (only visible on admin routes and mobile) */}
        {isAdminRoute && (
          <div className="md:hidden p-4 fixed top-0 right-0 z-50">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
          </div>
        )}

        {/* Page content */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />   {/* Default route for Home component */}
            <Route path="/rdp" element={<Rdp />} /> {/* Route for Rdp component */}
            <Route path="/configure" element={<Configure />} /> {/* Route for Configure component */}
            <Route path="/checkout" element={<Checkout />} /> {/* Route for Checkout component */}
            <Route path="/proxy" element={<Proxy />} /> {/* Route for Proxy */}
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/payment" element={<MPesaPaymentForm />} />

            {/* Authentication Routes - Handle both Signup and Login */}
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/login" element={<Login />} />
            {/* Combined Auth page for Login/Signup */}
            <Route path="/change-password" element={<ChangePassword />} /> {/* Change Password route */}
            <Route path="/verify-otp" element={<OTPVerification />} /> {/* OTP Verification route */}

            {/* Admin Routes (Protected) */}
            <Route
              path="/admin/home"
              element={
                <AdminRoute>
                  <AdminHome /> 
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts /> 
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <AdminRoute>
                  <AddProductForm /> 
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <div>Manage Users</div>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <div>Admin Analytics</div>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <div>Admin Settings</div>
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;


// import './App.css';
// import { Outlet, useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// // Import Components
// import AdminSidebar from './admin/AdminSidebar'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

// const App = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   // Check if the current route starts with "/admin"
//   const isAdminRoute = location.pathname.startsWith('/admin');
//   // Check if the current route starts with "/dashboard"
//   const isDashboardRoute = location.pathname.startsWith('/dashboard');
  
//   // Close sidebar when navigating away from admin routes
//   useEffect(() => {
//     if (!isAdminRoute && sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   }, [location.pathname, isAdminRoute, sidebarOpen]);

//   // If we're on a dashboard route, render the dashboard outlet directly
//   if (isDashboardRoute) {
//     return <Outlet />;
//   }

//   return (
//     <div className="flex">
//       {/* Conditionally render the Admin Sidebar based on the route */}
//       {isAdminRoute && <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

//       {/* Main content */}
//       <div className={`flex-1 ${isAdminRoute ? (sidebarOpen ? 'ml-64' : 'ml-0') : 'ml-0'} ${isAdminRoute ? 'md:ml-64' : ''} transition-all duration-300`}>
//         {/* Hamburger Icon (only visible on admin routes and mobile) */}
//         {isAdminRoute && (
//           <div className="md:hidden p-4 fixed top-0 right-0 z-50">
//             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
//               <FontAwesomeIcon icon={faBars} className="text-2xl" />
//             </button>
//           </div>
//         )}

//         {/* Page content via Outlet */}
//         <div className="p-4">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
