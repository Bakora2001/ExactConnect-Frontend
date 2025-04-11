
/**
 * Formats a phone number to ensure it's in the correct format for M-Pesa transactions
 * Converts various formats to start with 254 (Kenya's country code)
 * 
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - The formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Check if the number starts with 0, replace with 254
  if (digitsOnly.startsWith('0') && digitsOnly.length === 10) {
    return '254' + digitsOnly.substring(1);
  }
  
  // Check if the number starts with 7 or 1, add 254
  if ((digitsOnly.startsWith('7') || digitsOnly.startsWith('1')) && digitsOnly.length === 9) {
    return '254' + digitsOnly;
  }
  
  // Already in international format with 254
  if (digitsOnly.startsWith('254') && digitsOnly.length === 12) {
    return digitsOnly;
  }
  
  // Handle +254 format
  if (phoneNumber.startsWith('+254')) {
    return digitsOnly;
  }
  
  // Default case: return as is
  return digitsOnly;
};