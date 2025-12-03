import { UserType } from "@/types/auth";

/**
 * Color schemes for different user roles
 */
export const roleColors = {
  citizen: {
    primary: "green",
    primaryHex: "#10b981",
    primaryLight: "emerald",
    gradient: "from-green-600 to-emerald-600",
    gradientHover: "from-green-700 to-emerald-700",
    bg: "bg-green-600",
    bgHover: "bg-green-700",
    text: "text-green-600",
    textHover: "text-green-700",
    border: "border-green-200",
    bgLight: "bg-green-50",
    bgGradient: "from-green-50 via-emerald-50 to-teal-50",
    bgGradientCard: "from-green-50 to-emerald-50",
    blobColors: ["bg-green-200", "bg-emerald-200", "bg-teal-200"],
  },
  admin: {
    primary: "red",
    primaryHex: "#ef4444",
    primaryLight: "rose",
    gradient: "from-red-600 to-rose-600",
    gradientHover: "from-red-700 to-rose-700",
    bg: "bg-red-600",
    bgHover: "bg-red-700",
    text: "text-red-600",
    textHover: "text-red-700",
    border: "border-red-200",
    bgLight: "bg-red-50",
    bgGradient: "from-red-50 via-rose-50 to-pink-50",
    bgGradientCard: "from-red-50 to-rose-50",
    blobColors: ["bg-red-200", "bg-rose-200", "bg-pink-200"],
  },
  kabadiwala: {
    primary: "blue",
    primaryHex: "#3b82f6",
    primaryLight: "sky",
    gradient: "from-blue-600 to-sky-600",
    gradientHover: "from-blue-700 to-sky-700",
    bg: "bg-blue-600",
    bgHover: "bg-blue-700",
    text: "text-blue-600",
    textHover: "text-blue-700",
    border: "border-blue-200",
    bgLight: "bg-blue-50",
    bgGradient: "from-blue-50 via-sky-50 to-cyan-50",
    bgGradientCard: "from-blue-50 to-sky-50",
    blobColors: ["bg-blue-200", "bg-sky-200", "bg-cyan-200"],
  },
  collector: {
    primary: "orange",
    primaryHex: "#f97316",
    primaryLight: "amber",
    gradient: "from-orange-600 to-amber-600",
    gradientHover: "from-orange-700 to-amber-700",
    bg: "bg-orange-600",
    bgHover: "bg-orange-700",
    text: "text-orange-600",
    textHover: "text-orange-700",
    border: "border-orange-200",
    bgLight: "bg-orange-50",
    bgGradient: "from-orange-50 via-amber-50 to-yellow-50",
    bgGradientCard: "from-orange-50 to-amber-50",
    blobColors: ["bg-orange-200", "bg-amber-200", "bg-yellow-200"],
  },
};

/**
 * Get theme colors based on user type
 */
export function getThemeColors(userType?: UserType) {
  if (!userType) {
    return roleColors.citizen; // Default to citizen green
  }
  return roleColors[userType];
}

/**
 * Get CSS variable values for dynamic theming
 */
export function getThemeCSSVars(userType?: UserType) {
  const colors = getThemeColors(userType);

  const colorMap: Record<string, string> = {
    green: "#10b981",
    red: "#ef4444",
    blue: "#3b82f6",
    orange: "#f97316",
  };

  return {
    "--theme-primary": colorMap[colors.primary],
    "--theme-primary-hex": colors.primaryHex,
  };
}
