// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// import {SERVER_URL} from '../../services/data'

// const schema = z.object({
//   accountNumber: z
//     .string()
//     .regex(
//       /^254\d{9}$/,
//       "Phone number must start with 254 and have 12 digits in total"
//     )
//     .length(12, "Phone number must be 12 digits"),
// });

// function Subscription() {
//   const navigate = useNavigate();
//   const [transactionId, setTransactionId] = useState(null);
//   const [isConfirming, setIsConfirming] = useState(false); // New state for button
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });
//   // const session = JSON.parse(localStorage.getItem('session'));
//   // const token = session?.accessToken;
  
//   const pollPaymentStatus = async () => {
//     try {
//       const response = await fetch(`${SERVER_URL}/payments`, {
//         headers: {
       
//           "Content-Type": "application/json",
//         },
//       });
//       const result = await response.json();
  
//       if (response.ok) {
//         if (result.status === 'completed') {
//           toast.success("Payment received successfully!");
//           navigate("/lawyers"); 
//         } else {
//           toast.error("Payment not completed. Please try again.");
//         }
//       } else {
//         toast.error(`Error: ${result.error}`);
//       }
//     } catch (error) {
//       toast.error("Something went wrong while checking the payment status.");
//       console.error("Error during payment status check:", error);
//     } finally {
//       setIsConfirming(false); // Reset the button after checking the status
//     }
//   };
  
//   const onSubmit = async (data) => {
//     setIsConfirming(true); // Disable the button and show "Confirming"
//     try {
//       const response = await fetch(`${SERVER_URL}/payments`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
       
//         },
//         body: JSON.stringify({
//           accountNumber: data.accountNumber,
//           amount: 1,
//           description: "test",
//           mode: "STK",
//           provider: "MPESA",
//           category: "COLLECTIONS",
//           countryCode: "KE",
//           createdBy: "tester"
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success("STK Push initiated. Please complete the payment.");
//         setTransactionId(result.transaction_id);

//         const pollingInterval = setInterval(() => {
//           pollPaymentStatus(result.transaction_id).then(() => {
//             clearInterval(pollingInterval); 
//           });
//         }, 10000);
//       } else {
//         toast.error(`Error: ${result.error}`);
//         setIsConfirming(false); // Re-enable the button if there's an error
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//       setIsConfirming(false); // Re-enable the button if there's an error
//     }
//   };

//   // const { user, setUser } = useUser();

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('session');
//     navigate("/login")
//   }

//   return (
//     <div>
//       <Toaster position="top-right" />
//       <div className="flex justify-between items-center h-24 mx-auto px-4 bg-[#F2F5F5] w-full mb-3">
//         <h1 className="w-full text-3xl font-bold pl-7 text-[#37B9F1] hover:text-[#6ab6d6]">
//           <a href="#">Haki</a>
//         </h1>
//         <ul className="flex text-[#37B9F1] pr-7">
//           <a onClick={() => navigate("/home")}>
//             <li className="p-4 hover:text-[#242d2d] hover:scale-150 duration-300">
//               Home
//             </li>
//           </a>

//           <a onClick={() => navigate("/lawyers")}>
//             <li className="p-4 hover:text-[#242d2d] hover:scale-150 duration-300">
//               Lawyers
//             </li>
//           </a>

//           <a onClick={() => navigate("/subscriptions")}>
//             <li className="p-4 hover:text-[#242d2d] hover:scale-150 duration-300">
//               Subscribe
//             </li>
//           </a>
//         </ul>
//         <button
//           onClick={handleLogout}
//           type="button"
//           className="text-white bg-[#37B9F1] text-xl hover:bg-[#40a8d4] focus:ring-4 focus:outline-none font-medium rounded-lg px-4 py-2 text-center mr-8"
//         >
//           Logout
//         </button>
//       </div>
//       <div
//         id="Plans"
//         className="flex items-center w-full py-[6rem] px-4 bg-[#F2F5F5] mb-5"
//       >
//         <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-52 items-center">
//           <div className="w-[400px] mx-auto my-4 rounded-full">
//             <img src="/assets/Subscribe-01.png" alt="Subscription" />
//           </div>

//           <div className="w-full shadow-2xl bg-[#F2F5F5] text-[#242d2d] flex flex-col py-12 px-0 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
//             <img
//               className="w-20 mx-auto mt-[3rem] bg-transparent"
//               src="/assets/reshot-icon-justice-XH4D3B8RWF.svg"
//               alt="Justice Icon"
//             />
//             <h2 className="text-2xl font-bold text-center py-8 text-[#242d2d]">
//               Membership
//             </h2>
//             <p className="text-center text-4xl font-bold">KES 150/Month</p>
//             <div className="text-center font-medium">
//               <p className="py-2 border-b mx-8 mt-8"> Unrestricted Access</p>
//               <p className="py-2 border-b mx-8">Direct Contact with Lawyers</p>
//               <p className="py-2 border-b mx-8">24hr Support</p>
//               <h4 className="py-2 border- mx-8 text-">
//                 Please enter your MPesa number below to <br />
//                 complete the payment
//               </h4>
//             </div>
//             <div>
//               <img
//                 className="h-[100px] flex justify-center ml-28"
//                 src="/src/assets/M-PESA-logo-2.png"
//               />
//             </div>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="w-full max-w-sm mt-3 p-9"
//             >
//               <div className="flex items-center border-b border-[#37B9F1]">
//                 <input
//                   {...register("accountNumber")}
//                   className="appearance-none bg-transparent border-none w-full text-[#242d2d]  mr-3 py-1 px-2 leading-tight focus:outline-none"
//                   type="text"
//                   placeholder="254XXXXXXXX"
//                   aria-label="Phone number"
//                   disabled={isConfirming} // Disable input while confirming
//                 />
//                 <button
//                   className={`flex-shrink-0 ${isConfirming ? 'bg-gray-500' : 'bg-[#0b8511]'} hover:bg-[#0b8511c4] text-sm border-4 text-white py-1 px-2 rounded-lg`}
//                   type="submit"
//                   disabled={isConfirming} // Disable the button while confirming
//                 >
//                   {isConfirming ? "Confirming..." : "Subscribe"}
//                 </button>
//               </div>
//               {errors.accountNumber && (
//                 <p className="text-red-500 text-xs italic mt-1">
//                   {errors.accountNumber.message}
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // export default Subscription;
// // import React from 'react'

function Mpesa() {
  return (
    <div>Mpesa</div>
  )
}

export default Mpesa