import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import { useContext } from 'react';

const InternalServer = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`flex items-center justify-center h-screen ${
        darkMode ? 'bg-[#131312] text-white' : ' bg-white text-black'
      }`}
    >
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">500</h1>
        <p className="text-2xl font-semibold mt-4">
          Oops!Something went wrong ;)
        </p>
        <p className="text-lg mt-2">
          We apologize for the inconvenience.
          <br />
          Please try again.
        </p>
        <Link to="/">
          <button className="mt-6 px-6 py-2 bg-[#7C25BA] hover:bg-[#6a1fa0] text-white rounded-lg">
            Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InternalServer;
