import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ExpensePage } from './pages/ExpensePage';
import { BudgetPage } from './pages/BudgetPage';
import { InvestmentPage } from './pages/InvestmentPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { API_BASE_URL, AUTH_STORAGE_KEYS, LANDING_LOGIN_URL } from './config/api';

const parseExpenseNote = (note) => {
  if (!note) {
    return { category: 'Other', description: '' };
  }

  const match = note.match(/^\[(.+?)\]\s*(.*)$/);
  if (!match) {
    return { category: 'Other', description: note };
  }

  return {
    category: match[1] || 'Other',
    description: match[2] || '',
  };
};

const mapTransactionToExpense = (transaction) => {
  const parsed = parseExpenseNote(transaction.note);

  return {
    id: transaction.id,
    amount: Number(transaction.amount),
    date: transaction.happenedAt,
    category: transaction.category?.name || parsed.category,
    description: parsed.description,
  };
};

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [authChecked, setAuthChecked] = React.useState(false);
  const [profile, setProfile] = React.useState({
    annualIncome: 0,
    savingsGoal: 20,
    age: 25,
  });
  const [expenses, setExpenses] = React.useState([]);
  const [transactionsError, setTransactionsError] = React.useState('');

  const fetchTransactions = React.useCallback(async (accessToken) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/transactions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const mapped = response.data.map(mapTransactionToExpense);
    setExpenses(mapped);
  }, []);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  React.useEffect(() => {
    const bootstrapSession = async () => {
      const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);

      if (!accessToken) {
        window.location.href = LANDING_LOGIN_URL;
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(response.data));
        await fetchTransactions(accessToken);
        setTransactionsError('');
        setAuthChecked(true);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
        localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
        localStorage.removeItem(AUTH_STORAGE_KEYS.user);
        window.location.href = LANDING_LOGIN_URL;
      }
    };

    bootstrapSession();
  }, [fetchTransactions]);

  const handleAddExpense = async (newExpense) => {
    const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);
    if (!accessToken) {
      window.location.href = LANDING_LOGIN_URL;
      return;
    }

    try {
      const payload = {
        type: 'EXPENSE',
        amount: Number(newExpense.amount),
        happenedAt: new Date(newExpense.date).toISOString(),
        note: `[${newExpense.category}] ${newExpense.description}`,
      };

      const response = await axios.post(`${API_BASE_URL}/api/v1/transactions`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setExpenses((prev) => [mapTransactionToExpense(response.data), ...prev]);
      setTransactionsError('');
    } catch {
      setTransactionsError('Could not save expense. Please try again.');
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-dark-100 text-white flex items-center justify-center">
        <p className="text-sm text-gray-300">Checking your session...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className={`flex min-h-screen ${isDarkMode ? 'bg-dark-100' : 'bg-gray-100'}`}>
        <Sidebar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 md:ml-64 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {transactionsError ? (
              <div className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {transactionsError}
              </div>
            ) : null}
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    profile={profile}
                    expenses={expenses}
                    onSaveProfile={setProfile}
                    onAddExpense={handleAddExpense}
                    isDarkMode={isDarkMode}
                  />
                } 
              />
              <Route 
                path="/expenses" 
                element={
                  <ExpensePage 
                    expenses={expenses}
                    onAddExpense={handleAddExpense}
                    isDarkMode={isDarkMode}
                  />
                } 
              />
              <Route 
                path="/budget" 
                element={
                  <BudgetPage 
                    profile={profile}
                    expenses={expenses}
                    isDarkMode={isDarkMode}
                  />
                } 
              />
              <Route 
                path="/investments" 
                element={
                  <InvestmentPage 
                    profile={profile}
                    isDarkMode={isDarkMode}
                  />
                } 
              />
              <Route 
                path="/calculator" 
                element={
                  <CalculatorPage 
                    isDarkMode={isDarkMode}
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;