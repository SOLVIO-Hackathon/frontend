"use client";

import ListingCard from "@/components/flash-trade/ListingCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Filter, Search, MapPin } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Mock data
const MOCK_LISTINGS = [
    {
        id: "1",
        device_name: "Dell Inspiron 15 3000",
        device_type: "Laptop",
        condition: "Damaged",
        estimated_value_min: 2200,
        estimated_value_max: 2600,
        location: "Dhanmondi, Dhaka",
        distance: "1.2 km",
        time_ago: "2 hrs ago",
        image_url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "2",
        device_name: "Samsung Galaxy S8 (Broken Screen)",
        device_type: "Mobile",
        condition: "Scrap",
        estimated_value_min: 500,
        estimated_value_max: 800,
        location: "Mirpur 10, Dhaka",
        distance: "3.5 km",
        time_ago: "5 hrs ago",
        image_url: "https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "3",
        device_name: "Old CRT Monitor",
        device_type: "Monitor",
        condition: "Working",
        estimated_value_min: 300,
        estimated_value_max: 450,
        location: "Gulshan 1, Dhaka",
        distance: "5.0 km",
        time_ago: "1 day ago",
        image_url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800",
    },
];

export default function ListingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user && user.user_type === "citizen") {
            router.push("/flash-trade");
        }
    }, [user, loading, router]);

    if (loading || (user && user.user_type === "citizen")) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <Link
                                href="/flash-trade"
                                className="inline-flex items-center text-slate-500 hover:text-green-600 transition-colors mb-2"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Available E-Waste
                            </h1>
                            <p className="text-slate-600">
                                Find recyclable electronics near you.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </button>
                            <button className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                <MapPin className="w-4 h-4 mr-2" />
                                Nearby
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search listings by device name, type, or location..."
                            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-green-500/20 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Listings Grid */}
                    <div className="space-y-4">
                        {MOCK_LISTINGS.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
