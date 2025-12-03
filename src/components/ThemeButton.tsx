"use client";

import { useTheme } from "@/context/ThemeContext";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ThemeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function ThemeButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ThemeButtonProps) {
  const { themeColors } = useTheme();

  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles = {
    primary: `bg-linear-to-r ${themeColors.gradient} text-white hover:shadow-xl shadow-lg`,
    secondary: `${themeColors.bgLight} ${themeColors.text} hover:${themeColors.bg} hover:text-white`,
    outline: `border-2 ${themeColors.border} ${themeColors.text} hover:${themeColors.bg} hover:text-white`,
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
