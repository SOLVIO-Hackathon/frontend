"use client";

import {
  ArrowRight,
  LayoutDashboard,
  Truck,
  BarChart3,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { t } = useLanguage();
  const { themeColors } = useTheme();

  return (
  <div className={`relative min-h-screen bg-linear-to-br ${themeColors.bgGradient}`}>
      {/* Animated Background Orbs - Behind all content */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-20 left-10 w-72 h-72 ${themeColors.blobColors[0]} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob`}></div>
        <div className={`absolute top-40 right-10 w-72 h-72 ${themeColors.blobColors[1]} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000`}></div>
        <div className={`absolute bottom-20 left-1/2 w-72 h-72 ${themeColors.blobColors[2]} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000`}></div>
      </div>

      {/* All existing content - unchanged */}
      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="flex-1 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex flex-col items-center justify-center text-center relative min-h-[80vh]">
            {/* Left Content */}
            <div
              className="slide-in-left"
              style={{ animationPlayState: "running" }}
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r ${themeColors.bgGradientCard} ${themeColors.text} text-sm font-medium mb-6 fade-in`}
                style={{ animationPlayState: "running" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" />
                  <path d="M22 5h-4" />
                  <path d="M4 17v2" />
                  <path d="M5 18H3" />
                </svg>
                <span>{t("trustedBy")}</span>
              </div>
              <h1 className="sm:text-5xl lg:text-6xl xl:text-7xl leading-tight fade-in-delay-1 text-4xl font-normal tracking-tighter mb-6">
                <span className={`bg-linear-to-r ${themeColors.gradient} bg-clip-text text-transparent`}>
                  {t("heroTitleSmart")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Leaf className={`w-8 h-8 sm:w-10 sm:h-10 ${themeColors.text}`} />
                </span>
                <br />
                <span className="text-slate-900">{t("heroTitleWaste")}</span>
                <br />
                <span className="text-slate-600">
                  {t("heroTitleReimagined")}
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed fade-in-delay-2">
                {t("heroDescription")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in-delay-3">
                <button className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r ${themeColors.gradient} hover:${themeColors.gradientHover} text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                  <ArrowRight className="w-5 h-5" />
                  {t("startJourney")}
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <circle cx={12} cy={12} r={10} />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  {t("watchDemo")}
                </button>
              </div>
              {/* Enhanced Partners Section */}
              <div className="space-y-6 fade-in-delay-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    {t("globalPartners")}
                  </h3>
                  <div className="flex-1 h-px bg-linear-to-r from-slate-200 to-transparent" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-center">
                  <div className={`flex items-center justify-center p-4 rounded-lg bg-white border border-slate-100 hover:${themeColors.border} transition-colors duration-200`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-6 h-6 ${themeColors.text}`}
                    >
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                      <path d="M10 6h4" />
                      <path d="M10 10h4" />
                      <path d="M10 14h4" />
                      <path d="M10 18h4" />
                    </svg>
                    <span className="ml-2 font-semibold text-slate-600">
                      EcoCity
                    </span>
                  </div>
                  <div className={`flex items-center justify-center p-4 rounded-lg bg-white border border-slate-100 hover:${themeColors.border} transition-colors duration-200`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-6 h-6 ${themeColors.text}`}
                    >
                      <path d="M10 18v-7" />
                      <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
                      <path d="M14 18v-7" />
                      <path d="M18 18v-7" />
                      <path d="M3 22h18" />
                      <path d="M6 18v-7" />
                    </svg>
                    <span className="ml-2 font-semibold text-slate-600">
                      GreenGov
                    </span>
                  </div>
                  <div className={`flex items-center justify-center p-4 rounded-lg bg-white border border-slate-100 hover:${themeColors.border} transition-colors duration-200`}>
                    <Truck className={`w-6 h-6 ${themeColors.text}`} />
                    <span className="ml-2 font-semibold text-slate-600">
                      WasteX
                    </span>
                  </div>
                  <div className={`flex items-center justify-center p-4 rounded-lg bg-white border border-slate-100 hover:${themeColors.border} transition-colors duration-200`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-6 h-6 ${themeColors.text}`}
                    >
                      <path d="M7 10v12" />
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    <span className="ml-2 font-semibold text-slate-600">
                      RecycleHub
                    </span>
                  </div>
                  <div className={`flex items-center justify-center p-4 rounded-lg bg-white border border-slate-100 hover:${themeColors.border} transition-colors duration-200`}>
                    <Leaf className={`w-6 h-6 ${themeColors.text}`} />
                    <span className="ml-2 font-semibold text-slate-600">
                      EarthCare
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
  <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {t("whyChoose")} <span className={themeColors.text}>ZeroBin</span>
                ?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t("whyChooseSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className={`p-8 rounded-2xl bg-linear-to-br ${themeColors.bgGradientCard} border ${themeColors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`w-14 h-14 bg-linear-to-br ${themeColors.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <LayoutDashboard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("featureSmartDashboard")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("featureSmartDashboardDesc")}
                </p>
              </div>

              {/* Feature 2 */}
              <div className={`p-8 rounded-2xl bg-linear-to-br ${themeColors.bgGradientCard} border ${themeColors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`w-14 h-14 bg-linear-to-br ${themeColors.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("featureAIRoutes")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("featureAIRoutesDesc")}
                </p>
              </div>

              {/* Feature 3 */}
              <div className={`p-8 rounded-2xl bg-linear-to-br ${themeColors.bgGradientCard} border ${themeColors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`w-14 h-14 bg-linear-to-br ${themeColors.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("featureAnalytics")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("featureAnalyticsDesc")}
                </p>
              </div>

              {/* Feature 4 */}
              <div className={`p-8 rounded-2xl bg-linear-to-br ${themeColors.bgGradientCard} border ${themeColors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`w-14 h-14 bg-linear-to-br ${themeColors.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("featureEcoFriendly")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("featureEcoFriendlyDesc")}
                </p>
              </div>

              {/* Feature 5 */}
              <div className={`p-8 rounded-2xl bg-linear-to-br ${themeColors.bgGradientCard} border ${themeColors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`w-14 h-14 bg-linear-to-br ${themeColors.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-white"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("featureCostSavings")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("featureCostSavingsDesc")}
                </p>
              </div>

              {/* Feature 6 */}
              <div className={`p-8 rounded-2xl bg-linear-to-br ${themeColors.bgGradientCard} border ${themeColors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`w-14 h-14 bg-linear-to-br ${themeColors.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-white"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {t("featureCommunity")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("featureCommunityDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
  <section className="py-20 bg-linear-to-br from-slate-50 to-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {t("howItWorks").split(" ")[0]} {t("howItWorks").split(" ")[1]}{" "}
                <span className={themeColors.text}>
                  {t("howItWorks").split(" ")[2]}
                </span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t("howItWorksSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-linear-to-br ${themeColors.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <div className={`absolute top-10 left-1/2 w-full h-0.5 ${themeColors.border} -z-10 hidden md:block`}></div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {t("step1Title")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("step1Desc")}
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-linear-to-br ${themeColors.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <div className={`absolute top-10 left-1/2 w-full h-0.5 ${themeColors.border} -z-10 hidden md:block`}></div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {t("step2Title")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("step2Desc")}
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-linear-to-br ${themeColors.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {t("step3Title")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("step3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
  <section className={`py-20 bg-linear-to-r ${themeColors.gradient}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-white mb-2">500K+</div>
                <div className="text-white/80 text-lg">{t("activeUsers")}</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">2M+</div>
                <div className="text-white/80 text-lg">
                  {t("tonsRecycled")}
                </div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">40%</div>
                <div className="text-white/80 text-lg">
                  {t("costReduction")}
                </div>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">150+</div>
                <div className="text-white/80 text-lg">
                  {t("citiesCovered")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/logo.png"
                    alt="ZeroBin Logo"
                    width={48}
                    height={48}
                  />
                  <span className="text-2xl font-semibold text-white">
                    ZeroBin
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Revolutionizing waste management with AI-powered solutions for a cleaner, greener tomorrow.
                </p>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/user/ReportWaste" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Report Waste
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/listings" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/leaderboard" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/badges/my-badges" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Rewards
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                      Compliance
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-slate-800">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-slate-400">
                  © {new Date().getFullYear()} ZeroBin. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                  <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className={`hover:${themeColors.text} transition-colors duration-200`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
  </div>
  </div>
  );
}
