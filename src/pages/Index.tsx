
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PieChart, CreditCard, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white/90 backdrop-blur-md sticky top-0 z-10 shadow-subtle">
        <Logo />
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#features" className="text-gray-700 hover:text-finance-600 font-medium">Features</Link>
            <Link to="#testimonials" className="text-gray-700 hover:text-finance-600 font-medium">Testimonials</Link>
            <Link to="#pricing" className="text-gray-700 hover:text-finance-600 font-medium">Pricing</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="border-finance-600 text-finance-600 hover:bg-finance-50">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-finance-600 hover:bg-finance-700 text-white shadow-md">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-finance-50 text-finance-600 rounded-full text-sm font-medium mb-4"
          >
            Redefining personal finance management
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight"
          >
            Take control of your <span className="gradient-text">financial future</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Track expenses, manage budgets, and achieve your financial goals with our intuitive platform. Join thousands who have transformed their relationship with money.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link to="/register">
              <Button size="lg" className="bg-finance-600 hover:bg-finance-700 text-white shadow-md px-8">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gray-300">
              Learn more
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Features section */}
      <section id="features" className="py-16 md:py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              Powerful features to manage your finances
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to take control of your money in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PieChart className="h-10 w-10 text-finance-600" />,
                title: "Budget Management",
                description: "Create custom budgets and track your spending habits in real-time."
              },
              {
                icon: <CreditCard className="h-10 w-10 text-finance-600" />,
                title: "Expense Tracking",
                description: "Automatically categorize your transactions and see where your money goes."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-finance-600" />,
                title: "Financial Insights",
                description: "Get personalized insights and recommendations to improve your financial health."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-subtle hover:shadow-glass transition-all duration-300 border border-gray-100"
              >
                <div className="bg-finance-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 bg-finance-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
            Ready to start your financial journey?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join thousands of users who are already transforming their financial future.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-finance-600 hover:bg-gray-100 shadow-lg px-8">
              Get started now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <Logo />
            <div className="flex gap-6 mt-6 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-finance-600">Terms</a>
              <a href="#" className="text-gray-500 hover:text-finance-600">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-finance-600">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
            <p>© 2023 Finance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
