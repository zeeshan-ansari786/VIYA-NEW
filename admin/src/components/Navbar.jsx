import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken, darkMode, setDarkMode }) => {
  return (
    <div className="flex items-center justify-between py-3 px-6 bg-white dark:bg-gray-800 shadow-md dark:shadow-lg transition-all">
      {/* Logo */}
      <img className="w-[120px] dark:invert" src={assets.logo} alt="Logo" />

      {/* Right Side Controls */}
      <div className="flex items-center gap-6">
        {/* Dark Mode Switch */}
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="hidden"
          />
          <div className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner transition-all">
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${
                darkMode ? 'translate-x-6 bg-gray-900' : ''
              }`}
            ></div>
          </div>
        </label>

        {/* Logout Button */}
        <button
          onClick={() => setToken('')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md text-sm transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
