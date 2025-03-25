import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-animation"></div>

      <form onSubmit={onSubmitHandler} className="relative z-10 flex flex-col items-center w-[90%] sm:max-w-[400px] bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-gray-800 dark:text-gray-200 transition-all">
        <div className="inline-flex items-center gap-2 mb-4">
          <p className="font-bold text-3xl">{currentState}</p>
          <hr className="border-none h-[2px] w-8 bg-gray-800 dark:bg-gray-200" />
        </div>

        {currentState === 'Login' ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-800 dark:border-gray-400 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
            placeholder="Full Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-800 dark:border-gray-400 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
          placeholder="Email"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-800 dark:border-gray-400 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-sm mt-2 text-gray-600 dark:text-gray-400">
          <p className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-all">Forgot Password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-all">
              Create Account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-all">
              Login Here
            </p>
          )}
        </div>

        <button className="bg-gray-900 dark:bg-gray-700 text-white font-semibold px-8 py-3 mt-4 rounded-md shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-all">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
