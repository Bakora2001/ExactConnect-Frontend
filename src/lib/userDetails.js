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

// Another utility function to get the most reliable customer ID from all sources
export const getReliableCustomerId = () => {
  try {
    // Try multiple sources in order of reliability
    let customerId = null;
    
    // First try userDetails
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    if (userDetails.customerId) customerId = userDetails.customerId;
    else if (userDetails.customerReference) customerId = userDetails.customerReference;
    
    // Next try user_data
    if (!customerId) {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      if (userData.customerId) customerId = userData.customerId;
      else if (userData.customerReference) customerId = userData.customerReference;
    }
    
    return customerId || '';
  } catch (error) {
    console.error('Error finding reliable customer ID:', error);
    return '';
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