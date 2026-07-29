/**
 * useAuth Hook — Convenient wrapper for common auth operations
 *
 * This hook re-exports the auth context values and adds
 * helper functions for common role checks.
 *
 * Usage:
 *   const { profile, isAdmin, isMaintenance, isStudent } = useAuth();
 *
 *   if (isAdmin) {
 *     // Show admin panel
 *   }
 */

import { useAuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const auth = useAuthContext();

  return {
    ...auth,

    // Role helper booleans (cleaner than checking profile?.role everywhere)
    isStudent: auth.profile?.role === "student_staff",
    isMaintenance: auth.profile?.role === "maintenance",
    isAdmin: auth.profile?.role === "admin",

    // Is the user logged in?
    isAuthenticated: !!auth.user,
  };
}
