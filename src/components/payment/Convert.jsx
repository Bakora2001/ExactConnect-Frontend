import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_KEY

function Convert({ amount }) {
  const [rate, setRate] = useState(160); // Default fallback rate

  useEffect(() => {
    fetch(`https://api.currencyscoop.com/v1/convert?from=USD&to=KES&amount=${amount}&api_key=${api}`)
      .then((res) => res.json())
      .then((data) => setRate(data.rates.KES))
      .catch((err) => console.error("Error fetching exchange rate:", err));
  }, []);

  return rate;
}

export default Convert
