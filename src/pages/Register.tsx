
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signUp, getAuthErrorMessage } from "@/lib/firebase";
import AuthLayout from "@/components/AuthLayout";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const validate = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const { user, error } = await signUp(email, password);
      
      if (user) {
        // Could store additional user data in Firestore here if needed
        toast({
          title: "Registration successful",
          description: "Your account has been created!",
        });
        navigate("/dashboard");
      } else {
        console.error("Registration error:", error);
        toast({
          title: "Registration failed",
          description: getAuthErrorMessage(error),
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Sign up to get started with Finance"
    >
      <form onSubmit={handleSubmit} className="space-y-5 mt-8">
        <InputField
          label="Full name"
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          placeholder="John Doe"
          autoComplete="name"
          required
          icon={<User size={18} />}
        />
        
        <InputField
          label="Email address"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
          required
          icon={<Mail size={18} />}
        />
        
        <InputField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="new-password"
          required
          icon={<Lock size={18} />}
        />
        
        <InputField
          label="Confirm password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          placeholder="••••••••"
          autoComplete="new-password"
          required
          icon={<Lock size={18} />}
        />
        
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-finance-600 focus:ring-finance-500"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-finance-600 hover:text-finance-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-finance-600 hover:text-finance-500">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-finance-600 hover:bg-finance-700 text-white py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            "Create account"
          )}
        </Button>
        
        <div className="text-center text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-finance-600 hover:text-finance-700 font-medium">
              Sign in
            </Link>
          </motion.p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
