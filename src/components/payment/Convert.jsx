import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_KEY
// console.log(api)
//To be tested on production
function Convert(amount) {
  const [rate, setRate] = useState(160); // Default fallback rate


  useEffect(() => {
    fetch(`https://api.currencybeacon.com/v1/convert?from=USD&to=KES&api_key=${api}&amount=${amount}
`)
      .then((res) => res.json())
      .then((data) => setRate(data.value))
      .catch((err) => console.error("Error fetching exchange rate:", err));
  }, []);

  return rate;
}

export default Convert




// import { useState, useEffect } from 'react';

// function Convert(amount) {
//   const [rate, setRate] = useState(160); // Default fallback rate
//   const api = import.meta.env.VITE_API_KEY;

//   useEffect(() => {
//     // Check if api key is available before making the request
//     if (api) {
//       fetch(`https://api.currencybeacon.com/v1/convert?from=USD&to=KES&api_key=${api}&amount=${amount}`)
//         .then((res) => res.json())
//         .then((data) => setRate(data.value))
//         .catch((err) => {
//           console.error("Error fetching exchange rate:", err);
//           // Keep using fallback rate in case of errors
//         });
//     } else {
//       console.warn("API key is undefined. Using fallback conversion rate.");
//       // Using fallback rate when API key is not available
//     }
//   }, [amount, api]); // Add amount and api as dependencies

//   // Calculate the converted amount using the current rate
//   const convertedAmount = amount * rate;
//   return convertedAmount;
// }

// export default Convert;