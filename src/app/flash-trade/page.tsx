"use client";

import Link from "next/link";
import { Camera, List, ArrowRight, Recycle, TrendingUp, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function FlashTradePage() {
    const { t } = useLanguage();
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Flash Trade
                            </span>{" "}
                            Marketplace
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Instant valuation, verified Kabadiwalas, and secure payments.
                            The smartest way to recycle your e-waste.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Seller Card */}
                        <div className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                            <div className="p-8">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Camera className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                    I have E-Waste
                                </h2>
                                <p className="text-slate-600 mb-8">
                                    Upload a photo, get an instant AI valuation, and receive bids from verified Kabadiwalas nearby.
                                </p>
                                <ul className="space-y-3 mb-8 text-sm text-slate-500">
                                    <li className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                        Instant AI Valuation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-green-500" />
                                        Verified Buyers
                                    </li>
                                </ul>
                                <Link
                                    href="/flash-trade/upload"
                                    className="block w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-200"
                                >
                                    Sell Now
                                </Link>
                            </div>
                        </div>

                        {/* Buyer Card */}
                        {user?.user_type !== "citizen" && (
                            <div className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                                <div className="p-8">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <List className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                        I am a Kabadiwala
                                    </h2>
                                    <p className="text-slate-600 mb-8">
                                        Browse verified listings, place bids, and grow your business with high-quality e-waste sourcing.
                                    </p>
                                    <ul className="space-y-3 mb-8 text-sm text-slate-500">
                                        <li className="flex items-center gap-2">
                                            <Recycle className="w-4 h-4 text-blue-500" />
                                            Steady Supply
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                                            Verified Sellers
                                        </li>
                                    </ul>
                                    <Link
                                        href="/flash-trade/listings"
                                        className="block w-full py-4 bg-white border-2 border-blue-100 text-blue-600 text-center font-semibold rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                                    >
                                        Browse Listings
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
