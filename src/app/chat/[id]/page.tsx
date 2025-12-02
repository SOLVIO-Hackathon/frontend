"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ChatInterface from "@/components/flash-trade/ChatInterface";

export default function ChatPage() {
    const { id } = useParams();
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6">Transaction Chat</h1>
                    <ChatInterface chatId={id as string} currentUser={user} />
                </div>
            </div>
        </ProtectedRoute>
    );
}
