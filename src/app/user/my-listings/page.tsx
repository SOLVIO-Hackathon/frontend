"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Loader2, MessageSquare, QrCode, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MyListingsPage() {
    const { token } = useAuth();
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchListings = async () => {
            if (!token) {
                console.log("No token available");
                setError("Not authenticated. Please log in.");
                setLoading(false);
                return;
            }
            try {
                console.log("Fetching listings with token:", token?.substring(0, 20) + "...");
                const res = await apiRequest("/listings/my", { auth: true, token }) as any;
                console.log("API Response:", res);
                console.log("Items:", res.items);
                console.log("Items length:", res.items?.length);
                setListings(res.items || []);
                setError(null);
            } catch (e: any) {
                console.error("Error fetching listings:", e);
                setError(e?.message || "Failed to fetch listings");
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, [token]);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">My Listings</h1>
                        <Link href="/user/listings" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                            + New Listing
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-200">
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    ) : listings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                            <p className="text-slate-500">You haven't listed any items yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {listings.map((listing) => (
                                <Link 
                                    key={listing.id} 
                                    href={`/user/my-listings/${listing.id}`}
                                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer"
                                >
                                    <div className="relative w-full md:w-32 h-32 shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                                        {listing.image_urls?.[0] && (
                                            <Image src={listing.image_urls[0]} alt={listing.device_name} fill className="object-cover" />
                                        )}
                                    </div>
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-slate-900">{listing.device_name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${listing.status === 'listed' ? 'bg-blue-100 text-blue-700' :
                                                    listing.status === 'bidding' ? 'bg-yellow-100 text-yellow-700' :
                                                    listing.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                        listing.status === 'picked_up' ? 'bg-slate-100 text-slate-700' :
                                                            'bg-slate-100 text-slate-700'
                                                }`}>
                                                {listing.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{listing.description}</p>

                                        <div className="flex flex-wrap gap-3">
                                            {listing.status === 'bidding' && (
                                                <div className="flex items-center gap-2 text-yellow-600 text-sm font-medium">
                                                    <Clock className="w-4 h-4" />
                                                    Bids Available - Click to View
                                                </div>
                                            )}
                                            {listing.status === 'accepted' && (
                                                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                                                    <MessageSquare className="w-4 h-4" />
                                                    Ready to Chat
                                                </div>
                                            )}
                                            {listing.status === 'picked_up' && (
                                                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                                                    <CheckCircle className="w-4 h-4" />
                                                    Pickup Completed
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
