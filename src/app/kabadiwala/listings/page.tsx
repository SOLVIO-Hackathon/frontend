"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import ListingCard from "@/components/flash-trade/ListingCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Loader2, Filter } from "lucide-react";

export default function KabadiwalaListingsPage() {
    const { token } = useAuth();
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await apiRequest("/listings?status_filter=listed", {
                    auth: true,
                    token,
                });
                setListings(res.items || []);
            } catch (e) {
                console.error(e);
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
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Available Pickups</h1>
                            <p className="text-slate-600 mt-1">Find e-waste near you and place bids</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                        </div>
                    ) : listings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                            <p className="text-slate-500">No available listings at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.map((listing) => (
                                <ListingCard
                                    key={listing.id}
                                    listing={{
                                        id: listing.id,
                                        device_name: listing.device_name,
                                        device_type: listing.device_type,
                                        condition: listing.condition,
                                        estimated_value_min: listing.estimated_value_min,
                                        estimated_value_max: listing.estimated_value_max,
                                        location: "Dhaka", // Placeholder, ideally calculate from lat/long
                                        time_ago: "Recently", // Placeholder
                                        image_url: listing.image_urls?.[0] || "",
                                        distance: "2.5 km", // Placeholder
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
