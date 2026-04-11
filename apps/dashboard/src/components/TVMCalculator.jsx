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
  const [errorMessage, setErrorMessage] = React.useState('');

  const calculateFutureValue = () => {
    const P = parseFloat(formData.principal);
    const r = parseFloat(formData.rate) / 100;
    const t = parseFloat(formData.time);
    const n = parseFloat(formData.compoundingFrequency);

    if (!P || !r || !t || !n || P <= 0 || r <= 0 || t <= 0 || n <= 0) {
      setErrorMessage('Enter positive values for principal, rate, and time period.');
      setFutureValue(null);
      return;
    }

    setErrorMessage('');

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
      className="mm-card p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--mm-text-primary)] flex items-center">
        <Calculator className="w-6 h-6 mr-2 text-yellow-400" />
        Time Value of Money Calculator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
            Principal Amount (₹)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[var(--mm-text-muted)] font-bold">₹</span>
            <input
              type="number"
              min="1"
              value={formData.principal}
              onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
              className="mm-input !pl-10"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
            Annual Interest Rate (%)
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              className="mm-input !pr-10"
              required
            />
            <span className="absolute right-4 text-[var(--mm-text-muted)] font-bold">%</span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
            Time Period (Years)
          </label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="mm-input"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
            Compounding Frequency
          </label>
          <select
            value={formData.compoundingFrequency}
            onChange={(e) => setFormData({ ...formData, compoundingFrequency: e.target.value })}
            className="mm-select"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mm-btn mm-btn-primary w-full mt-2"
        >
          Calculate Future Value
        </motion.button>
      </form>

      {errorMessage ? (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {errorMessage}
        </div>
      ) : null}

      {futureValue !== null && (
        <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-5 rounded-2xl bg-[var(--mm-surface-shade)] border border-[var(--mm-card-border)]"
            >
          <h3 className="text-lg font-semibold mb-2 text-[var(--mm-text-primary)]">
            Results
          </h3>
          <p className="text-[var(--mm-text-muted)]">
            Future Value: <span className="font-bold text-2xl text-[var(--mm-accent)] block mt-1">₹{futureValue.toFixed(2)}</span>
          </p>
          <p className="mt-3 text-sm text-[var(--mm-text-muted)] opacity-80 italic">
            Your investment will grow to ₹{futureValue.toFixed(2)} after {formData.time} years.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};