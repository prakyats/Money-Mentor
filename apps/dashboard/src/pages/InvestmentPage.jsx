import React from 'react';
import { motion } from 'framer-motion';
import { RiskCalculator } from '../components/RiskCalculator';
import { TaxCalculator } from '../components/TaxCalculator';

export const InvestmentPage = ({ profile, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <RiskCalculator profile={profile} isDarkMode={isDarkMode} />
      <TaxCalculator isDarkMode={isDarkMode} />
    </motion.div>
  );
};