import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  sub: string; // Auth0 ID
}

interface AuthState {
  // State
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  error: Error | null;

  // Actions
  setAuthState: (
    state: Partial<Omit<AuthState, "setAuthState" | "login" | "logout">>
  ) => void;
  login: () => void;
  logout: () => void;

  // Computed
  isReady: boolean; // true when loading is complete
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      isLoading: true,
      user: null,
      error: null,

      // Actions
      setAuthState: (newState) => set((state) => ({ ...state, ...newState })),

      login: () => {
        // This will be set by the Auth0Provider wrapper
        console.log("Login requested");
      },

      logout: () => {
        // This will be set by the Auth0Provider wrapper
        console.log("Logout requested");
      },

      // Computed
      get isReady() {
        return !get().isLoading;
      },
    }),
    {
      name: "auth-storage",
      // Only persist non-sensitive data
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user
          ? {
              id: state.user.id,
              name: state.user.name,
              email: state.user.email,
              picture: state.user.picture,
              sub: state.user.sub,
            }
          : null,
      }),
    }
  )
);

// Hook for easy access
export const useAuth = () => {
  const store = useAuthStore();

  return {
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    user: store.user,
    error: store.error,
    isReady: store.isReady,
    login: store.login,
    logout: store.logout,
  };
};
