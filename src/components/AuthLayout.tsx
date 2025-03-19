
import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - decorative panel */}
      <div className="hidden md:flex md:w-1/2 bg-black p-10 text-white">
        <div className="flex flex-col h-full w-full justify-between">
          <Logo />
          <div className="space-y-6 max-w-lg">
            <motion.h1 
              className="text-4xl lg:text-5xl font-display font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Take control of your financial future
            </motion.h1>
            <motion.p 
              className="text-lg opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Simple, intuitive tools to help you manage your money, track expenses, and achieve your financial goals.
            </motion.p>
            <motion.div 
              className="grid grid-cols-2 gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-yellow-400/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-3xl font-bold">97%</div>
                <div className="text-sm opacity-80">Customer satisfaction</div>
              </div>
              <div className="bg-yellow-400/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-3xl font-bold">250K+</div>
                <div className="text-sm opacity-80">Active users</div>
              </div>
            </motion.div>
          </div>
          <div className="text-sm opacity-70">
            © 2023 Money Mentor. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Right side - auth forms */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-6 md:hidden">
          <Logo />
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            className="w-full max-w-md space-y-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-display font-bold tracking-tight">{title}</h2>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
            
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
