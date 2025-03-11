// Utility function to get user details from localStorage
export const getUserDetails = () => {
  try {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    return userDetails || {};
  } catch (error) {
    console.error('Error parsing user details from localStorage:', error);
    return {}; // Return an empty object in case of error
  }
};

// Extracting user details
export const userDetails = getUserDetails();

// Extracting the first name with a default value
export const firstName = userDetails?.firstName || 'Guest';

// Extracting the last name with a default value
export const lastName = userDetails?.lastName || '';

// Extracting the email with a default value
export const email = userDetails?.email || '';

// Extracting the customer reference with a default value
export const customerId = userDetails?.customerReference || '';
