import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2, AlertCircle, Lock, User } from 'lucide-react';

interface LoginPageProps {
  setCurrentTab: (tab: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentTab }) => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(name.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      // Redirect to dashboard on successful login
      setCurrentTab('dashboard');
    } else {
      setError(result.error || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gradient-to-b from-softPink-surface via-white to-softPink-light/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Main Login Card */}
        <div className="bg-white rounded-2xl shadow-premium border border-softPink-border/70 p-6 sm:p-8 relative overflow-hidden">
          
          {/* Subtle decorative background glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-softPink/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-blush/20 rounded-full blur-2xl pointer-events-none" />

          {/* Branding: Logo, NAARI AI brand name, Tagline */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3">
              <img
                src="/naari-logo.png"
                alt="NAARI AI Logo"
                className="w-16 h-16 rounded-full object-cover shadow-soft-purple border-2 border-amber-200/70 p-0.5 bg-white"
              />
            </div>
            
            <h1 className="text-2xl font-extrabold tracking-tight text-nearBlack font-display">
              NAARI <span className="text-brandPurple font-bold">AI</span>
            </h1>
            
            <p className="text-xs text-mutedText font-medium mt-1">
              Small Symptoms, Big Answers.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200/70 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{error}</div>
            </div>
          )}

          {/* Login Form: Contains ONLY Name, Password, and Login Button */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. Name Field */}
            <div>
              <label 
                htmlFor="user-name" 
                className="block text-xs font-semibold text-nearBlack mb-1.5"
              >
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedText">
                  <User className="w-4 h-4 text-blush-dark" />
                </div>
                <input
                  id="user-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-softPink-border bg-white text-nearBlack text-sm placeholder:text-mutedText/70 focus:outline-hidden focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition disabled:opacity-60"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* 2. Password Field */}
            <div>
              <label 
                htmlFor="user-password" 
                className="block text-xs font-semibold text-nearBlack mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedText">
                  <Lock className="w-4 h-4 text-blush-dark" />
                </div>
                <input
                  id="user-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-softPink-border bg-white text-nearBlack text-sm placeholder:text-mutedText/70 focus:outline-hidden focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition disabled:opacity-60"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* 3. Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-brandPurple hover:bg-brandPurple-hover focus:outline-hidden focus:ring-2 focus:ring-brandPurple/30 shadow-soft-purple transition duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>

          </form>

          {/* Secure Platform Guarantee Notice */}
          <div className="mt-5 pt-4 border-t border-softPink-border/50 text-center">
            <p className="text-[11px] text-mutedText">
              Private & encrypted health access • Passwords secured with PBKDF2
            </p>
          </div>

        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-4">
          <button
            onClick={() => setCurrentTab('landing')}
            className="text-xs font-medium text-brandPurple hover:text-brandPurple-hover transition underline underline-offset-2"
          >
            ← Return to Home
          </button>
        </div>

      </div>
    </div>
  );
};
