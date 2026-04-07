import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export const RiskCalculator = ({ profile, isDarkMode }) => {
  const calculateRiskProfile = (age) => {
    if (age < 30) {
      return {
        riskLevel: 'Aggressive',
        equityAllocation: 80,
        debtAllocation: 20,
        description: 'You can afford to take more risks with a longer investment horizon.',
      };
    } else if (age < 45) {
      return {
        riskLevel: 'Moderate',
        equityAllocation: 60,
        debtAllocation: 40,
        description: 'A balanced approach with moderate risk tolerance is suitable.',
      };
    } else if (age < 60) {
      return {
        riskLevel: 'Conservative',
        equityAllocation: 40,
        debtAllocation: 60,
        description: 'Focus on capital preservation with some growth potential.',
      };
    } else {
      return {
        riskLevel: 'Very Conservative',
        equityAllocation: 20,
        debtAllocation: 80,
        description: 'Priority should be protecting your capital with minimal risk.',
      };
    }
  };

  const riskProfile = calculateRiskProfile(profile.age);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDarkMode ? 'bg-dark-100 border-dark-200' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        <TrendingUp className="w-6 h-6 mr-2 text-yellow-400" />
        Investment Risk Profile
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Risk Profile: {riskProfile.riskLevel}
          </h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            {riskProfile.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-200' : 'bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recommended Asset Allocation
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Equity</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {riskProfile.equityAllocation}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Debt</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {riskProfile.debtAllocation}%
                </span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-200' : 'bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Risk Factors
            </h4>
            <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Market volatility</li>
              <li>Economic conditions</li>
              <li>Interest rate changes</li>
              <li>Inflation risk</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
          <p className="text-yellow-400 text-sm">
            Remember: Past performance is not indicative of future results. Always consult with a financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </motion.div>
  );
};