'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserSession, LoginCredentials, RegisterCredentials, GoogleAuthPayload } from '../types/auth';
import { apiLogin, apiRegister, apiGoogleAuth, apiGitHubAuth, getDemoUser } from './auth-api';

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogleRedirect: () => void;
  loginWithEmail: (credentials: LoginCredentials) => Promise<UserSession>;
  registerWithEmail: (credentials: RegisterCredentials) => Promise<UserSession>;
  loginWithGoogle: (payload?: GoogleAuthPayload) => Promise<UserSession>;
  loginWithGitHub: () => Promise<UserSession>;
  loginAsDemoUser: (id: 'aarav' | 'ranjan') => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'skillroute_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Synchronize session from server cookie or localStorage
  const syncSession = useCallback(async () => {
    try {
      // 1. Check server session cookie
      const res = await fetch('/api/auth/session', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // ignore network errors
    }

    // 2. Check localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default initial persona for instant hackathon exploration
        const defaultUser = getDemoUser('aarav');
        setUser(defaultUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
      }
    } catch {
      setUser(getDemoUser('aarav'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    syncSession();
  }, [syncSession]);

  const saveUserSession = (session: UserSession | null) => {
    setUser(session);
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      // Also write cookie so server routes recognize it
      document.cookie = `skillroute_session=${encodeURIComponent(JSON.stringify(session))}; path=/; max-age=604800; SameSite=Lax`;
    } else {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = 'skillroute_session=; path=/; max-age=0';
    }
  };

  /**
   * Real Google OAuth 2.0 / OpenID Connect redirect flow.
   * Navigates directly to /api/auth/google which redirects to accounts.google.com
   */
  const loginWithGoogleRedirect = () => {
    window.location.href = '/api/auth/google';
  };

  const loginWithEmail = async (credentials: LoginCredentials): Promise<UserSession> => {
    setIsLoading(true);
    try {
      const session = await apiLogin(credentials);
      saveUserSession(session);
      return session;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithEmail = async (credentials: RegisterCredentials): Promise<UserSession> => {
    setIsLoading(true);
    try {
      const session = await apiRegister(credentials);
      saveUserSession(session);
      return session;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (payload?: GoogleAuthPayload): Promise<UserSession> => {
    setIsLoading(true);
    try {
      const session = await apiGoogleAuth(payload || {});
      saveUserSession(session);
      return session;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async (): Promise<UserSession> => {
    setIsLoading(true);
    try {
      const session = await apiGitHubAuth();
      saveUserSession(session);
      return session;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemoUser = (id: 'aarav' | 'ranjan') => {
    const demo = getDemoUser(id);
    saveUserSession(demo);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        authModalOpen,
        openAuthModal: () => setAuthModalOpen(true),
        closeAuthModal: () => setAuthModalOpen(false),
        loginWithGoogleRedirect,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginWithGitHub,
        loginAsDemoUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
