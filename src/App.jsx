import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Import Home component
import Rdp from './components/Rdp';   // Import Rdp component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   {/* Default route for Home component */}
        <Route path="/rdp" element={<Rdp />} /> {/* Route for Rdp component */}
      </Routes>
    </Router>
  );
}

export default App;
