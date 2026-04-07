import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee } from 'lucide-react';

export const TaxCalculator = ({ isDarkMode }) => {
  const [income, setIncome] = React.useState('');
  const [deductions, setDeductions] = React.useState('');
  const [taxableIncome, setTaxableIncome] = React.useState(null);
  const [taxAmount, setTaxAmount] = React.useState(null);

  const calculateTax = (amount) => {
    if (amount <= 250000) return 0;
    if (amount <= 500000) return (amount - 250000) * 0.05;
    if (amount <= 750000) return 12500 + (amount - 500000) * 0.1;
    if (amount <= 1000000) return 37500 + (amount - 750000) * 0.15;
    if (amount <= 1250000) return 75000 + (amount - 1000000) * 0.2;
    if (amount <= 1500000) return 125000 + (amount - 1250000) * 0.25;
    return 187500 + (amount - 1500000) * 0.3;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxable = Math.max(0, grossIncome - totalDeductions);
    setTaxableIncome(taxable);
    setTaxAmount(calculateTax(taxable));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <Calculator className="w-6 h-6 mr-2 text-yellow-400" />
        Income Tax Calculator
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
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className={`w-full pl-8 p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
              } focus:ring focus:ring-yellow-400/20`}
              required
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Total Deductions (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">₹</span>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className={`w-full pl-8 p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
              } focus:ring focus:ring-yellow-400/20`}
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 flex items-center justify-center font-medium"
        >
          Calculate Tax
        </motion.button>
      </form>

      {taxableIncome !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg ${
            isDarkMode ? 'bg-dark-200 border-dark-300' : 'bg-gray-50 border-gray-200'
          } border`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Tax Calculation Results
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Taxable Income:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ₹{taxableIncome.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Tax Amount:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ₹{taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Effective Tax Rate:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {((taxAmount / taxableIncome) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};