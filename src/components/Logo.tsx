
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="inline-flex items-center gap-2 text-2xl font-display font-bold text-yellow-400 transition-all duration-300 hover:text-yellow-300"
    >
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-subtle">
        <span className="text-yellow-400 font-bold text-lg">M</span>
      </div>
      <span>Money Mentor</span>
    </Link>
  );
};

export default Logo;
