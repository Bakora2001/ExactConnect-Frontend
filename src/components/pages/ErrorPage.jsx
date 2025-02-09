import React from "react";
import NotFoundImage from "/writer.svg";

const ErrorPage = ({ error, resetErrorBoundary }) => {
  console.log("Error occurred:", error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-6">
      <img
        src={NotFoundImage}
        alt="Page not found"
        className="w-64 md:w-80 lg:w-96 mx-auto"
      />
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mt-6">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-2 max-w-md">
        Try clicking the refresh button below to reload the application.
      </p>
      <button
        onClick={resetErrorBoundary}
        className="mt-5 px-5 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300 shadow-md"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default ErrorPage;
