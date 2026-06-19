// import React from 'react'
// import { Link } from 'react-router-dom'

// const Start = () => {
//   return (
//     <div>

//       <div className='bg-cover bg-center bg-[url("https://upload.wikimedia.org/wikipedia/commons/9/91/Modern_British_LED_Traffic_Light.jpg")] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
//         <img className='w-16 ml-8' src="" alt="RIDE NOW" />
//         <div className='bg-white pb-7 py-4 px-4'>
//           <h2 className='text-3xl font-bold'>Getting started with RIDENOW</h2>
//           <h1>.</h1>
//           <Link to='/userlogin' className='flex items-center justify-center w-full bg-black text-white py-2 px-20 rounded-xl'>Continue</Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Start

import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-cover bg-center bg-[url("https://upload.wikimedia.org/wikipedia/commons/9/91/Modern_British_LED_Traffic_Light.jpg")] h-screen flex flex-col justify-end w-full'>
      <div className='bg-white pb-8 pt-6 px-6 rounded-t-2xl shadow-lg'>
        <h2 className='text-3xl font-bold mb-4'>Getting started with <span className='text-[#10b461]'>RIDENOW</span></h2>
        <Link 
          to='/userlogin' 
          className='flex items-center justify-center w-full bg-black text-white py-3 rounded-xl text-lg font-semibold'
        >
          Continue
        </Link>
      </div>
    </div>
  )
}

export default Start