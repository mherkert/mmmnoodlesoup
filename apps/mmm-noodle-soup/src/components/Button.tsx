import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
}: ButtonProps) => {
  const baseStyles = "rounded-md font-medium transition-colors";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-secondary-sage text-white hover:bg-secondary-sage/90",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyles, variants[variant], sizes[size])}
    >
      {children}
    </button>
  );
};
