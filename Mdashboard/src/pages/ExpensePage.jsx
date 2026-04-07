import React from 'react';
import { motion } from 'framer-motion';
import { ExpenseTracker } from '../components/ExpenseTracker';
import { ExpenseInsights } from '../components/ExpenseInsights';

export const ExpensePage = ({ expenses, onAddExpense, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <ExpenseTracker expenses={expenses} onAddExpense={onAddExpense} isDarkMode={isDarkMode} />
      <ExpenseInsights expenses={expenses} isDarkMode={isDarkMode} />
    </motion.div>
  );
};