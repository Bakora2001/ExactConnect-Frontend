//Section to retreive the user details from the localstorage
export const userDetails = JSON.parse(localStorage.getItem('userDetails'));

//Extracting the first name
export const firstName = userDetails?.firstName;

//Extracting the last name
export const lastName = userDetails?.lastName;

//Extracting the email
export const email = userDetails?.email;

//Extracting the customer reference
export const customerId = userDetails?.customerReference;
