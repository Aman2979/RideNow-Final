// import React from "react";

// const WaitingForDriver = (props) => {
//   return (
//     <div>
//       <h5
//         className="p-1 text-center w-[93%] absolute top-0"
//         onClick={() => {
//           props.setWaitingForDriver(false);
//         }}
//       >
//         <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
//       </h5>

//       <div className="flex-col flex items-center justify-between">
//         <img
//           className="h-12"
//           src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
//           alt=""
//         />

//         <div className="text-right">
//           <h2 className="text-lg font-medium capitalize">
//             {props.ride?.captain?.fullname?.firstname}
//           </h2>

//           <h4 className="text-xl font-semibold -mt-1 -mb-1">
//             {props.ride?.captain?.vehicle?.plate}
//           </h4>

//           <p className="text-sm text-gray-600">
//             {props.ride?.captain?.vehicle?.vehicleType}
//           </p>

//           {/* OTP */}
//           <h1 className="text-lg font-semibold mt-2">
//             OTP : {props.ride?.otp}
//           </h1>

//           {/* Mobile Number */}
//           <div className="bg-gray-100 p-3 rounded-lg mt-3">
//             <h3 className="text-sm text-gray-500">Captain Mobile Number</h3>

//             <p className="text-lg font-semibold">
//               {props.ride?.captain?.mobNumber}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-2 justify-between flex-col items-center">
//         <div className="w-full mt-5">
//           {/* Pickup */}
//           <div className="flex items-center gap-5 p-3 border-b-2">
//             <i className="ri-map-pin-user-fill"></i>

//             <div>
//               <h3 className="text-lg font-medium">Pickup</h3>

//               <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
//             </div>
//           </div>

//           {/* Destination */}
//           <div className="flex items-center gap-5 p-3 border-b-2">
//             <i className="text-lg ri-map-pin-2-fill"></i>

//             <div>
//               <h3 className="text-lg font-medium">Destination</h3>

//               <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
//             </div>
//           </div>

//           {/* Fare */}
//           <div className="flex items-center gap-5 p-3">
//             <i className="ri-currency-line"></i>

//             <div>
//               <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>

//               <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WaitingForDriver;

import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div className="px-3 py-2">

      {/* Close Button */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Captain Info */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm mt-5 border">

        <img
          className="h-16 rounded-xl object-cover"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />

        <div className="text-right">

          <h2 className="text-xl font-semibold capitalize">
            {props.ride?.captain?.fullname?.firstname}
          </h2>

          <h4 className="text-lg font-bold">
            {props.ride?.captain?.vehicle?.plate}
          </h4>

          <p className="text-sm text-gray-500 capitalize">
            {props.ride?.captain?.vehicle?.vehicleType}
          </p>

        </div>
      </div>

      {/* OTP + Mobile */}
      <div className="grid grid-cols-2 gap-3 mt-4">

        <div className="bg-black text-white rounded-2xl p-4 text-center">

          <p className="text-sm text-gray-300">
            OTP
          </p>

          <h1 className="text-2xl font-bold tracking-widest mt-1">
            {props.ride?.otp}
          </h1>

        </div>

        <div className="bg-white border rounded-2xl p-4">

          <p className="text-sm text-gray-500">
            Captain Mobile
          </p>

          <h2 className="text-lg font-semibold mt-1">
            {props.ride?.captain?.mobNumber}
          </h2>

        </div>
      </div>

      {/* Trip Details */}
      <div className="bg-white rounded-2xl shadow-sm border mt-5">

        {/* Pickup */}
        <div className="flex items-start gap-4 p-4 border-b">

          <i className="ri-map-pin-user-fill text-xl text-green-600"></i>

          <div>

            <h3 className="font-medium">
              Pickup
            </h3>

            <p className="text-sm text-gray-500">
              {props.pickup}
            </p>

          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-4 p-4 border-b">

          <i className="ri-map-pin-2-fill text-xl text-red-500"></i>

          <div>

            <h3 className="font-medium">
              Destination
            </h3>

            <p className="text-sm text-gray-500">
              {props.destination}
            </p>

          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-4 p-4">

          <i className="ri-currency-line text-xl text-yellow-600"></i>

          <div>

            <h3 className="font-medium">
              ₹{props.ride?.fare}
            </h3>

            <p className="text-sm text-gray-500">
              Cash Payment
            </p>

          </div>
        </div>
      </div>

    </div>
  );
};

export default WaitingForDriver;