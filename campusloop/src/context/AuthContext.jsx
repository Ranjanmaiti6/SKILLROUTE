import React, { createContext, useContext, useState, useEffect } from "react";
import { currentUser as defaultUser, adminUser as defaultAdmin } from "../data/mockUsers";
import { storageService } from "../services/storageService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storageService.getUser());
  const [role, setRole] = useState("student"); // "student" | "admin" | "guest"

  useEffect(() => {
    storageService.saveUser(user);
  }, [user]);

  const switchRole = (newRole) => {
    setRole(newRole);
    if (newRole === "admin") {
      setUser(defaultAdmin);
    } else if (newRole === "student") {
      setUser(storageService.getUser());
    }
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      storageService.saveUser(next);
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isStudent: role === "student",
        isAdmin: role === "admin",
        isGuest: role === "guest",
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
