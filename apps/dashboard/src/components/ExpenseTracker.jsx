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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <IndianRupee className="w-6 h-6 mr-2 text-yellow-400" />
        Expense Tracker
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
              } focus:ring focus:ring-yellow-400/20`}
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
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">₹</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className={`w-full pl-8 p-2 border rounded-md ${
                  isDarkMode 
                    ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
                } focus:ring focus:ring-yellow-400/20`}
                required
                aria-label="Expense amount"
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
              } focus:ring focus:ring-yellow-400/20`}
              required
                aria-label="Expense date"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
              } focus:ring focus:ring-yellow-400/20`}
              required
                aria-label="Expense description"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 flex items-center justify-center font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </motion.button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-left border-b ${isDarkMode ? 'border-dark-300' : 'border-gray-200'}`}>
              <th className={`pb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
              <th className={`pb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</th>
              <th className={`pb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Description</th>
              <th className={`pb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" className={`py-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No expenses yet. Add your first expense to see it here.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className={`border-b ${isDarkMode ? 'border-dark-300' : 'border-gray-200'}`}>
                  <td className={`py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </td>
                  <td className={`py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{expense.category}</td>
                  <td className={`py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{expense.description}</td>
                  <td className={`py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{expense.amount.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};