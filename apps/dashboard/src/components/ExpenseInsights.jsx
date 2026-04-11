import React from 'react';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const ExpenseInsights = ({ expenses, isDarkMode }) => {
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

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const monthlyData = React.useMemo(() => {
    const monthly = expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {});

    return Object.entries(monthly).map(([month, amount]) => ({ month, amount }));
  }, [expenses]);

  const hasData = categoryData.length > 0;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={isDarkMode ? 'white' : 'black'}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mm-card p-4 sm:p-6"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--mm-text-primary)] flex items-center">
        <PieChartIcon className="w-6 h-6 mr-2 text-yellow-500" />
        Expense Insights
      </h2>

      {!hasData ? (
        <div className="rounded-2xl border p-6 border-[var(--mm-card-border)] bg-[var(--mm-input-bg)] text-[var(--mm-text-muted)]">
          <p className="font-medium text-[var(--mm-text-primary)]">No expense data yet</p>
          <p className="mt-1 text-sm">Add a few expenses to see category and monthly charts here.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <figure className="h-[320px]" role="img" aria-label="Expense breakdown by category pie chart">
          <h3 className={`text-base sm:text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Expenses by Category
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
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
                formatter={(value, name) => [`₹${value}`, name]}
              />
              <Legend 
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{ 
                  paddingTop: '20px',
                  color: isDarkMode ? '#ffffff' : '#374151'
                }}
                formatter={(value) => (
                  <span className={`text-xs break-words ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </figure>

        <figure className="h-[320px]" role="img" aria-label="Monthly expense bar chart">
          <h3 className={`text-base sm:text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Monthly Expenses
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 12, bottom: 72 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#2a2a2a' : '#e5e7eb'} vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke={isDarkMode ? '#ffffff' : '#374151'}
                tick={{ fill: isDarkMode ? '#ffffff' : '#374151' }}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tickMargin={12}
                label={{ value: 'Month', position: 'insideBottom', offset: -8, fill: isDarkMode ? '#fff' : '#374151' }}
              />
              <YAxis 
                stroke={isDarkMode ? '#ffffff' : '#374151'}
                tick={{ fill: isDarkMode ? '#ffffff' : '#374151' }}
                label={{ value: 'Expense (₹)', angle: -90, position: 'insideLeft', fill: isDarkMode ? '#fff' : '#374151' }}
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
                formatter={(value) => [`₹${value}`, 'Amount']}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  color: isDarkMode ? '#ffffff' : '#374151'
                }}
                formatter={(value) => (
                  <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {value}
                  </span>
                )}
              />
              <Bar 
                dataKey="amount" 
                name="Monthly Expenses"
                radius={[4, 4, 0, 0]}
              >
                {monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </figure>
      </div>
      )}
    </motion.div>
  );
};