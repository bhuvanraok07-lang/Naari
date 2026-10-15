import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'naari_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore authenticated session on initial mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.token && parsed.user) {
            // Validate with server session endpoint
            const res = await fetch(`http://localhost:5000/api/auth/session`, {
              headers: { Authorization: `Bearer ${parsed.token}` },
            });
            if (res.ok) {
              const data = await res.json();
              if (data.authenticated && data.user) {
                setUser(data.user);
                setToken(parsed.token);
              } else {
                localStorage.removeItem(AUTH_STORAGE_KEY);
              }
            } else {
              localStorage.removeItem(AUTH_STORAGE_KEY);
            }
          }
        }
      } catch (err) {
        console.warn('Session verification fallback, using stored session:', err);
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.user && parsed.token) {
            setUser(parsed.user);
            setToken(parsed.token);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (name: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Authentication failed. Please check your credentials.',
        };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ token: data.token, user: data.user })
      );

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: 'Unable to connect to authentication server. Please ensure the backend is running.',
      };
    }
  };

  const logout = () => {
    if (token) {
      fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      }).catch(() => {});
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
