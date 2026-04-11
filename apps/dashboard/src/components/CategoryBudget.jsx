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

  const hasData = categoryData.length > 0;

  const renderPieLabel = ({ cx, cy, midAngle, outerRadius, percentage, name, viewBox }) => {
    const RADIAN = Math.PI / 180;
    const labelRadius = outerRadius + 18;
    const rawX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const rawY = cy + labelRadius * Math.sin(-midAngle * RADIAN);
    const padding = 14;
    const width = viewBox?.width ?? cx * 2;
    const height = viewBox?.height ?? cy * 2;
    const x = Math.min(width - padding, Math.max(padding, rawX));
    const y = Math.min(height - padding, Math.max(padding, rawY));
    const textAnchor = x >= cx ? 'start' : 'end';

    return (
      <text
        x={x}
        y={y}
        fill={isDarkMode ? '#f3f4f6' : '#111827'}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {`${name} (${percentage}%)`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mm-card p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--mm-text-primary)] flex items-center">
        <IndianRupee className="w-6 h-6 mr-2 text-yellow-500" />
        Category-wise Budget
      </h2>

      {!hasData ? (
        <div className="rounded-2xl border p-6 border-[var(--mm-card-border)] bg-[var(--mm-surface-shade)] text-[var(--mm-text-muted)]">
          <p className="font-bold text-[var(--mm-text-primary)] uppercase text-[11px] tracking-widest mb-1">No category data yet</p>
          <p className="text-sm">Once you add expenses, this chart will show how your spending is distributed by category.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80" role="img" aria-label="Category budget pie chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 16, right: 28, bottom: 16, left: 28 }}>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderPieLabel}
                outerRadius={88}
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
                formatter={(value) => <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-xs break-words`}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-lg bg-[var(--mm-surface-shade)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--mm-text-primary)]">
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
                  <span className="text-[var(--mm-text-muted)]">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-[var(--mm-text-primary)]">
                    ₹{category.value.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-[var(--mm-text-muted)]">
                    ({category.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
    </motion.div>
  );
};