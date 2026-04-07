import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

export const TVMCalculator = ({ isDarkMode }) => {
  const [formData, setFormData] = React.useState({
    principal: '',
    rate: '',
    time: '',
    compoundingFrequency: 12, // Monthly compounding by default
  });

  const [futureValue, setFutureValue] = React.useState(null);

  const calculateFutureValue = () => {
    const P = parseFloat(formData.principal);
    const r = parseFloat(formData.rate) / 100;
    const t = parseFloat(formData.time);
    const n = parseFloat(formData.compoundingFrequency);

    const FV = P * Math.pow(1 + r/n, n * t);
    setFutureValue(FV);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFutureValue();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <Calculator className="w-6 h-6 mr-2 text-yellow-400" />
        Time Value of Money Calculator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Principal Amount (₹)
          </label>
          <input
            type="number"
            value={formData.principal}
            onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
            className={`w-full p-2 border rounded-md ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
            } focus:ring focus:ring-yellow-400/20`}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            className={`w-full p-2 border rounded-md ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
            } focus:ring focus:ring-yellow-400/20`}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Time Period (Years)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className={`w-full p-2 border rounded-md ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
            } focus:ring focus:ring-yellow-400/20`}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Compounding Frequency
          </label>
          <select
            value={formData.compoundingFrequency}
            onChange={(e) => setFormData({ ...formData, compoundingFrequency: e.target.value })}
            className={`w-full p-2 border rounded-md ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
            } focus:ring focus:ring-yellow-400/20`}
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 flex items-center justify-center font-medium"
        >
          Calculate Future Value
        </motion.button>
      </form>

      {futureValue !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg ${
            isDarkMode ? 'bg-dark-200 border-dark-300' : 'bg-gray-50 border-gray-200'
          } border`}
        >
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Results
          </h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Future Value: <span className="font-semibold">₹{futureValue.toFixed(2)}</span>
          </p>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Your investment will grow to ₹{futureValue.toFixed(2)} after {formData.time} years.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};