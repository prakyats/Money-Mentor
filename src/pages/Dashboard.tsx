
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { signOut } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { withAuthProtection } from "@/lib/AuthContext";
import Logo from "@/components/Logo";
import { Home, PieChart, BarChart3, CreditCard, Settings, LogOut } from "lucide-react";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    const { success, error } = await signOut();
    
    if (success) {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/login");
    } else {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:block">
        <div className="h-full flex flex-col">
          <div className="p-6">
            <Logo />
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-800 bg-finance-50 rounded-lg group"
            >
              <Home className="h-5 w-5 text-finance-600 mr-3" />
              <span className="font-medium">Dashboard</span>
            </a>
            
            {[
              { name: "Transactions", icon: <CreditCard className="h-5 w-5 mr-3" /> },
              { name: "Budgets", icon: <PieChart className="h-5 w-5 mr-3" /> },
              { name: "Reports", icon: <BarChart3 className="h-5 w-5 mr-3" /> },
              { name: "Settings", icon: <Settings className="h-5 w-5 mr-3" /> },
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg group transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
          
          <div className="p-4 mt-auto">
            <Button
              variant="outline"
              className="w-full justify-start text-gray-600"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6 sticky top-0 z-10">
          <div className="flex items-center md:hidden">
            <Logo />
          </div>
          
          <div className="flex items-center ml-auto">
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-finance-600 flex items-center justify-center text-white">
                  {currentUser?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden sm:block font-medium">
                  {currentUser?.email?.split('@')[0] || "User"}
                </span>
              </Button>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Total Balance", value: "$12,580.00", change: "+2.5%" },
                { title: "Monthly Spending", value: "$4,250.80", change: "-4.2%" },
                { title: "Savings Goal", value: "$25,000.00", progress: "45%" },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-subtle p-6 border border-gray-100"
                >
                  <h3 className="text-gray-500 text-sm font-medium mb-2">{card.title}</h3>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">{card.value}</p>
                    {card.change && (
                      <span className={`text-sm ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {card.change}
                      </span>
                    )}
                    {card.progress && (
                      <div className="text-sm text-finance-600">{card.progress}</div>
                    )}
                  </div>
                  {card.progress && (
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-3">
                      <div
                        className="h-1 bg-finance-500 rounded-full"
                        style={{ width: card.progress }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl shadow-subtle p-6 border border-gray-100 mb-8">
              <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
              <div className="space-y-4">
                {[
                  { name: "Grocery Store", amount: "-$120.50", date: "Today" },
                  { name: "Salary Deposit", amount: "+$3,500.00", date: "Yesterday" },
                  { name: "Electric Bill", amount: "-$85.20", date: "Jul 15, 2023" },
                  { name: "Amazon Purchase", amount: "-$64.99", date: "Jul 14, 2023" },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.amount.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {transaction.amount.startsWith('+') ? '+' : '-'}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-gray-500 text-sm">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`font-medium ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default withAuthProtection(Dashboard);
