// src/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Hamburger Icon (for mobile view) */}
        <div className="md:hidden p-4 fixed top-0 right-0 z-50">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet /> {/* This will render the specific admin page content */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
