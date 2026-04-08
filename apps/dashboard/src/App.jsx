import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ExpensePage } from './pages/ExpensePage';
import { BudgetPage } from './pages/BudgetPage';
import { InvestmentPage } from './pages/InvestmentPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { API_BASE_URL, API_PATHS, AUTH_STORAGE_KEYS, LANDING_LOGIN_URL } from './config/api';

const DEFAULT_PROFILE = {
  annualIncome: 0,
  savingsGoal: 20,
  age: 25,
};

const PROFILE_STORAGE_PREFIX = 'mm_profile_';

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
  const isDevelopmentPreview = import.meta.env.DEV;
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [authChecked, setAuthChecked] = React.useState(false);
  const [profile, setProfile] = React.useState(DEFAULT_PROFILE);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [expenses, setExpenses] = React.useState([]);
  const [transactionsError, setTransactionsError] = React.useState('');

  const getProfileStorageKey = React.useCallback(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEYS.user);
      if (!storedUser) {
        return null;
      }

      const user = JSON.parse(storedUser);
      const userId = user?.id || user?.userId || user?.email;

      if (!userId) {
        return null;
      }

      return `${PROFILE_STORAGE_PREFIX}${userId}`;
    } catch {
      return null;
    }
  }, []);

  const clearSession = React.useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
    localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(AUTH_STORAGE_KEYS.user);
  }, []);

  const signOut = React.useCallback(() => {
    const profileStorageKey = getProfileStorageKey();
    if (profileStorageKey) {
      localStorage.removeItem(profileStorageKey);
    }

    clearSession();
    window.name = '';
    window.location.href = LANDING_LOGIN_URL;
  }, [clearSession, getProfileStorageKey]);

  const refreshAccessToken = React.useCallback(async () => {
    const refreshToken = localStorage.getItem(AUTH_STORAGE_KEYS.refreshToken);
    if (!refreshToken) {
      clearSession();
      throw new Error('SESSION_EXPIRED');
    }

    try {
      const response = await axios.post(`${API_BASE_URL}${API_PATHS.auth.refresh}`, {
        refreshToken,
      });

      localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, response.data.accessToken);
      localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, response.data.refreshToken);
      return response.data.accessToken;
    } catch {
      clearSession();
      throw new Error('SESSION_EXPIRED');
    }
  }, [clearSession]);

  const requestWithAutoRefresh = React.useCallback(
    async (requestFactory) => {
      const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);
      if (!accessToken) {
        throw new Error('SESSION_EXPIRED');
      }

      try {
        return await requestFactory(accessToken);
      } catch (error) {
        if (error?.response?.status !== 401) {
          throw error;
        }

        const nextAccessToken = await refreshAccessToken();
        return requestFactory(nextAccessToken);
      }
    },
    [refreshAccessToken],
  );

  const fetchTransactions = React.useCallback(async () => {
    const response = await requestWithAutoRefresh((accessToken) =>
      axios.get(`${API_BASE_URL}${API_PATHS.transactions.base}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    const mapped = response.data.map(mapTransactionToExpense);
    setExpenses(mapped);
  }, [requestWithAutoRefresh]);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  React.useEffect(() => {
    const bootstrapSession = async () => {
      if (window.name?.startsWith('mm-auth:')) {
        try {
          const payload = JSON.parse(decodeURIComponent(atob(window.name.slice(8))));

          if (payload?.accessToken && payload?.refreshToken) {
            localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, payload.accessToken);
            localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, payload.refreshToken);

            if (payload.user) {
              localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(payload.user));
            }
          }
        } catch {
          // Ignore malformed handoff payload and fall back to stored session.
        } finally {
          window.name = '';
        }
      }

      const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);

      if (!accessToken) {
        if (isDevelopmentPreview) {
          setTransactionsError('Local preview mode: sign in from landing to load live account data.');
          setCurrentUser({ fullName: 'Preview User', email: 'local.preview@moneymentor.dev' });
          setAuthChecked(true);
          return;
        }
        window.location.href = LANDING_LOGIN_URL;
        return;
      }

      try {
        const response = await requestWithAutoRefresh((token) =>
          axios.get(`${API_BASE_URL}${API_PATHS.users.me}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        );

        setCurrentUser(response.data);
        localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(response.data));

        const profileStorageKey = getProfileStorageKey();
        if (profileStorageKey) {
          const savedProfile = localStorage.getItem(profileStorageKey);
          if (savedProfile) {
            try {
              const parsedProfile = JSON.parse(savedProfile);
              setProfile({ ...DEFAULT_PROFILE, ...parsedProfile });
            } catch {
              setProfile(DEFAULT_PROFILE);
            }
          } else {
            setProfile(DEFAULT_PROFILE);
          }
        }

        await fetchTransactions();
        setTransactionsError('');
        setAuthChecked(true);
      } catch {
        if (isDevelopmentPreview) {
          setTransactionsError('Local preview mode: could not load live session data.');
          setCurrentUser({ fullName: 'Preview User', email: 'local.preview@moneymentor.dev' });
          setAuthChecked(true);
          return;
        }
        clearSession();
        window.location.href = LANDING_LOGIN_URL;
      }
    };

    bootstrapSession();
  }, [clearSession, fetchTransactions, getProfileStorageKey, isDevelopmentPreview, requestWithAutoRefresh]);

  React.useEffect(() => {
    if (!authChecked) {
      return;
    }

    const profileStorageKey = getProfileStorageKey();
    if (!profileStorageKey) {
      return;
    }

    localStorage.setItem(profileStorageKey, JSON.stringify(profile));
  }, [authChecked, getProfileStorageKey, profile]);

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

      const response = await requestWithAutoRefresh((token) =>
        axios.post(`${API_BASE_URL}${API_PATHS.transactions.base}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      setExpenses((prev) => [mapTransactionToExpense(response.data), ...prev]);
      setTransactionsError('');
    } catch (error) {
      if (error?.message === 'SESSION_EXPIRED') {
        window.location.href = LANDING_LOGIN_URL;
        return;
      }
      setTransactionsError('Could not save expense. Please try again.');
    }
  };

  const shouldRenderDashboard = authChecked || isDevelopmentPreview;

  if (!shouldRenderDashboard) {
    return (
      <div className="mm-dashboard flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-300">Checking your session...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className={`mm-dashboard flex h-screen min-h-screen overflow-hidden md:grid md:grid-cols-[16rem_minmax(0,1fr)] ${isDarkMode ? 'bg-dark-100' : 'bg-gray-100'}`}>
        <Sidebar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onClose={() => setIsSidebarOpen(false)}
          user={currentUser}
          onSignOut={signOut}
        />
        
        <main className="relative z-10 min-h-0 flex-1 overflow-y-auto p-4 pt-20 transition-all duration-300 sm:p-6 sm:pt-6 lg:p-8 md:pt-8">
          <div className="w-full">
            {transactionsError ? (
              <div className="mb-4 rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
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