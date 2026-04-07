import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { IndianRupee } from 'lucide-react';

export const CategoryBudget = ({ expenses, isDarkMode }) => {
  // Modern color palette - matching ExpenseInsights
  const COLORS = [
    '#FF6B6B', // Coral Red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky Blue
    '#96CEB4', // Sage Green
    '#FFEEAD', // Soft Yellow
    '#D4A5A5', // Dusty Rose
    '#9B5DE5', // Purple
    '#00BBF9', // Bright Blue
    '#00F5D4', // Mint
    '#FEE440'  // Bright Yellow
  ];

  const categoryData = React.useMemo(() => {
    const categories = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
      percentage: (value / Object.values(categories).reduce((a, b) => a + b, 0) * 100).toFixed(1)
    }));
  }, [expenses]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <IndianRupee className="w-6 h-6 mr-2 text-yellow-400" />
        Category-wise Budget
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
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

        <div className={`${isDarkMode ? 'bg-dark-200' : 'bg-gray-50'} p-4 rounded-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Category Breakdown
          </h3>
          <div className="space-y-3">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ₹{category.value.toFixed(2)}
                  </span>
                  <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ({category.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};