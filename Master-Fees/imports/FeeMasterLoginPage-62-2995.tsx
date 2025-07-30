import { useState } from 'react';
import { toast } from "sonner@2.0.3";
import { api } from "../utils/supabase/api";
import logoImage from "figma:asset/d94dd5c284a7cd97402018a8dc1e040e8b704130.png";
import imgB from "figma:asset/f2dddff10fce8c5cc0468d3c13d16d6eeadcbdb7.png";

interface FeeMasterLoginPageProps {
  onLogin: (schoolId: string, schoolName: string, accessToken: string, keepLoggedIn: boolean) => void;
  onSignup: () => void;
  onForgotPassword: () => void;
}

export default function FeeMasterLoginPage({ onLogin, onSignup, onForgotPassword }: FeeMasterLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.signIn(email, password);
      
      if (response.success && response.data) {
        const { schoolId, schoolName, accessToken } = response.data;
        toast.success(`Welcome to ${schoolName}!`);
        onLogin(schoolId, schoolName, accessToken, keepLoggedIn);
      } else {
        toast.error(response.error || 'Invalid email or password. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Unable to connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white size-full relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#003049] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#5DFCAF] rounded-full blur-3xl"></div>
      </div>

      <div className="relative h-screen flex">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-[#021722]">
          <div className="w-full max-w-md space-y-8">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="size-12 mr-3">
                  <img 
                    src={logoImage} 
                    alt="Master-Fees Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-3xl font-bold text-white">Master-Fees</h1>
              </div>
              <p className="text-sm text-gray-400 mt-2">Secure, reliable, and comprehensive financial management for educational institutions</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5DFCAF] focus:border-[#5DFCAF] outline-none transition-all placeholder-gray-400 text-white"
                    placeholder="Enter your school email address"
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5DFCAF] focus:border-[#5DFCAF] outline-none transition-all placeholder-gray-400 text-white"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5 text-gray-400 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="keepLoggedIn"
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="h-4 w-4 text-[#5DFCAF] focus:ring-[#5DFCAF] border-gray-600 bg-white/10 rounded"
                  />
                  <label htmlFor="keepLoggedIn" className="ml-2 block text-sm text-gray-300">
                    Keep me logged in
                  </label>
                </div>

                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-[#5DFCAF] hover:text-[#4DE89A] font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5DFCAF] text-[#021722] py-3 px-4 rounded-lg hover:bg-[#4DE89A] focus:ring-2 focus:ring-[#5DFCAF] focus:ring-offset-2 focus:ring-offset-[#021722] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#021722] mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#021722] text-gray-400">New to Master-Fees?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <button
              onClick={onSignup}
              className="w-full bg-white/10 text-white py-3 px-4 rounded-lg hover:bg-white/20 focus:ring-2 focus:ring-[#5DFCAF] focus:ring-offset-2 focus:ring-offset-[#021722] transition-all font-medium border border-gray-600"
            >
              Create School Account
            </button>


          </div>
        </div>

        {/* Right Side - Promotional Content */}
        <div className="flex-1 bg-white p-8 flex items-center justify-center border-l border-gray-100">
          <div className="max-w-lg">
            <div className="mb-8 flex justify-center">
              <img 
                src={logoImage} 
                alt="Master-Fees Logo" 
                className="w-48 h-48 object-contain"
              />
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
              Streamline Your School's Financial Management
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[#5DFCAF] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#003049]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-gray-700">Real-time fee tracking and payment monitoring</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[#5DFCAF] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#003049]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-gray-700">Comprehensive student and parent management</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[#5DFCAF] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#003049]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-gray-700">Automated reports and financial analytics</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[#5DFCAF] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#003049]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-gray-700">QuickBooks integration for seamless accounting</p>
              </div>
            </div>


          </div>
        </div>
      </div>


    </div>
  );
}