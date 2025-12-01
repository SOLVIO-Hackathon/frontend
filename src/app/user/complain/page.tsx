"use client";

import { useState } from "react";
import {
  MessageSquareWarning,
  MapPin,
  AlertCircle,
  Send,
  CheckCircle,
  FileText,
  Clock,
} from "lucide-react";

export default function Complain() {
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setArea("");
      setCategory("");
      setSubject("");
      setDescription("");
      setPriority("medium");
    }, 3000);
  };

  const categories = [
    { value: "collection", label: "Missed Collection", icon: "🚛" },
    { value: "overflow", label: "Overflowing Bins", icon: "🗑️" },
    { value: "illegal", label: "Illegal Dumping", icon: "⚠️" },
    { value: "service", label: "Service Quality", icon: "⭐" },
    { value: "schedule", label: "Schedule Issue", icon: "📅" },
    { value: "other", label: "Other", icon: "💬" },
  ];

  const priorities = [
    {
      value: "low",
      label: "Low",
      color: "bg-blue-100 text-blue-700 border-blue-300",
    },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
    {
      value: "high",
      label: "High",
      color: "bg-red-100 text-red-700 border-red-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <MessageSquareWarning className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Submit Complaint
              </h1>
              <p className="text-slate-600">
                Help us improve our waste management services
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-600 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900">
                Complaint Submitted Successfully!
              </h3>
              <p className="text-sm text-green-700">
                We will review your complaint and respond within 48 hours.
              </p>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Area Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Area/Location
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter the area or location of the issue"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-colors text-slate-900"
                  required
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Be specific about the location (e.g., Street name, landmark)
                </p>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Complaint Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                        category === cat.value
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 hover:border-red-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={category === cat.value}
                        onChange={(e) => setCategory(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <span className="text-2xl mb-1">{cat.icon}</span>
                      <span
                        className={`text-xs font-medium text-center ${
                          category === cat.value
                            ? "text-red-900"
                            : "text-slate-700"
                        }`}
                      >
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Priority Level
                </label>
                <div className="flex gap-3">
                  {priorities.map((p) => (
                    <label
                      key={p.value}
                      className={`flex-1 p-3 border-2 rounded-lg cursor-pointer transition-all text-center font-medium ${
                        priority === p.value
                          ? p.color
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={p.value}
                        checked={priority === p.value}
                        onChange={(e) => setPriority(e.target.value)}
                        className="sr-only"
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your complaint"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-colors text-slate-900"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Detailed Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information about your complaint..."
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-colors text-slate-900 resize-none"
                  required
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Include dates, times, and any other relevant details
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Complaint
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setArea("");
                    setCategory("");
                    setSubject("");
                    setDescription("");
                    setPriority("medium");
                  }}
                  className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            {/* Response Time */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
              <Clock className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-blue-100 mb-3">
                We aim to respond to all complaints within 48 hours
              </p>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Average Response</span>
                  <span className="font-semibold">24 hrs</span>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Complaint Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Be specific about the location and issue</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Include dates and times when applicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Provide photos if available (optional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Use respectful and professional language</span>
                </li>
              </ul>
            </div>

            {/* Common Issues */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">
                Common Issues
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-sm">
                    🚛
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Missed Collection
                    </p>
                    <p className="text-xs text-slate-600">
                      Most common complaint
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-sm">
                    ⚠️
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Illegal Dumping
                    </p>
                    <p className="text-xs text-slate-600">
                      Requires immediate action
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-sm">
                    📅
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Schedule Changes
                    </p>
                    <p className="text-xs text-slate-600">
                      Check our updates page
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-3">Need Urgent Help?</h3>
              <p className="text-sm text-slate-300 mb-4">
                For emergency waste issues, contact us directly
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-semibold">1-800-WASTE-HELP</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-semibold">support@zerobin.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
