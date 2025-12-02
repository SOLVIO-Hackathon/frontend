"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ArrowLeft, MapPin, Clock, ShieldCheck, User, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BidModal from "@/components/flash-trade/BidModal";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Mock data - in real app, fetch based on ID
const MOCK_LISTING = {
    id: "1",
    device_name: "Dell Inspiron 15 3000",
    device_type: "Laptop",
    condition: "Damaged",
    description: "Screen is cracked and battery doesn't hold charge. Hard drive removed. 8GB RAM included.",
    estimated_value_min: 2200,
    estimated_value_max: 2600,
    location: "Dhanmondi, Dhaka",
    seller_name: "Rahim U.",
    seller_rating: 4.8,
    seller_deals: 12,
    image_url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800",
    created_at: "2023-10-27T10:00:00Z",
};

export default function ListingDetailsPage() {
    const params = useParams();
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/flash-trade/listings"
                        className="inline-flex items-center text-slate-500 hover:text-green-600 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Listings
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            {/* Image Side */}
                            <div className="relative h-72 md:h-auto bg-slate-100">
                                <Image
                                    src={MOCK_LISTING.image_url}
                                    alt={MOCK_LISTING.device_name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content Side */}
                            <div className="p-8 md:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                            {MOCK_LISTING.condition}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600">
                                            {MOCK_LISTING.device_type}
                                        </span>
                                    </div>

                                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                        {MOCK_LISTING.device_name}
                                    </h1>

                                    <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {MOCK_LISTING.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            Posted 2 hrs ago
                                        </div>
                                    </div>

                                    <div className="prose prose-slate mb-8">
                                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">
                                            Description
                                        </h3>
                                        <p className="text-slate-600">{MOCK_LISTING.description}</p>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl mb-8">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">
                                                {MOCK_LISTING.seller_name}
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                {MOCK_LISTING.seller_rating} • {MOCK_LISTING.seller_deals} deals
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-6 p-4 bg-green-50 rounded-xl border border-green-100">
                                        <div>
                                            <p className="text-xs text-green-600 uppercase font-semibold">
                                                Estimated Value
                                            </p>
                                            <p className="text-2xl font-bold text-green-700">
                                                Tk {MOCK_LISTING.estimated_value_min.toLocaleString()} -{" "}
                                                {MOCK_LISTING.estimated_value_max.toLocaleString()}
                                            </p>
                                        </div>
                                        <ShieldCheck className="w-8 h-8 text-green-600 opacity-50" />
                                    </div>

                                    {user?.user_type !== "citizen" && (
                                        <button
                                            onClick={() => setIsBidModalOpen(true)}
                                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mb-8"
                                        >
                                            I'll Pick Up (Kabadiwala View)
                                        </button>
                                    )}

                                    {/* Demo: Seller View Section */}
                                    <div className="border-t border-slate-200 pt-8">
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                                            Seller View: Incoming Bids
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-xl border-2 border-green-100 bg-green-50/50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-bold text-slate-900">Kabadiwala Rahim</div>
                                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                            4.7 • 182 deals
                                                        </div>
                                                    </div>
                                                    <div className="text-lg font-bold text-green-700">Tk 2,400</div>
                                                </div>
                                                <div className="text-sm text-slate-600 mb-4">
                                                    "I can pick it up in 2 hrs. Cash payment."
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link
                                                        href="/flash-trade/chat/1"
                                                        className="flex-1 py-2 bg-green-600 text-white text-center rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors"
                                                    >
                                                        Accept Offer
                                                    </Link>
                                                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                                                        Decline
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BidModal
                isOpen={isBidModalOpen}
                onClose={() => setIsBidModalOpen(false)}
                listingId={MOCK_LISTING.id}
                estimatedMin={MOCK_LISTING.estimated_value_min}
                estimatedMax={MOCK_LISTING.estimated_value_max}
            />
        </ProtectedRoute>
    );
}
