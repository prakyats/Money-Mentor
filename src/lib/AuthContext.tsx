
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, subscribeToAuthChanges } from "./firebase";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Higher-order component for protected routes
export const withAuthProtection = (Component: React.ComponentType) => {
  return () => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, isLoading, navigate]);
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-finance-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    
    return isAuthenticated ? <Component /> : null;
  };
};
