export default function Delivered() {
  return (
    <div className="flex flex-col items-center justify-center gap-4  py-10 min-h-screen bg-gray-50">
      {/* Icon Container */}
      <div className="relative w-28 h-28 bg-[#7C25BA] rounded-[20%] rotate-0 flex items-center justify-center shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full text-white p-5"
        >
          <polyline
            points="20 6 9 17 4 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-gray-900">
          DELIVERED
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-sans tracking-wider text-gray-500 max-w-md">
          A member of our team will reach out shortly
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-row sm:flex-row gap-4 mt-6">
        <a
          href="/contact"
          className="px-6 py-3 text-sm sm:text-base font-medium text-gray-100 bg-gray-700 hover:bg-gray-800 rounded-lg shadow-md transition"
        >
          Back
        </a>
        <a
          href="/"
          className="px-6 py-3 text-sm sm:text-base font-medium text-white bg-[#7C25BA] hover:bg-[#7C40BB] rounded-lg shadow-md transition"
        >
          Home
        </a>
      </div>
    </div>
  );
}
