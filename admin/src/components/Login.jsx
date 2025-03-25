import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full relative">
      
      {/* Live Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradientBlur"></div>

      {/* Login Card */}
      <div className="relative bg-white shadow-lg rounded-xl px-8 py-8 max-w-md w-full z-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Admin Panel</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              type="email" 
              placeholder="your@email.com" 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              type="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>

          <button 
            className="mt-4 w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
