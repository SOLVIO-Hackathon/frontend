"use client";

import { useTheme } from "@/context/ThemeContext";

export default function DynamicBackground() {
  const { themeColors } = useTheme();

  return (
    <div className="fixed inset-0 -z-10">
      <div className={`absolute inset-0 bg-linear-to-br ${themeColors.bgGradient}`} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${themeColors.blobColors[0]} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob`}></div>
        <div className={`absolute top-40 right-10 w-72 h-72 ${themeColors.blobColors[1]} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000`}></div>
        <div className={`absolute bottom-20 left-1/2 w-72 h-72 ${themeColors.blobColors[2]} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000`}></div>
      </div>
    </div>
  );
}
