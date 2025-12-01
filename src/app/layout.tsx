"use client";

import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import FloatingChatbot from "@/components/FloatingChatbot";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Hide navbar and chatbot on login, register, and admin pages
  const hideNavbar =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname?.startsWith("/admin");

  const hideChatbot =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-white text-slate-900`}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <AuthProvider>
          <LanguageProvider>
            {!hideNavbar && <Navbar />}
            <main className="flex-1">{children}</main>
            {!hideChatbot && <FloatingChatbot />}
            <Toaster position="top-right" gutter={8} />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
