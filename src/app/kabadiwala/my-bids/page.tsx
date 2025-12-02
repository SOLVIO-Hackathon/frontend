"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Loader2, MessageSquare, Scan, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function MyBidsPage() {
    const { token } = useAuth();
    const [bids, setBids] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const res = await apiRequest("/bids/my-bids", { auth: true, token });
                setBids(res || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchBids();
    }, [token]);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">My Bids</h1>
                        <Link href="/kabadiwala/listings" className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium">
                            Find More Items
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                        </div>
                    ) : bids.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                            <p className="text-slate-500">You haven't placed any bids yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bids.map((bid) => (
                                <div key={bid.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Bid on Listing #{bid.listing_id.slice(0, 8)}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${bid.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                    bid.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-slate-100 text-slate-700'
                                                }`}>
                                                {bid.status}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-2">Offered: Tk {bid.offered_price}</p>
                                        <p className="text-slate-500 text-sm mb-4">Message: {bid.message}</p>

                                        <div className="flex flex-wrap gap-3">
                                            {bid.status === 'accepted' && (
                                                <>
                                                    <Link href={`/chat/${bid.listing_id}`} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                                                        <MessageSquare className="w-4 h-4" />
                                                        Chat
                                                    </Link>
                                                    <Link href={`/kabadiwala/pickup/${bid.listing_id}`} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                                                        <Scan className="w-4 h-4" />
                                                        Scan for Pickup
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
