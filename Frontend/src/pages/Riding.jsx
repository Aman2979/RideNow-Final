// import React from "react";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom"; // Added useLocation
// import { useEffect, useContext } from "react";
// import { SocketContext } from "../Context/SocketContext.jsx";

// import { useNavigate } from "react-router-dom";
// import LiveTraking from "../components/LiveTraking";

// const Riding = () => {
//   const location = useLocation();
//   const { ride } = location.state || {}; // Retrieve ride data
//   const { socket } = useContext(SocketContext);
//   const navigate = useNavigate();
//   const handlePayment = async () => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/payment/create-checkout-session`,
//         {
//           rideId: ride?._id,
//         },
//       );

//       //  Stripe page open
//       window.open(response.data.url, "_blank");
//     } catch (error) {
//       console.error("Payment Error:", error);
//     }
//   };

//   // socket.on("ride-ended", () => {
//   //   navigate("/home");
//   // });

//   useEffect(() => {
//     socket.on("ride-ended", () => {
//       navigate("/home");
//     });

//     return () => {
//       socket.off("ride-ended");
//     };
//   }, []);

//   return (
//     <div className="h-screen">
//       <Link
//         to="/home"
//         className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
//       >
//         <i className="text-lg font-medium ri-home-5-line"></i>
//       </Link>
//       <div className="h-1/2">
//         <LiveTraking />
//       </div>
//       <div className="h-1/2 p-4">
//         <div className="flex items-center justify-between">
//           <img
//             className="h-12"
//             src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
//             alt=""
//           />
//           <div className="text-right">
//             <h2 className="text-lg font-medium capitalize">
//               {ride?.captain?.fullname?.firstname}
//             </h2>
//             <h4 className="text-xl font-semibold -mt-1 -mb-1">
//               {ride?.captain.vehicle.plate}
//             </h4>
//             <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
//           </div>
//         </div>

//         <div className="flex gap-2 justify-between flex-col items-center">
//           <div className="w-full mt-5">
//             <div className="flex items-center gap-5 p-3 border-b-2">
//               <i className="text-lg ri-map-pin-2-fill"></i>
//               <div>
//                 <h3 className="text-lg font-medium">562/11-A</h3>
//                 <p className="text-sm -mt-1 text-gray-600">
//                   {ride?.destination}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-5 p-3">
//               <i className="ri-currency-line"></i>
//               <div>
//                 <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
//                 <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={handlePayment}
//           className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
//         >
//           Make a Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Riding;

import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../Context/SocketContext.jsx";
import LiveTraking from "../components/LiveTraking";

const Riding = () => {

  const location = useLocation();

  const { ride } = location.state || {};

  const { socket } = useContext(SocketContext);

  const navigate = useNavigate();

  const handlePayment = async () => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment/create-checkout-session`,
        {
          rideId: ride?._id,
        }
      );

      // Open Stripe Payment Page
      window.open(response.data.url, "_blank");

    } catch (error) {

      console.error("Payment Error:", error);

    }
  };

  useEffect(() => {

    socket.on("ride-ended", () => {
      navigate("/home");
    });

    return () => {
      socket.off("ride-ended");
    };

  }, []);

  return (
    <div className="h-screen bg-gray-50">

      {/* Home Button */}
      <Link
        to="/home"
        className="fixed right-4 top-4 h-10 w-10 bg-white shadow-md flex items-center justify-center rounded-full z-10"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      {/* Live Tracking */}
      <div className="h-1/2">
        <LiveTraking />
      </div>

      {/* Ride Details */}
      <div className="h-1/2 p-4">

        {/* Captain Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border flex items-center justify-between">

          <img
            className="h-16 rounded-xl object-cover"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />

          <div className="text-right">

            <h2 className="text-xl font-semibold capitalize">
              {ride?.captain?.fullname?.firstname}
            </h2>

            <h4 className="text-lg font-bold">
              {ride?.captain?.vehicle?.plate}
            </h4>

            <p className="text-sm text-gray-500 capitalize">
              {ride?.captain?.vehicle?.vehicleType}
            </p>

            {/* Mobile Number */}
            <div className="mt-2 bg-gray-100 px-3 py-2 rounded-lg">

              <p className="text-xs text-gray-500">
                Captain Mobile
              </p>

              <h3 className="text-base font-semibold">
                {ride?.captain?.mobNumber}
              </h3>

            </div>

          </div>
        </div>

        {/* Ride Info */}
        <div className="bg-white rounded-2xl shadow-sm border mt-5">

          {/* Destination */}
          <div className="flex items-start gap-4 p-4 border-b">

            <i className="text-xl text-red-500 ri-map-pin-2-fill"></i>

            <div>

              <h3 className="text-lg font-medium">
                Destination
              </h3>

              <p className="text-sm text-gray-600">
                {ride?.destination}
              </p>

            </div>
          </div>

          {/* Fare */}
          <div className="flex items-start gap-4 p-4">

            <i className="text-xl text-green-600 ri-currency-line"></i>

            <div>

              <h3 className="text-lg font-medium">
                ₹{ride?.fare}
              </h3>

              <p className="text-sm text-gray-600">
                Cash Payment
              </p>

            </div>
          </div>

        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 transition-all text-white font-semibold p-3 rounded-xl"
        >
          Make a Payment
        </button>

      </div>
    </div>
  );
};

export default Riding;