import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  title: string;
  institution: string;
  matchScore: number;
  profileInitials: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: User = {
  name: "Dr. Aisha Raza",
  email: "aisha.raza@iisat.edu.pk",
  title: "Assistant Professor",
  institution: "IISAT University",
  matchScore: 87,
  profileInitials: "AR",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("auth_user").then((stored) => {
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = async (_email: string, _password: string) => {
    setUser(MOCK_USER);
    await AsyncStorage.setItem("auth_user", JSON.stringify(MOCK_USER));
  };

  const signUp = async (name: string, email: string, _password: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const newUser: User = {
      ...MOCK_USER,
      name,
      email,
      profileInitials: initials,
      matchScore: 42,
    };
    setUser(newUser);
    await AsyncStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("auth_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      AsyncStorage.setItem("auth_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
