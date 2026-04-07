import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee } from 'lucide-react';

export const LoanCalculator = ({ isDarkMode }) => {
  const [formData, setFormData] = React.useState({
    principal: '',
    rate: '',
    tenure: '',
  });

  const [emi, setEMI] = React.useState(null);
  const [totalPayment, setTotalPayment] = React.useState(null);
  const [totalInterest, setTotalInterest] = React.useState(null);

  const calculateEMI = () => {
    const P = parseFloat(formData.principal);
    const R = parseFloat(formData.rate) / 12 / 100;
    const N = parseFloat(formData.tenure) * 12;

    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const total = emi * N;
    
    setEMI(emi);
    setTotalPayment(total);
    setTotalInterest(total - P);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEMI();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <Calculator className="w-6 h-6 mr-2 text-yellow-400" />
        Loan EMI Calculator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Loan Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">₹</span>
            <input
              type="number"
              value={formData.principal}
              onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
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
            Interest Rate (% per annum)
          </label>
          <input
            type="number"
            step="0.1"
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
            Loan Tenure (Years)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.tenure}
            onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
            className={`w-full p-2 border rounded-md ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-300 text-white focus:border-yellow-400' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
            } focus:ring focus:ring-yellow-400/20`}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 flex items-center justify-center font-medium"
        >
          Calculate EMI
        </motion.button>
      </form>

      {emi !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg ${
            isDarkMode ? 'bg-dark-200 border-dark-300' : 'bg-gray-50 border-gray-200'
          } border`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Loan Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Monthly EMI:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ₹{emi.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Total Interest:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ₹{totalInterest.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Total Payment:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ₹{totalPayment.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};