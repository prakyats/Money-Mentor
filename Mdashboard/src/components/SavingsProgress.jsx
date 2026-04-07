import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Wallet } from 'lucide-react';

export const SavingsProgress = ({ profile, expenses, isDarkMode }) => {
  const COLORS = [
    '#FF6B6B', // Coral Red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky Blue
    '#96CEB4', // Sage Green
    '#FFEEAD', // Soft Yellow
  ];

  const monthlyIncome = profile.annualIncome / 12;
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

  const currentSavings = monthlyIncome - currentMonthExpenses;
  const data = [
    { name: 'Expenses', value: currentMonthExpenses },
    { name: 'Savings', value: currentSavings },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <Wallet className="w-6 h-6 mr-2 text-yellow-400" />
        Savings Distribution
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ 
                backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                border: isDarkMode ? '1px solid #2a2a2a' : '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: isDarkMode ? '#ffffff' : '#374151' }}
              formatter={(value) => [`₹${value}`, 'Amount']}
            />
            <Legend 
              wrapperStyle={{ color: isDarkMode ? '#ffffff' : '#374151' }}
              formatter={(value) => <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-200' : 'bg-gray-50'}`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Monthly Target
          </p>
          <p className={`mt-1 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            ₹{(monthlyIncome * (profile.savingsGoal / 100)).toFixed(2)}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-200' : 'bg-gray-50'}`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Current Savings
          </p>
          <p className={`mt-1 text-xl font-semibold ${currentSavings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ₹{currentSavings.toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};