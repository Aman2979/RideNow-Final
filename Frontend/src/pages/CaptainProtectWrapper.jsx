import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainContex.jsx';

// function created and check the children
const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('captainToken');
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to handle side effects like navigation
  useEffect(() => {
    if (!token) {
      navigate('/captainlogin'); // Redirect if no token is found
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/caption/profilecaptain`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem('captainToken');
        navigate('/captainlogin');
      });
  }, [token, navigate, setCaptain]); // Dependencies: token and navigate

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
