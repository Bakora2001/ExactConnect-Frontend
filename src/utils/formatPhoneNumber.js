//Section to convert phone numbers
export const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith('0') && phoneNumber.length === 10) {
    return `254${phoneNumber.slice(1)}`;
  }
  return phoneNumber;
};
