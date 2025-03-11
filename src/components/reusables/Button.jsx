import { cn } from '../../utils/cn';
import Loading from '../icons/Loading';

//Button component
const Button = ({ className, isLoading, label }) => {
  return (
    <button
      type="submit"
      className={cn(
        `w-full text-white bg-[#7C25BA]  py-2.5 rounded-lg text-lg font-medium hover:bg-purple-700 transition duration-300  flex items-center justify-center ${
          isLoading && 'opacity-50 cursor-not-allowed'
        }`,
        className
      )}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? <Loading /> : label}
    </button>
  );
};

export default Button;
