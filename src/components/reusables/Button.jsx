// import { cn } from '../../utils/cn';
// import Loading from '../icons/Loading';

// //Button component
// const Button = ({ className, isLoading, label }) => {
//   return (
//     <button
//       type="submit"
//       className={cn(
//         `w-full text-white bg-[#7C25BA]  py-2.5 rounded-lg text-lg font-medium hover:bg-purple-700 transition duration-300  flex items-center justify-center ${
//           isLoading && 'opacity-50 cursor-not-allowed'
//         }`,
//         className
//       )}
//       disabled={isLoading}
//       aria-busy={isLoading}
//     >
//       {isLoading ? <Loading /> : label}
//     </button>
//   );
// };

// export default Button;


import React from 'react';

const Button = ({ label, onClick, isLoading, type = 'submit', fullWidth = true, variant = 'primary' }) => {
  // Define different button styles based on variant
  const getButtonStyles = () => {
    const baseStyles = `rounded-md transition-all duration-300 py-3 font-medium text-center relative 
                       ${fullWidth ? 'w-full' : ''} 
                       ${isLoading ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} 
                       focus:outline-none focus:ring-2 focus:ring-opacity-50`;

    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500`;
      case 'secondary':
        return `${baseStyles} bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400`;
      case 'outline':
        return `${baseStyles} bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500`;
      case 'danger':
        return `${baseStyles} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`;
      default:
        return `${baseStyles} bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500`;
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={getButtonStyles()}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 mr-3 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};

export default Button;