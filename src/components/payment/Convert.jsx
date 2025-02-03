import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_KEY

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
