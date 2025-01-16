import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBox,
  faShoppingCart,
  faUsers,
  faTicketAlt,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  // Menu items with navigation paths and icons
  const menuItems = [
    { label: "Home", icon: faHome, onClick: () => navigate("/admin/home") },
    { label: "Products", icon: faBox, onClick: () => navigate("/admin/products") },
    { label: "Orders", icon: faShoppingCart, onClick: () => navigate("/admin/orders") },
    { label: "Customers", icon: faUsers, onClick: () => navigate("/admin/customers") },
    { label: "Support Tickets", icon: faTicketAlt, onClick: () => navigate("/admin/support-tickets") },
    { label: "Feedback", icon: faComments, onClick: () => navigate("/admin/feedback") },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out bg-purple-950 text-gray-100 h-full p-6 shadow-lg z-50 w-64 md:w-64 lg:w-64 xl:w-64`}
    >
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-xl font-extrabold text-white">
          Admin <span className="text-azure-400">Dashboard</span>
        </h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-gray-300 md:hidden"
        >
          <FontAwesomeIcon icon="times" className="text-2xl" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <button
                onClick={item.onClick}
                className="flex items-center w-full text-left p-3 rounded-lg hover:bg-purple-700 hover:text-white transition"
              >
                <FontAwesomeIcon icon={item.icon} className="mr-3 text-lg" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
