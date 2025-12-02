"use client";

import UploadForm from "@/components/flash-trade/UploadForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link
                            href="/flash-trade"
                            className="inline-flex items-center text-slate-500 hover:text-green-600 transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Flash Trade
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Sell Your E-Waste
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Upload a clear photo of your device. Our AI will analyze it and
                            estimate its value instantly.
                        </p>
                    </div>

                    <UploadForm />
                </div>
            </div>
        </ProtectedRoute>
    );
}
