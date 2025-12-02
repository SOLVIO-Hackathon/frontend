"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CollectorDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { token } = useAuth();

  // Modal + form state
  const [open, setOpen] = useState(false);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Role-based protection: only allow collectors
  useEffect(() => {
    if (!loading && user && user.user_type !== "collector") {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) return null;
  if (!user || user.user_type !== "collector") return null;

  const useMyLocation = () => {
    setFormError(null);
    if (!navigator.geolocation) {
      setFormError("Geolocation not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(String(pos.coords.latitude));
        setLongitude(String(pos.coords.longitude));
      },
      (err) => {
        setFormError("Couldn't get location. Please allow location access.");
        // eslint-disable-next-line no-console
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async () => {
    setFormError(null);
    const latNum = Number(latitude);
    const lngNum = Number(longitude);
    if (
      Number.isNaN(latNum) ||
      Number.isNaN(lngNum) ||
      latNum < -90 ||
      latNum > 90 ||
      lngNum < -180 ||
      lngNum > 180
    ) {
      setFormError("Please enter valid coordinates: lat [-90..90], lng [-180..180].");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/collectors/me/location`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ latitude: latNum, longitude: lngNum }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Failed: ${res.status}`);
      }
      toast.success("Location updated");
      setOpen(false);
      setLatitude("");
      setLongitude("");
    } catch (e: any) {
      const msg = e?.message || "Failed to update location";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Collector Dashboard</h1>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow"
          >
            <MapPin className="w-4 h-4" /> Update Location
          </button>
        </div>

        {/* Helper Card */}
        <div className="mt-6 bg-white/60 border border-slate-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Keep your location up to date</h2>
          <p className="text-sm text-slate-600">
            Update your current coordinates so citizens and the system can assign nearby pickup tasks.
          </p>
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => !submitting && setOpen(false)}
            />
            <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Update Location</h3>
                <button
                  className="text-slate-500 hover:text-slate-700"
                  onClick={() => !submitting && setOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                {formError && (
                  <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">
                    {formError}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g., 23.8103"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g., 90.4125"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={useMyLocation}
                    className="px-3 py-2 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors"
                    disabled={submitting}
                  >
                    Use my current location
                  </button>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3 bg-slate-50">
                <button
                  type="button"
                  onClick={() => !submitting && setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white disabled:opacity-60"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 disabled:opacity-60"
                  disabled={submitting}
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
