import React from 'react';
import { motion } from 'framer-motion';
import { BudgetCalculator } from '../components/BudgetCalculator';
import { CategoryBudget } from '../components/CategoryBudget';
import { BudgetAlerts } from '../components/BudgetAlerts';

export const BudgetPage = ({ profile, expenses, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <BudgetCalculator profile={profile} expenses={expenses} isDarkMode={isDarkMode} />
      <BudgetAlerts profile={profile} expenses={expenses} isDarkMode={isDarkMode} />
      <CategoryBudget expenses={expenses} isDarkMode={isDarkMode} />
    </motion.div>
  );
};