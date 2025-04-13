export const getReliableCustomerId = () => {
  // Try to get from localStorage first
  let userData = null;
  
  try {
    const userDetailsStr = localStorage.getItem('userDetails');
    if (userDetailsStr) {
      userData = JSON.parse(userDetailsStr);
    }
  } catch (e) {
    console.error("Error parsing userDetails:", e);
  }
  
  // If we have a customer ID in userData, return it
  if (userData && (userData.customerId || userData.customerReference)) {
    return userData.customerId || userData.customerReference;
  }
  
  // If we have user_data, try that too
  try {
    const userDataStr = localStorage.getItem('user_data');
    if (userDataStr) {
      const parsedUserData = JSON.parse(userDataStr);
      if (parsedUserData && (parsedUserData.customerId || parsedUserData.customerReference)) {
        return parsedUserData.customerId || parsedUserData.customerReference;
      }
    }
  } catch (e) {
    console.error("Error parsing user_data:", e);
  }
  
  // No customer ID found
  return null;
};

// Helper function to get user details from localStorage
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
// First try customerReference, then customerId to ensure backward compatibility
export const customerId = userDetails?.customerReference || userDetails?.customerId || getReliableCustomerId();