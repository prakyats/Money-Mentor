import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee } from 'lucide-react';

export const TaxCalculator = ({ isDarkMode }) => {
  const [income, setIncome] = React.useState('');
  const [deductions, setDeductions] = React.useState('');
  const [taxableIncome, setTaxableIncome] = React.useState(null);
  const [taxAmount, setTaxAmount] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

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

    if (grossIncome <= 0) {
      setErrorMessage('Enter a valid annual income to calculate tax.');
      setTaxableIncome(null);
      setTaxAmount(null);
      return;
    }

    if (totalDeductions < 0) {
      setErrorMessage('Deductions cannot be negative.');
      setTaxableIncome(null);
      setTaxAmount(null);
      return;
    }

    setErrorMessage('');

    const taxable = Math.max(0, grossIncome - totalDeductions);
    setTaxableIncome(taxable);
    setTaxAmount(calculateTax(taxable));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mm-card p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--mm-text-primary)] flex items-center">
        <Calculator className="w-6 h-6 mr-2 text-yellow-500" />
        Income Tax Calculator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
            Annual Income (₹)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[var(--mm-text-muted)] font-bold">₹</span>
            <input
              type="number"
              min="1"
              step="1"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mm-input !pl-10"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[var(--mm-text-muted)] mb-2 uppercase tracking-widest">
            Total Deductions (₹)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[var(--mm-text-muted)] font-bold">₹</span>
            <input
              type="number"
              min="0"
              step="1"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="mm-input !pl-10"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mm-btn mm-btn-primary w-full mt-2"
        >
          Calculate Tax
        </motion.button>
      </form>

      {errorMessage ? (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {errorMessage}
        </div>
      ) : null}

      {taxableIncome !== null && (
        <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-5 rounded-2xl bg-[var(--mm-surface-shade)] border border-[var(--mm-card-border)]"
            >
          <h3 className="text-lg font-semibold mb-4 text-[var(--mm-text-primary)]">
            Tax Calculation Results
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[var(--mm-text-muted)]">Taxable Income:</span>
              <span className="font-semibold text-[var(--mm-text-primary)]">
                ₹{taxableIncome.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mm-text-muted)]">Tax Amount:</span>
              <span className="font-semibold text-[var(--mm-text-primary)]">
                ₹{taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mm-text-muted)]">Effective Tax Rate:</span>
              <span className="font-semibold text-[var(--mm-text-primary)]">
                {((taxAmount / taxableIncome) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};