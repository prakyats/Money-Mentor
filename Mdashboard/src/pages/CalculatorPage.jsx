import React from 'react';
import { motion } from 'framer-motion';
import { TVMCalculator } from '../components/TVMCalculator';
import { LoanCalculator } from '../components/LoanCalculator';

export const CalculatorPage = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <TVMCalculator isDarkMode={isDarkMode} />
      <LoanCalculator isDarkMode={isDarkMode} />
    </motion.div>
  );
};