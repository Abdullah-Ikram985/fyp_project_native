import { authService } from '@/api/services/authServicr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'candidate' | 'recruiter';

interface User {
  role: UserRole;
  name: string;
  email: string;
  title: string;
  institution: string;
  matchScore: number;
  profileInitials: string;
  organization?: string;
  recruiterTitle?: string;
  phoneNumber?: string;
  location?: string;
  linkedinProfileLink?: string;
  personalWebsiteLink?: string;
  skills?: string[];
  professionalBio?: string;
  experience?: Array<{ title?: string; company?: string; duration?: string }>;
  education?: Array<{ degree?: string; institution?: string; year?: string }>;
  preferredRole?: string;
  preferredType?: string;
  expectedSalary?: number;
  pdfUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, passwordConfirm: string) => Promise<any>;
  signUp: (
    name: string,
    email: string,
    password: string,
    role?: UserRole,
    extra?: { organization?: string },
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_CANDIDATE: User = {
  role: 'candidate',
  name: 'Dr. Aisha Raza',
  email: 'aisha.raza@iisat.edu.pk',
  title: 'Assistant Professor',
  institution: 'IISAT University',
  matchScore: 87,
  profileInitials: 'AR',
};

const MOCK_RECRUITER: User = {
  role: 'recruiter',
  name: 'Sarah Mitchell',
  email: 'sarah@stanford.edu',
  title: 'HR Director',
  institution: 'Stanford University',
  organization: 'Stanford University',
  recruiterTitle: 'HR Director',
  matchScore: 0,
  profileInitials: 'SM',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    const restore = async () => {
      const storedUser = await AsyncStorage.getItem('auth_user');
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    restore();
  }, []);
  const signIn = async (
    _email: string,
    _password: string,
    role: UserRole = 'candidate',
  ) => {
    try {
      console.log('callllll');
      const response = await authService.loginUser(_email, _password);

      console.log('response', response);

      const currentUser = response.data.user;

      console.log('current USer', currentUser);

      setUser(currentUser);
      await AsyncStorage.setItem('auth_user', JSON.stringify(currentUser));
      await AsyncStorage.setItem('authToken', response.token);
      console.log('Current User  ', currentUser);
      return currentUser;
    } catch (error: any) {
      throw error;
    }
  };

  const signUp = async (
    name: string,
    email: string,
    _password: string,
    role: UserRole = 'candidate',
  ) => {
    try {
      console.log('Sign up', role);
      const response = await authService.signUpUser(
        name,
        email,
        _password,
        role,
      );

      console.log('response', response);

      const currentUser = response.data.user;

      console.log('current USer', currentUser);

      setUser(currentUser);
      await AsyncStorage.setItem('auth_user', JSON.stringify(currentUser));
      await AsyncStorage.setItem('authToken', response.token);
    } catch (error: any) {
      console.log('Signup Contex Error  =>', error?.response?.data?.message);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      if (!email) return { success: false, message: 'Email is required' };

      const response = await authService.forgetPassword(email);
      if (response.resetToken) {
        setResetToken(response.resetToken);
      }

      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong';

      return { success: false, message };
    }
  };
  const resetPassword = async (password: string, passwordConfirm: string) => {
    try {
      if (!password || !passwordConfirm)
        return { success: false, message: 'Both fields are required!' };

      if (!resetToken)
        return {
          success: false,
          message: 'Reset token missing. Please request a new one.',
        };

      const response = await authService.resetPassword(
        resetToken,
        password,
        passwordConfirm,
      );

      setResetToken(null);

      return {
        success: response.status === 'success',
        message: response.message,
      };
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong';
      return { success: false, message };
    }
  };
  const signOut = async () => {
    setUser(null);
    await AsyncStorage.multiRemove(['auth_user', 'authToken']);
  };

  const updateUser = async (payload: Partial<User>) => {
    if (user) {
      try {
        const response = await authService.updateUser(payload);
        console.log('updateResponse', response);

        // Support multiple possible response shapes from the backend:
        // 1) { user: {...}, token? }
        // 2) { data: { userProfile: {...} } }
        // 3) { userProfile: {...} }
        const profileFromResponse =
          (response && (response.user || response.userProfile)) ||
          (response?.data && (response.data.user || response.data.userProfile));

        // Merge existing user with any returned profile fields
        const mergedUser = { ...user, ...(profileFromResponse ?? {}) } as User;

        await AsyncStorage.setItem('auth_user', JSON.stringify(mergedUser));
        setUser(mergedUser);
      } catch (error) {
        console.error('Failed to update user profile:', error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        forgotPassword,
        resetPassword,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
