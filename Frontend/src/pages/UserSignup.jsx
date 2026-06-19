import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Context/UserContext.jsx';
import axios from 'axios';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  
  const navigate = useNavigate();
  
  const { User, setUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullName: fullName,
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.User)
      localStorage.setItem('token', data.token);
      navigate('/Home');
    }

    setFullName('');
    setEmail('');
    setPassword('');
  };
  

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          /> */}

                              <h1 className='text-4xl font-extrabold tracking-tight text-black'>Ride<span className='text-[#10b461]'>Now</span></h1>

          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <br />
            <h2 className="text-lg font-medium mb-2">Enter Your FullName</h2>
            <div className="flex gap-4 mb-7">
              <input
                required
                value={fullName}
                className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg text-center placeholder:text-base"
                placeholder="Enter fullname"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />
            <h3 className="text-lg font-medium mb-1">Password</h3>
            <input
              required
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Create account
            </button>
          </form>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/userlogin" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{' '}
            <span className="underline">Google Privacy Policy</span> and{' '}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
