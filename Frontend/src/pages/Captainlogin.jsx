import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContex.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Captainlogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captaindata = {
      email: email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/caption/logincaptain`,
      captaindata,
    );
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("captainToken", data.token);

      navigate("/captainhome");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Ride<span className="text-[#10b461]">Now</span>
          </h1>

          <h1>.</h1>
          <br />
          <form onSubmit={(e) => submitHandler(e)}>
            <h2 className="text-lg font-medium mb-2">What's your email</h2>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              placeholder="password"
            />
            <h3 className="text-lg font-medium mb-2">Login</h3>
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Login
            </button>
          </form>
          <p className="text-center">
            Join a fleet?{" "}
            <Link to="/captainsignup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/Usersignup"
            className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Captainlogin;
