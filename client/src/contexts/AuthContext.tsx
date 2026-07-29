/**
 * Auth Context — Provides authentication state to the entire app
 *
 * Wrap your app with <AuthProvider> and use the useAuthContext() hook
 * to access the current user, profile, loading state, and auth actions.
 *
 * Usage:
 *   // In App.tsx:
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 *
 *   // In any component:
 *   const { user, profile, signOut } = useAuthContext();
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Profile } from "../types/database";

// ==================
// TYPES
// ==================

interface AuthContextType {
  // State
  user: User | null; // Supabase auth user (email, id)
  profile: Profile | null; // Our custom profile (role, name, department)
  session: Session | null; // Auth session (token)
  loading: boolean; // True while checking auth on page load

  // Actions
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role?: Profile["role"]
  ) => Promise<{ error: Error | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// ==================
// CONTEXT
// ==================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==================
// PROVIDER COMPONENT
// ==================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user's profile from our profiles table
  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      return;
    }
    setProfile(data);
  }

  // Refresh profile (call after updating profile data)
  async function refreshProfile() {
    if (user) {
      await fetchProfile(user.id);
    }
  }

  // Sign up a new user
  async function signUp(
    email: string,
    password: string,
    fullName: string,
    role: Profile["role"] = "student_staff"
  ) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });
    return { error: error as Error | null };
  }

  // Sign in an existing user
  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  }

  // Sign out
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  }

  // Listen for auth state changes (login, logout, token refresh)
  useEffect(() => {
    // 1. Check if there's already a session (page refresh)
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      setLoading(false);
    });

    // 2. Listen for future changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        fetchProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
    });

    // 3. Cleanup listener on unmount
    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ==================
// HOOK
// ==================

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an <AuthProvider>");
  }
  return context;
}
