import React from 'react';
import { motion } from 'framer-motion';
import { FinancialOverview } from '../components/FinancialOverview';
import { ExpenseInsights } from '../components/ExpenseInsights';
import { MonthlyTrends } from '../components/MonthlyTrends';
import { SavingsProgress } from '../components/SavingsProgress';
import { ProfileSetup } from '../components/ProfileSetup';
import { ExpenseTracker } from '../components/ExpenseTracker';

export const Dashboard = ({ profile, expenses, onSaveProfile, onAddExpense, isDarkMode }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8"
      >
        <ProfileSetup profile={profile} onSave={onSaveProfile} isDarkMode={isDarkMode} />
        <FinancialOverview profile={profile} expenses={expenses} isDarkMode={isDarkMode} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8"
      >
        <SavingsProgress profile={profile} expenses={expenses} isDarkMode={isDarkMode} />
        <ExpenseTracker expenses={expenses} onAddExpense={onAddExpense} isDarkMode={isDarkMode} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8"
      >
        <ExpenseInsights expenses={expenses} isDarkMode={isDarkMode} />
        <MonthlyTrends expenses={expenses} isDarkMode={isDarkMode} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-4 rounded-lg border p-4 sm:p-5 ${
          isDarkMode
            ? 'bg-dark-100 border-dark-200 text-gray-300'
            : 'bg-white border-gray-200 text-gray-700'
        }`}
      >
        <p className="text-sm sm:text-base">
          Assistant integration is available and can be connected to your hosted backend endpoint when you are ready.
        </p>
      </motion.div>
    </>
  );
};