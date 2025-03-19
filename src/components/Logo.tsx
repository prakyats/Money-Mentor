
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="inline-flex items-center gap-2 text-2xl font-display font-bold text-finance-700 transition-all duration-300 hover:text-finance-600"
    >
      <div className="w-8 h-8 bg-finance-600 rounded-lg flex items-center justify-center shadow-subtle">
        <span className="text-white font-bold text-lg">F</span>
      </div>
      <span>Finance</span>
    </Link>
  );
};

export default Logo;
