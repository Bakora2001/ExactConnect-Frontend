import { useState, useContext } from "react";
import { Smartphone, Bitcoin } from "lucide-react";
import toast from "react-hot-toast";
import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from "../../context/DarkModeContext";
import { useLocation } from 'react-router-dom';
import Convert from "./Convert";

import { z } from "zod";

const numberSchema = z.object({
  phoneNumber: z.string()
    .regex(/^254\d{9}$/, "Phone number must start with 254 and have 12 digits in total")
    .length(12, "Phone number must be 10 digits"),
});

export default function PaymentPage() {
  const location = useLocation();
  const amount = location.state?.amount || 0;
  console.log(amount);
  const convertedAmount = Convert(amount)
  console.log(convertedAmount);
  const { darkMode } = useContext(DarkModeContext);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log(phoneNumber);
  const [transactionId, setTransactionId] = useState(null);
  const [errors, setErrors] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  // const pollPaymentStatus = async () => {
  //   try {
  //     const response = await fetch(`${SERVER_URL}/payments`);
  //     const result = await response.json();

  //     if (response.ok) {
  //       if (result.status === "completed") {
  //         toast.success("Payment received successfully!");
  //       } else {
  //         toast.error("Payment not completed. Please try again.");
  //       }
  //     } else {
  //       toast.error(`Error: ${result.error}`);
  //     }
  //   } catch (error) {
  //     toast.error("Error checking payment status.");
  //     console.error("Payment status check error:", error);
  //   } finally {
  //     setIsConfirming(false);
  //   }
  // };

  const handleSubmit = async () => {
    setErrors("");
    setIsConfirming(true);

    // Validate phone number with Zod
    const validation = numberSchema.safeParse({ phoneNumber });
    if (!validation.success) {
      setErrors(validation.error.errors[0].message);
      // toast.error(validation.error.errors[0].message);
      setIsConfirming(false);
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNumber: phoneNumber,
          amount: convertedAmount,
          description: "Test Payment",
          mode: "STK",
          provider: "MPESA",
          category: "COLLECTIONS",
          countryCode: "KE",
          currencyCode: "KES",
          createdBy: "tester",
          "metaData": {
            proxyId: "677143541944afe8afe51e6b",
            rating: "5",
            proxyCountryCode: "KE",
            isp: "Faiba",
            proxyState: "SHARED",
            requestedService: "PROXIES",
            customerId: "81324514-df6a-4fca-9717-d94fe00cad05"
          }
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("STK Push initiated. Please complete payment.");
        // setTransactionId(result.transaction_id);

        // const pollingInterval = setInterval(() => {
        //   pollPaymentStatus(result.transaction_id).then(() => {
        //     clearInterval(pollingInterval);
        //   });
        // }, 10000);
      } else {
        toast.error(`Error: ${result.error}`);
        setIsConfirming(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Payment initiation error:", error);
      setIsConfirming(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 ${darkMode ? "bg-[#131312] text-white" : "bg-gray-100 text-black"}`}>
      <div className={`w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg ${darkMode ? "bg-[#1e1e1e] border-gray-700" : "bg-white border-gray-200"} border transition-all ease-in-out duration-300`}>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Choose Your Payment Method</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Select your preferred payment option.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${paymentMethod === "mpesa" ? "border-green-500 scale-105" : "border-gray-300 hover:scale-105"} transition-all`}>
            <input type="radio" value="mpesa" name="paymentMethod" className="sr-only" checked={paymentMethod === "mpesa"} onChange={() => setPaymentMethod("mpesa")} />
            <Smartphone className="h-8 w-8 text-green-500" />
            <span className="font-medium">M-Pesa</span>
          </label>

          <label className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${paymentMethod === "litecoin" ? "border-yellow-500 scale-105" : "border-gray-300 hover:scale-105"} transition-all`}>
            <input type="radio" value="litecoin" name="paymentMethod" className="sr-only" checked={paymentMethod === "litecoin"} onChange={() => setPaymentMethod("litecoin")} />
            <Bitcoin className="h-8 w-8 text-yellow-500" />
            <span className="font-medium">Litecoin</span>
          </label>
        </div>

        {paymentMethod === "mpesa" && (
          <div className="mt-6">
            <label className="block text-sm font-medium">M-Pesa Phone Number</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="254XXXXXXXX" className={`w-full ${darkMode ? 'bg-[#1e1e1e] text-white' : ''} p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700`} />
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
          </div>
        )}

        {paymentMethod === "litecoin" && (
          <div className="mt-6">
            <label className="block text-sm font-medium">Litecoin Wallet Address</label>
            <input type="text" value="LTC1EXAMPLE123456789ABCDEFG" readOnly className="w-full p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Send payment to the address above.</p>
          </div>
        )}

        <button onClick={handleSubmit} disabled={isConfirming} className={`mt-8 w-full py-3 ${paymentMethod === "mpesa" ? "bg-green-600" : "bg-yellow-600"} text-white font-semibold rounded-lg hover:${paymentMethod === "mpesa" ? "bg-green-700" : "bg-yellow-700"} transition-all`}>
          {isConfirming ? "Confirming..." : paymentMethod === "mpesa" ? `Pay ${convertedAmount} with M-Pesa` : "Confirm Litecoin Payment"}
        </button>
      </div>
    </div>
  );
}
