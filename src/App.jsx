// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Rdp from './components/Rdp'; // Example user component
import AdminSidebar from './admin/AdminSidebar'; // Admin Sidebar
import AdminHome from './admin/AdminHome'; // Admin home component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// AdminRoute component to protect admin routes
const AdminRoute = ({ children }) => {
  const isAdmin = true; // Replace with actual admin authentication logic
  return isAdmin ? children : <Navigate to="/login" />;
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
            {/* User Home Route */}
            <Route path="/" element={<Rdp />} />

            {/* Admin Routes (Protected) */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminHome /> {/* Admin Home with greeting */}
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
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
