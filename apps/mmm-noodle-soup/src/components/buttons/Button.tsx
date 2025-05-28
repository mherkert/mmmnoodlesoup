import React from "react";
import classNames from "classnames";
import { Button as HeadlessButton } from "@headlessui/react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  inverse?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent) => void;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  active = false,
  disabled = false,
  loading = false,
  inverse = false,
  type = "button",
  onClick,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = "rounded-md font-medium transition-colors";

  /** TODO: redo button variants, colours and styles. this is messy */
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light focus:outline-primary focus:outline-2 focus:outline-offset-2 outline-none",
    secondary: "bg-secondary-sage text-white hover:bg-secondary-sage/90",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-primary focus:outline-primary focus:outline-2 focus:outline-offset-2 outline-none",
    ghost: "bg-transparent text-primary focus:outline-primary focus:outline-1",
  };

  const inverseVariants = {
    primary: "bg-inverse text-primary hover:bg-inverse-light",
    secondary: "bg-secondary-sage text-primary hover:bg-secondary-sage/90",
    outline:
      "border-2 border-white text-white hover:bg-primary hover:text-white hover:border-primary focus:outline-white focus:outline-2 focus:outline-offset-2 outline-none",
    ghost: "bg-transparent text-white focus:outline-white focus:outline-1",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-1.5",
    lg: "px-5 py-2 text-lg",
  };

  const activeStyles = {
    primary: "bg-primary-light text-white",
    secondary: "bg-secondary-sage text-white",
    outline: "bg-primary text-white",
    ghost: "bg-transparent text-primary",
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
        inverse ? inverseVariants[variant] : variants[variant],
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
