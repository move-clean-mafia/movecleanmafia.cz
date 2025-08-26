import {
  signInWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';

// Auth state interface
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Client-side auth utilities
export const signIn = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out');
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send password reset email');
  }
};

// Check if user is admin (you can customize this logic)
export const isAdmin = (user: User | null): boolean => {
  if (!user) return false;

  // Add your admin email logic here
  const adminEmails = [
    'vyacheslav.voloshyn@gmail.com',
    'move.cleanmafia@gmail.com',
  ];

  return adminEmails.includes(user.email || '');
};

// API-based auth utilities for client-side use
export const apiSignIn = async (
  email: string,
  password: string,
): Promise<any> => {
  const response = await fetch('/api/admin/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  return data;
};

export const apiSignOut = async (): Promise<void> => {
  const response = await fetch('/api/admin/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};
