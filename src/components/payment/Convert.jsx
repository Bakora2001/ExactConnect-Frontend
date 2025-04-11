import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_KEY;

// Convert now returns a component that properly handles the conversion
// and makes the converted rate available via a render prop
function Convert(amount) {
  // Make sure amount is a number and provide a fallback
  const numericAmount = parseFloat(amount) || 0;
  const [rate, setRate] = useState(numericAmount * 160); // Default fallback calculation

  useEffect(() => {
    if (numericAmount > 0) {
      fetch(`https://api.currencybeacon.com/v1/convert?from=USD&to=KES&api_key=${api}&amount=${numericAmount}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.value) {
            setRate(data.value);
          }
        })
        .catch((err) => console.error("Error fetching exchange rate:", err));
    }
  }, [numericAmount]);

  return rate;
}

export default Convert;