import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthStore } from "../../store/authStore";

interface AuthBridgeProps {
  children: React.ReactNode;
}

/**
 * This component is used to bridge the Auth0 state with the Zustand store.
 * It is used to ensure that the Auth0 state is synced with the Zustand store
 * and that the Zustand store is used to manage the authentication state.
 *
 */
export const AuthBridge: React.FC<AuthBridgeProps> = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    error,
    loginWithRedirect,
    logout: auth0Logout,
  } = useAuth0();

  const { setAuthState } = useAuthStore();

  // Sync Auth0 state with Zustand store
  useEffect(() => {
    setAuthState({
      isAuthenticated,
      isLoading,
      user: user
        ? {
            id: user.sub!,
            name: user.name!,
            email: user.email!,
            picture: user.picture!,
            sub: user.sub!,
          }
        : null,
      error,
    });
  }, [isAuthenticated, isLoading, user, error, setAuthState]);

  // Override login/logout functions in store
  useEffect(() => {
    useAuthStore.setState({
      login: () => loginWithRedirect(),
      logout: () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } }),
    });
  }, [loginWithRedirect, auth0Logout]);

  // This component doesn't render anything, just syncs state
  return <>{children}</>;
};
