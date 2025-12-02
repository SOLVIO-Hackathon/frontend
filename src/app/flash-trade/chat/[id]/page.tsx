"use client";

import ChatInterface from "@/components/flash-trade/ChatInterface";
import WeightVerification from "@/components/flash-trade/WeightVerification";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ChatPage() {
    // Mock role - in real app, get from auth context
    // Toggle this to test different views
    const [userRole, setUserRole] = useState<"seller" | "kabadiwala">("seller");
    const [isCompleted, setIsCompleted] = useState(false);

    const handleVerificationComplete = (weight: number) => {
        setIsCompleted(true);
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <Link
                                href="/flash-trade"
                                className="inline-flex items-center text-slate-500 hover:text-green-600 transition-colors mb-2"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Pickup Coordination
                            </h1>
                        </div>

                        {/* Dev Toggle - Remove in production */}
                        <button
                            onClick={() => setUserRole(r => r === "seller" ? "kabadiwala" : "seller")}
                            className="text-xs bg-slate-200 px-2 py-1 rounded"
                        >
                            Switch Role: {userRole}
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Chat Section */}
                        <div className="lg:col-span-2">
                            <ChatInterface />
                        </div>

                        {/* Sidebar / Actions */}
                        <div className="space-y-6">
                            {/* Deal Summary */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                                    Deal Summary
                                </h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg relative overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=200"
                                            alt="Item"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">Dell Inspiron 15</div>
                                        <div className="text-sm text-slate-500">Agreed Price: Tk 2,400</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Deal Confirmed
                                </div>
                            </div>

                            {/* Verification Section */}
                            {!isCompleted ? (
                                <WeightVerification
                                    userRole={userRole}
                                    listingId="1"
                                    onVerified={handleVerificationComplete}
                                />
                            ) : (
                                <div className="bg-green-600 text-white p-8 rounded-2xl shadow-lg text-center animate-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">Transaction Complete!</h2>
                                    <p className="text-green-100 mb-6">
                                        Payment of Tk 2,400 has been processed successfully.
                                    </p>
                                    <Link
                                        href="/flash-trade"
                                        className="inline-block w-full py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors"
                                    >
                                        Back to Dashboard
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
