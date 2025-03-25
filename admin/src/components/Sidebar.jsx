import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-[#F5F5FA] shadow-md">
      <div className="flex flex-col gap-4 pt-6 pl-[15%] text-[15px]">

        <NavLink 
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive 
                ? 'bg-blue-600 text-white font-semibold shadow-md' 
                : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm'
            }`
          } 
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add Items" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink 
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive 
                ? 'bg-blue-600 text-white font-semibold shadow-md' 
                : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm'
            }`
          } 
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List Items" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink 
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive 
                ? 'bg-blue-600 text-white font-semibold shadow-md' 
                : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm'
            }`
          } 
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
