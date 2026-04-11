import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Bell } from 'lucide-react';

export const BudgetAlerts = ({ profile, expenses, isDarkMode }) => {
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

  const percentageUsed = monthlyBudget > 0 ? (currentMonthExpenses / monthlyBudget) * 100 : 0;
  const remainingBudget = monthlyBudget - currentMonthExpenses;
  const daysLeftInMonth = Math.max(
    1,
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate(),
  );

  const getAlertLevel = () => {
    if (percentageUsed >= 90) return { color: 'red', message: 'Critical: You have exceeded or are very close to your budget limit!' };
    if (percentageUsed >= 75) return { color: 'yellow', message: 'Warning: You are approaching your budget limit.' };
    if (percentageUsed >= 50) return { color: 'blue', message: 'Notice: You have used more than half of your monthly budget.' };
    return { color: 'green', message: 'You are well within your budget.' };
  };

  const alert = getAlertLevel();
  const dailyBudget = remainingBudget / daysLeftInMonth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mm-card p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--mm-text-primary)] flex items-center">
        <Bell className="w-6 h-6 mr-2 text-yellow-500" />
        Budget Alerts
      </h2>

      {monthlyBudget <= 0 ? (
        <div className="mb-6 rounded-2xl border p-4 text-sm border-[var(--mm-card-border)] bg-[var(--mm-surface-shade)] text-[var(--mm-text-muted)] mt-[-0.5rem]">
          <p className="font-bold text-[var(--mm-text-primary)] uppercase text-[11px] tracking-widest mb-1">Action Required</p>
          Configure your financial profile to unlock budget alerts and daily spending guidance.
        </div>
      ) : null}

      <div className="space-y-6">
        <div className={`p-4 rounded-lg border ${
          alert.color === 'red' 
            ? 'bg-red-500/10 border-red-500/20 text-red-500'
            : alert.color === 'yellow'
            ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400'
            : alert.color === 'blue'
            ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
            : 'bg-green-500/10 border-green-500/20 text-green-500'
        }`}>
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 mr-2 mt-0.5" />
            <div>
              <p className="font-medium">{alert.message}</p>
              <p className="mt-1 text-sm opacity-90">
                You have spent {percentageUsed.toFixed(1)}% of your monthly budget.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[var(--mm-surface-shade)]">
            <h3 className="font-medium mb-2 text-[var(--mm-text-primary)]">
              Remaining Budget
            </h3>
            <div className="flex justify-between items-baseline">
              <span className="text-[var(--mm-text-muted)]">Available</span>
              <span className={`text-xl font-semibold ${remainingBudget >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ₹{remainingBudget.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--mm-surface-shade)]">
            <h3 className="font-medium mb-2 text-[var(--mm-text-primary)]">
              Daily Budget
            </h3>
            <div className="flex justify-between items-baseline">
              <span className="text-[var(--mm-text-muted)]">
                For next {daysLeftInMonth} days
              </span>
              <span className={`text-xl font-semibold ${dailyBudget >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ₹{dailyBudget.toFixed(2)}
              </span>
            </div>
          </div>
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
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-[var(--mm-bg-main)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentageUsed, 100)}%` }}
              transition={{ duration: 0.5 }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                percentageUsed >= 90 ? 'bg-red-500' :
                percentageUsed >= 75 ? 'bg-yellow-500' :
                'bg-yellow-400'
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};