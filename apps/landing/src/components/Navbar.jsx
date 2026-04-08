import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isVisible = false }) {
  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-dark-100/70 backdrop-blur-xl transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-4 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-lg font-black text-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.12)]">
            ₹
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-200/70 sm:text-sm sm:tracking-[0.3em]">Money Mentor</p>
            <p className="hidden text-xs text-gray-400 sm:block">Your financial command center</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="/#features" className="text-sm font-medium text-gray-300 transition hover:text-white">Features</a>
          <a href="/#how-it-works" className="text-sm font-medium text-gray-300 transition hover:text-white">How it works</a>
          <a href="/#faq" className="text-sm font-medium text-gray-300 transition hover:text-white">FAQ</a>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto sm:justify-end">
          <Link
            to="/login"
            className="flex-1 rounded-full border border-white/10 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-yellow-400/40 hover:bg-white/5 sm:flex-none"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="flex-1 rounded-full bg-yellow-400 px-4 py-2 text-center text-sm font-semibold text-dark-100 transition hover:bg-yellow-300 sm:flex-none"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;