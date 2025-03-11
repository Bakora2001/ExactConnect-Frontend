import { userDetails } from '../lib/userDetails';

// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
};

// Capitalizing first name safely
export const capitalizedFirstName = capitalizeFirstLetter(userDetails?.firstName);

// Getting initials safely
export const capitalizeFirstLetterAndSecond = userDetails?.firstName && userDetails?.lastName
  ? `${userDetails.firstName[0].toUpperCase()}${userDetails.lastName[0].toUpperCase()}`
  : "";
