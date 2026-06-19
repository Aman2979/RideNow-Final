import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../Context/UserContext.jsx';

const Userlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const {User, setUser} = useContext(UserDataContext)
    
    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        }
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
        console.log(response);
       
        if (response.status === 200) {
            const data = response.data;
            setUser(data.user)
            console.log(data)
            localStorage.setItem('token', data.token)
           
            navigate('/Home')
        }
        console.log(import.meta.env.VITE_BASE_URL);

        setEmail('')
        setPassword('')

    };

    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                    {/* Replaced Uber image with RideNow branding */}
                    <h1 className='text-4xl font-extrabold tracking-tight text-black'>Ride<span className='text-[#10b461]'>Now</span></h1>
                    <br />
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <h2 className='text-lg font-medium mb-2'>What's your email</h2>
                        <input required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                            type="email"
                            placeholder='email@example.com'
                        />

                        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                        <input required
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                            placeholder='password'
                        />

                        <h3 className='text-lg font-medium mb-2'>login</h3>
                        <button
                            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                        >Login</button>
                    </form>
                    <p className='text-center'>New here? <Link to='/Usersignup' className='text-blue-600'>Create new Account</Link></p>
                </div>
                <div>
                    <Link
                        to='/captainlogin'
                        className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                    >Sign in as Captain</Link>
                </div>
            </div>

        </div>
    )
}

export default Userlogin