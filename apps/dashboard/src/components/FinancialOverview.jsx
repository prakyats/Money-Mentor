import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export const FinancialOverview = ({ profile = {}, expenses = [], isDarkMode = false }) => {
  const monthlyIncome = profile.annualIncome ? profile.annualIncome / 12 : 0;

  const currentMonthExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      const currentDate = new Date();
      return (
        expenseDate.getMonth() === currentDate.getMonth() &&
        expenseDate.getFullYear() === currentDate.getFullYear()
      );
    })
    .reduce((sum, expense) => sum + (expense.amount || 0), 0);

  const savingsGoalPercentage = profile.savingsGoal || 0;
  const monthlySavingsGoal = monthlyIncome * (savingsGoalPercentage / 100);
  const currentSavings = monthlyIncome - currentMonthExpenses;
  const savingsProgress =
    monthlySavingsGoal > 0 ? (currentSavings / monthlySavingsGoal) * 100 : 0;

  const metrics = [
    {
      title: 'Monthly Income',
      value: monthlyIncome.toFixed(2),
      icon: IndianRupee,
      color: 'text-green-500',
      bgColor: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
    },
    {
      title: 'Monthly Expenses',
      value: currentMonthExpenses.toFixed(2),
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: isDarkMode ? 'bg-red-500/10' : 'bg-red-50',
    },
    {
      title: 'Current Savings',
      value: currentSavings.toFixed(2),
      icon: Wallet,
      color: 'text-blue-500',
      bgColor: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
    },
    {
      title: 'Savings Goal',
      value: monthlySavingsGoal.toFixed(2),
      icon: TrendingUp,
      color: 'text-yellow-400',
      bgColor: isDarkMode ? 'bg-yellow-400/10' : 'bg-yellow-50',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mm-card p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--mm-text-primary)]">Financial Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className={`${metric.bgColor} p-4 rounded-lg`}
          >
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {metric.title}
              </p>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <p className={`mt-2 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Savings Progress
          </span>
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {savingsProgress.toFixed(1)}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-[var(--mm-surface-shade)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(savingsProgress, 100)}%` }}
            className={`h-full rounded-full ${
              savingsProgress >= 100 ? 'bg-green-500' : 'bg-yellow-400'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};
