"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquareWarning, CheckCircle } from "lucide-react";

type Sentiment = {
  text: string;
  sentiment: "negative" | "neutral" | "positive";
  confidence: number;
};

type Complaint = {
  id: number;
  text: string;
  language: string;
  sentiment: string;
  confidence: number;
  severity: string;
  created_at: string;
};

function detectLanguage(text: string): "bn" | "en" {
  return /[\u0980-\u09FF]/.test(text) ? "bn" : "en";
}

export default function Complain() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<"bn" | "en">("en");
  const [result, setResult] = useState<Sentiment | null>(null);
  const [severity, setSeverity] = useState("low");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    setLanguage(detectLanguage(text));
  }, [text]);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Sentiment failed");
      const payload: Sentiment = {
        text: data?.result?.text ?? text,
        sentiment: data?.result?.sentiment ?? "neutral",
        confidence: data?.result?.confidence ?? 0,
      };
      setResult(payload);
      const conf = payload.confidence;
      setSeverity(conf >= 0.8 ? "high" : conf >= 0.5 ? "medium" : "low");
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = useMemo(() => !!text.trim() && !!result, [text, result]);

  const submitComplaint = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: result!.text,
          language,
          sentiment: result!.sentiment,
          confidence: result!.confidence,
          severity,
        }),
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        let msg = "Create failed";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          msg = data?.detail || data?.error || msg;
        } else {
          const t = await res.text();
          msg = t || msg;
        }
        throw new Error(msg);
      }
      // parse json if available
      let created: any = null;
      if (contentType.includes("application/json")) {
        created = await res.json();
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
      setText("");
      setResult(null);
      setSeverity("low");
      await loadComplaints();
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  const loadComplaints = async () => {
    try {
      const res = await fetch("/api/complaints");
      const data = await res.json();
      if (res.ok) setComplaints(data);
    } catch {}
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <MessageSquareWarning className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Submit Complaint</h1>
              <p className="text-slate-600">Enter your complaint and we’ll auto-detect sentiment.</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-600 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900">Complaint Submitted Successfully!</h3>
              <p className="text-sm text-green-700">We will review your complaint and respond within 48 hours.</p>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Complaint</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe your complaint..."
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-colors text-slate-900 resize-y"
                  />
                  {text && (
                    <p className="mt-1.5 text-xs text-slate-500">Detected language: {language === "bn" ? "Bangla" : "English"}</p>
                  )}
                </div>

                {result && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Text</label>
                      <input
                        value={result.text}
                        onChange={(e) => setResult({ ...result!, text: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Sentiment</label>
                      <select
                        value={result.sentiment}
                        onChange={(e) => setResult({ ...result!, sentiment: e.target.value as Sentiment["sentiment"] })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="negative">negative</option>
                        <option value="neutral">neutral</option>
                        <option value="positive">positive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Confidence</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={result.confidence}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          const conf = isNaN(v) ? 0 : v;
                          setResult({ ...result!, confidence: conf });
                          setSeverity(conf >= 0.8 ? "high" : conf >= 0.5 ? "medium" : "low");
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Severity</label>
                      <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={analyze}
                    disabled={loading || !text.trim()}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
                  >
                    {loading ? "Analyzing..." : "Analyze Sentiment"}
                  </button>
                  <button
                    type="button"
                    onClick={submitComplaint}
                    disabled={loading || !canSubmit}
                    className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Create Complaint"}
                  </button>
                </div>

                {error && <div className="text-sm text-red-600">Error: {error}</div>}
              </form>
            </div>
          </div>

          {/* Right: Previous complaints */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">Previous Complaints</h3>
              <div className="space-y-3">
                {complaints.length === 0 ? (
                  <div className="text-slate-600 text-sm">No complaints yet.</div>
                ) : (
                  complaints.map((c) => (
                    <div key={c.id} className="border border-slate-200 rounded p-3">
                      <div className="text-xs text-slate-500">#{c.id} • {new Date(c.created_at).toLocaleString()}</div>
                      <div className="mt-1 text-sm font-medium text-slate-900">{c.text}</div>
                      <div className="text-xs text-slate-600">Lang: {c.language} • Sentiment: {c.sentiment} • Conf: {c.confidence.toFixed(3)} • Severity: {c.severity}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
