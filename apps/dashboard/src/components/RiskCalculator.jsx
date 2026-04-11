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
      className="mm-card p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--mm-text-primary)] flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-yellow-400" />
        Investment Risk Profile
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--mm-text-primary)]">
            Your Risk Profile: {riskProfile.riskLevel}
          </h3>
          <p className="text-[var(--mm-text-muted)]">
            {riskProfile.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[var(--mm-surface-shade)]">
            <h4 className="font-medium mb-2 text-[var(--mm-text-primary)]">
              Recommended Asset Allocation
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--mm-text-muted)]">Equity</span>
                <span className="font-semibold text-[var(--mm-text-primary)]">
                  {riskProfile.equityAllocation}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--mm-text-muted)]">Debt</span>
                <span className="font-semibold text-[var(--mm-text-primary)]">
                  {riskProfile.debtAllocation}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--mm-surface-shade)]">
            <h4 className="font-medium mb-2 text-[var(--mm-text-primary)]">
              Risk Factors
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[var(--mm-text-muted)]">
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