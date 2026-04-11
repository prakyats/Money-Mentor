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
      className="mm-card p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--mm-text-primary)] flex items-center">
        <IndianRupee className="w-6 h-6 mr-2 text-yellow-500" />
        Financial Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-wide">
            Annual Income (₹)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[var(--mm-text-muted)] font-bold">₹</span>
            <input
              type="number"
              min="0"
              step="1"
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
              className="mm-input !pl-10"
              placeholder="Enter your annual income"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-wide">
            Age
          </label>
          <input
            type="number"
            min="18"
            step="1"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            className="mm-input"
            placeholder="Enter your age"
            required
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-wide">
            Monthly Savings Goal (% of income)
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={formData.savingsGoal}
              onChange={(e) => setFormData({ ...formData, savingsGoal: Number(e.target.value) })}
              className="mm-input !pr-10"
              placeholder="Enter savings goal percentage"
              required
            />
            <span className="absolute right-4 text-[var(--mm-text-muted)] font-bold">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-wide">
            Risk Tolerance
          </label>
          <select
            value={formData.riskTolerance}
            onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
            className="mm-select"
            required
          >
            <option value="">Select risk tolerance</option>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mm-btn mm-btn-primary w-full mt-2"
        >
          <Save className="w-5 h-5 mr-3" />
          Save Profile
        </motion.button>
      </form>
    </motion.div>
  );
};