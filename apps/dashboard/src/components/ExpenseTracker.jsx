import React from 'react';
import { motion } from 'framer-motion';
import { Plus, IndianRupee } from 'lucide-react';
import { format } from 'date-fns';

export const ExpenseTracker = ({ expenses, onAddExpense, isDarkMode }) => {
  const [formData, setFormData] = React.useState({
    category: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({
      category: formData.category,
      amount: Number(formData.amount),
      date: formData.date,
      description: formData.description,
    });
    setFormData({
      category: '',
      amount: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      description: '',
    });
  };

  const formatExpenseDate = (value) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return 'Invalid date';
    }

    try {
      return format(parsed, 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mm-card p-6"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <IndianRupee className="w-6 h-6 mr-2 text-yellow-500" />
        Expense Tracker
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-2xl bg-[var(--mm-input-bg)] border border-[var(--mm-card-border)] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <div>
            <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mm-select"
              required
              aria-label="Expense category"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
              Amount
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[var(--mm-text-muted)] font-bold">₹</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mm-input !pl-10"
                required
                aria-label="Expense amount"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mm-input"
              required
              aria-label="Expense date"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mm-input"
              required
              aria-label="Expense description"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mm-btn mm-btn-primary w-full"
        >
          <Plus className="w-5 h-5 mr-3" />
          Add Expense
        </motion.button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-[var(--mm-card-border)] bg-[var(--mm-input-bg)]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-[var(--mm-card-border)] bg-[var(--mm-bg-main)]/30">
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[var(--mm-text-muted)]">Date</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[var(--mm-text-muted)]">Category</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[var(--mm-text-muted)]">Description</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[var(--mm-text-muted)] text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--mm-card-border)]">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-[var(--mm-text-muted)] italic">
                  No expenses yet. Add your first expense to see it here.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-[var(--mm-bg-main)]/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[var(--mm-text-primary)]">
                    {formatExpenseDate(expense.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[var(--mm-accent)]/10 text-[var(--mm-accent)] border border-[var(--mm-accent)]/20">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--mm-text-muted)]">{expense.description}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[var(--mm-text-primary)] text-right">
                    ₹{expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};