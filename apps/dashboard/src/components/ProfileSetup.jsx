import React from 'react';
import { motion } from 'framer-motion';
import { Save, IndianRupee } from 'lucide-react';

export const ProfileSetup = ({ profile, onSave, isDarkMode }) => {
  const [formData, setFormData] = React.useState({
    annualIncome: 0,
    savingsGoal: 20,
    age: 25,
    riskTolerance: 'moderate',
    ...profile,
  });

  React.useEffect(() => {
    setFormData({
      annualIncome: 0,
      savingsGoal: 20,
      age: 25,
      riskTolerance: 'moderate',
      ...profile,
    });
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <IndianRupee className="w-6 h-6 mr-2 text-yellow-400" />
        Financial Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Annual Income (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">₹</span>
            <input
              type="number"
              min="0"
              step="1"
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
              className={`w-full pl-8 p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
              } focus:ring focus:ring-yellow-400/20`}
              placeholder="Enter your annual income"
              required
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Age
          </label>
          <input
            type="number"
            min="18"
            step="1"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            className={`w-full p-2 border rounded-md ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
            } focus:ring focus:ring-yellow-400/20`}
            placeholder="Enter your age"
            required
            min="18"
            max="100"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Monthly Savings Goal (% of income)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={formData.savingsGoal}
              onChange={(e) => setFormData({ ...formData, savingsGoal: Number(e.target.value) })}
              className={`w-full pr-8 p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
              } focus:ring focus:ring-yellow-400/20`}
              placeholder="Enter savings goal percentage"
              required
            />
            <span className="absolute right-3 top-2 text-gray-400">%</span>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Risk Tolerance
          </label>
          <select
            value={formData.riskTolerance}
            onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
            className={`w-full p-2 border rounded-md ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
            } focus:ring focus:ring-yellow-400/20`}
            required
          >
            <option value="">Select risk tolerance</option>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 flex items-center justify-center font-medium"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </motion.button>
      </form>
    </motion.div>
  );
};