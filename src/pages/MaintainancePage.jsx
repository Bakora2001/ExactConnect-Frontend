import { Link } from "react-router-dom";

const MaintenancePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold">503</h1>
        <p className="text-2xl font-semibold mt-4">Website is under maintenance!</p>
        <p className="text-lg mt-2">
          The site is not available at the moment.<br />
          We'll be back online shortly.
        </p>
        <Link to='/'>
        <button className="mt-6 px-6 py-2 bg-[#806cff] hover:bg-blue-600 text-white rounded-lg">
          Back Home
        </button>
        </Link>
       
      </div>
    </div>
  );
};

export default MaintenancePage;