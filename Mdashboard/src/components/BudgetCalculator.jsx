import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, AlertTriangle } from 'lucide-react';

export const BudgetCalculator = ({ profile, expenses, isDarkMode }) => {
  const monthlyBudget = (profile.annualIncome * (1 - profile.savingsGoal / 100)) / 12;
  
  const currentMonthExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      const currentDate = new Date();
      return (
        expenseDate.getMonth() === currentDate.getMonth() &&
        expenseDate.getFullYear() === currentDate.getFullYear()
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const percentageUsed = (currentMonthExpenses / monthlyBudget) * 100;
  
  const getProgressColor = () => {
    if (percentageUsed >= 90) return 'bg-red-500';
    if (percentageUsed >= 75) return 'bg-yellow-500';
    return 'bg-yellow-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <IndianRupee className="w-6 h-6 mr-2 text-yellow-400" />
        Monthly Budget
      </h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Monthly Budget</span>
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{monthlyBudget.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Current Expenses</span>
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{currentMonthExpenses.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Remaining</span>
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{(monthlyBudget - currentMonthExpenses).toFixed(2)}
            </span>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-900 bg-yellow-400">
                  Budget Usage
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-yellow-400">
                  {percentageUsed.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${isDarkMode ? 'bg-dark-300' : 'bg-gray-200'}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentageUsed, 100)}%` }}
                transition={{ duration: 0.5 }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor()}`}
              />
            </div>
          </div>

          {percentageUsed >= 90 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center p-4 mt-4 text-yellow-400 bg-yellow-400/10 rounded-lg border border-yellow-400/20"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span>Warning: You're close to or exceeding your monthly budget!</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};