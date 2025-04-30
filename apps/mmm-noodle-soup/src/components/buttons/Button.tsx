import React from "react";
import classNames from "classnames";
import { Button as HeadlessButton } from "@headlessui/react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  active = false,
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = "rounded-md font-medium transition-colors";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-secondary-sage text-white hover:bg-secondary-sage/90",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const activeStyles = {
    primary: "bg-primary-light text-white",
    secondary: "bg-secondary-sage text-white",
    outline: "bg-primary text-white",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";
  const loadingStyles = "cursor-wait";

  return (
    <HeadlessButton
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        active && activeStyles[variant],
        (disabled || loading) && disabledStyles,
        loading && loadingStyles,
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <span className="mr-2">Loading...</span>
          <span className="animate-spin">⟳</span>
        </span>
      ) : (
        children
      )}
    </HeadlessButton>
  );
};
