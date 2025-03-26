import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#131312] p-6">
      {/* 404 Content */}
      <h1 className="text-7xl sm:text-9xl font-extrabold text-red-500 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
        Oops! Page not found
      </h2>
      <p className="text-base sm:text-lg text-gray-300 mb-8 text-center max-w-md">
        {`Sorry, the page you're looking for doesn't exist. You might have entered
        an incorrect URL or the page has been removed.`}
      </p>
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
      >
        Go Back to Home
      </button>
    </div>
  );
}

export default NotFound;
