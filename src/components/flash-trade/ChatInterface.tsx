"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Phone, AlertCircle } from "lucide-react";

interface Message {
    id: string;
    sender: "me" | "other";
    text: string;
    timestamp: string;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "other",
            text: "Hello! I'm interested in picking up your laptop.",
            timestamp: "10:00 AM",
        },
        {
            id: "2",
            sender: "me",
            text: "Great! When can you come?",
            timestamp: "10:05 AM",
        },
        {
            id: "3",
            sender: "other",
            text: "I can be there in about an hour. Is that okay?",
            timestamp: "10:06 AM",
        },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg: Message = {
            id: Date.now().toString(),
            sender: "me",
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, msg]);
        setNewMessage("");
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-slate-900">Chat with Rahim U.</h3>
                    <p className="text-xs text-slate-500">Deal Confirmed • Pickup in progress</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    <AlertCircle className="w-3 h-3" />
                    Phone number hidden for privacy
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === "me"
                                    ? "bg-green-600 text-white rounded-tr-none"
                                    : "bg-slate-100 text-slate-800 rounded-tl-none"
                                }`}
                        >
                            <p className="text-sm">{msg.text}</p>
                            <p
                                className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-green-100" : "text-slate-400"
                                    }`}
                            >
                                {msg.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
