import React from "react";
import { navigate } from "gatsby";
import { useAuth0 } from "@auth0/auth0-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallbackPath = "/",
}) => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(fallbackPath);
    }
  }, [isAuthenticated, isLoading, fallbackPath]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
};
