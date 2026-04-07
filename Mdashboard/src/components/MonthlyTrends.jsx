import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

export const MonthlyTrends = ({ expenses, isDarkMode }) => {
  // Modern color palette
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

  const monthlyData = React.useMemo(() => {
    const data = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      
      if (!acc[key]) {
        acc[key] = {
          month: key,
          expenses: 0,
        };
      }
      
      acc[key].expenses += expense.amount;
      return acc;
    }, {});

    return Object.values(data).sort((a, b) => {
      const [monthA, yearA] = a.month.split(' ');
      const [monthB, yearB] = b.month.split(' ');
      return new Date(`${monthA} 1, ${yearA}`) - new Date(`${monthB} 1, ${yearB}`);
    });
  }, [expenses]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <TrendingUp className="w-6 h-6 mr-2 text-yellow-400" />
        Monthly Expense Trends
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? '#2a2a2a' : '#e5e7eb'} 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              stroke={isDarkMode ? '#ffffff' : '#374151'}
              tick={{ fill: isDarkMode ? '#ffffff' : '#374151', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke={isDarkMode ? '#ffffff' : '#374151'}
              tick={{ fill: isDarkMode ? '#ffffff' : '#374151', fontSize: 12 }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                border: isDarkMode ? '1px solid #2a2a2a' : '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: isDarkMode ? '#ffffff' : '#374151' }}
              cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
              formatter={(value) => [`₹${value}`, 'Expenses']}
            />
            <Legend 
              wrapperStyle={{ color: isDarkMode ? '#ffffff' : '#374151' }}
              formatter={(value) => <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{value}</span>}
            />
            <Bar 
              dataKey="expenses" 
              name="Monthly Expenses"
              radius={[4, 4, 0, 0]}
            >
              {monthlyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};