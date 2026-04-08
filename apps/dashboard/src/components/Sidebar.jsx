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
  LogOut,
  UserCircle2,
} from 'lucide-react';

export const Sidebar = ({ isDarkMode, toggleDarkMode, isOpen, onToggle, onClose, user, onSignOut }) => {
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
  const displayName = user?.fullName || user?.name || user?.email || 'Preview User';
  const displayEmail = user?.email || 'local preview';

  const closeSidebar = () => {
    if (typeof onClose === 'function') {
      onClose();
      return;
    }

    if (isOpen) {
      onToggle();
    }
  };

  const handleNavigate = (path) => {
    navigate(path);

    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/55 backdrop-blur-[2px] md:hidden"
        />
      ) : null}

      <button
        type="button"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        onClick={onToggle}
        className={`
          fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-2xl border shadow-lg transition-all duration-200 md:hidden
          ${isDarkMode ? 'border-dark-200 bg-dark-100 text-yellow-400' : 'border-dark-200 bg-dark-100 text-amber-400'}
        `}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-dvh w-[86vw] max-w-sm flex-col overflow-hidden border-r shadow-2xl transition-transform duration-300 ease-out md:sticky md:top-0 md:h-screen md:w-64 md:max-w-none md:translate-x-0 md:shadow-none
          ${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="shrink-0 border-b border-white/5 px-4 pb-4 pt-5 md:border-0 md:pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-400/15 text-yellow-400 shadow-inner shadow-yellow-400/10">
              <IndianRupee className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className={`text-base font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Money Mentor
              </h1>
              <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Your money, organized
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={closeSidebar}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border md:hidden ${isDarkMode ? 'border-dark-200 bg-dark-200 text-gray-200' : 'border-gray-200 bg-gray-50 text-gray-700'}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between px-4 pb-4 pt-4">
          <div>
          <div className={`mb-3 rounded-2xl border p-3 ${isDarkMode ? 'border-dark-200 bg-dark-200/60' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-400">
                <UserCircle2 className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className={`truncate text-sm font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {displayName}
                </p>
                <p className={`truncate text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {displayEmail}
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigate(item.path)}
                className={`
                  flex min-h-[44px] w-full items-center rounded-2xl px-4 py-2.5 text-left transition-colors
                  ${isActive(item.path)
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                    : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:bg-yellow-400/10 hover:text-yellow-400`
                  }
                `}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                <span className="ml-3 truncate text-sm font-semibold leading-none">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="mt-4 space-y-2.5">
            <button
              onClick={toggleDarkMode}
              className={`
                flex min-h-[44px] w-full items-center rounded-2xl px-4 py-2.5 transition-colors
                ${isDarkMode ? 'text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400' : 'text-gray-600 hover:bg-yellow-400/10 hover:text-yellow-500'}
              `}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="ml-3 text-sm font-semibold leading-none">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>

            <button
              onClick={onSignOut}
              className="flex min-h-[44px] w-full items-center rounded-2xl border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Sign Out</span>
            </button>
          </div>
          </div>
        </div>
      </aside>
    </>
  );
};