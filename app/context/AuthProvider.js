"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const isLoading = status === "loading";
  const isSignedIn = status === "authenticated";
  const isUserExistInDB = session?.user.isUserExistInDB

  useEffect(() => {
    if (session) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);

  const login = (provider) => {
    signIn(provider);
  };

  const logout = () => {
    signOut();
  };
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isSignedIn, session, isUserExistInDB }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
