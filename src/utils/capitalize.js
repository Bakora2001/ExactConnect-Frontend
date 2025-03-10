//Section handle making first letters to capital
import { userDetails } from '../lib/userDetails';

//Function to capitalize first letter
export const capitalizeFirstLetter = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
};

export const capitalizedFirstName = capitalizeFirstLetter(
  userDetails?.firstName
);

export const capitalizeFirstLetterAndSecond =
  `${userDetails?.firstName[0]}${userDetails?.lastName[0]}`.toUpperCase();
