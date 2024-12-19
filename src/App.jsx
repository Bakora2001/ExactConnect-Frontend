import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Import Home component
import Rdp from './components/Rdp';   // Import Rdp component
import Configure from './components/Configure';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   {/* Default route for Home component */}
        <Route path="/rdp" element={<Rdp />} /> {/* Route for Rdp component */}
        <Route path="/configure" element={<Configure />} /> {/* Route for Rdp component */}
        <Route path="/checkout" element={<Checkout />} /> {/* Route for Rdp component */}
        <Route path="/checkout" element={<Checkout />} /> {/* Route for Rdp component */}
      </Routes>
    </Router>
  );
}

export default App;


// <div className="p-4">
// <Routes>
 
//   <Route path="/Rdp" element={<Rdp />} />

//   {/* Admin Routes (Protected) */}
//   <Route
//     path="/admin/home"
//     element={
//       <AdminRoute>
//         <AdminHome /> 
//       </AdminRoute>
//     }
//   />
//    <Route
//     path="/admin/products"
//     element={
//       <AdminRoute>
//         <AdminProducts /> 
//       </AdminRoute>
//     }
//   />
//      <Route
//     path="/admin/products/new"
//     element={
//       <AdminRoute>
//         <AddProductForm/> 
//       </AdminRoute>
//     }
//   />
//   <Route
//     path="/admin/users"
//     element={
//       <AdminRoute>
//         <div>Manage Users</div>
//       </AdminRoute>
//     }
//   />
//   <Route
//     path="/admin/analytics"
//     element={
//       <AdminRoute>
//         <div>Admin Analytics</div>
//       </AdminRoute>
//     }
//   />
//   <Route
//     path="/admin/settings"
//     element={
//       <AdminRoute>
//         <div>Admin Settings</div>
//       </AdminRoute>
//     }
//   />
// </Routes>
// </div>