import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  PieChart,
  IndianRupee,
  TrendingUp,
  Calculator,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';

export const Sidebar = ({ isDarkMode, toggleDarkMode, isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: PieChart, label: 'Expenses', path: '/expenses' },
    { icon: IndianRupee, label: 'Budget', path: '/budget' },
    { icon: TrendingUp, label: 'Investments', path: '/investments' },
    { icon: Calculator, label: 'Calculator', path: '/calculator' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        onClick={onToggle}
        className={`fixed top-4 left-4 z-50 p-2 rounded-lg ${isDarkMode ? 'bg-dark-200' : 'bg-gray-200'} text-yellow-400 md:hidden`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className={`
        fixed top-0 left-0 h-screen ${isDarkMode ? 'bg-dark-100' : 'bg-white'} border-r ${isDarkMode ? 'border-dark-200' : 'border-gray-200'}
        transition-all duration-300 ease-in-out z-40 w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className={`
          flex items-center p-4 mb-8
          ${isOpen ? 'justify-start' : 'justify-center md:justify-start'}
        `}>
          <IndianRupee className="w-8 h-8 text-yellow-400" />
          <h1 className={`
            text-xl font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} whitespace-nowrap
            ${isOpen ? 'block' : 'hidden md:block'}
          `}>
            Money Mentor
          </h1>
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center w-full p-3 mb-2 rounded-lg
                ${isActive(item.path) 
                  ? 'bg-yellow-400 text-black' 
                  : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:bg-yellow-400/10 hover:text-yellow-400`
                }
                ${isOpen ? 'justify-start px-4' : 'justify-center md:justify-start md:px-4'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className={`
                ml-3
                ${isOpen ? 'block' : 'hidden md:block'}
              `}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </nav>

        <button
          onClick={toggleDarkMode}
          className={`
            flex items-center p-3 rounded-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
            hover:bg-yellow-400/10 hover:text-yellow-400 mb-4 mx-2
            ${isOpen ? 'justify-start px-4' : 'justify-center md:justify-start md:px-4'}
          `}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className={`
            ml-3
            ${isOpen ? 'block' : 'hidden md:block'}
          `}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </>
  );
};