"use client";

import { useState } from "react";
import { QrCode, Scan, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";

interface WeightVerificationProps {
    userRole: "seller" | "kabadiwala";
    listingId: string;
    onVerified: (weight: number) => void;
}

export default function WeightVerification({
    userRole,
    listingId,
    onVerified,
}: WeightVerificationProps) {
    const [showQR, setShowQR] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [weightInput, setWeightInput] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    // Mock QR Code URL (in real app, generate from backend)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=flashtrade:${listingId}`;

    const handleScan = () => {
        setIsScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            setIsScanning(false);
            setScannedData(`flashtrade:${listingId}`);
        }, 2000);
    };

    const handleConfirmWeight = async () => {
        if (!weightInput) return;
        setIsVerifying(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsVerifying(false);
        onVerified(parseFloat(weightInput));
    };

    if (userRole === "seller") {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Pickup Verification
                </h3>

                {!showQR ? (
                    <div className="text-center">
                        <p className="text-slate-600 mb-6">
                            When the Kabadiwala arrives, show this QR code to verify the pickup and confirm the weight.
                        </p>
                        <button
                            onClick={() => setShowQR(true)}
                            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                        >
                            <QrCode className="w-5 h-5 mr-2" />
                            Generate Pickup QR
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center animate-in zoom-in duration-300">
                        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 mb-4">
                            <Image
                                src={qrCodeUrl}
                                alt="Pickup QR Code"
                                width={200}
                                height={200}
                                className="rounded-lg"
                            />
                        </div>
                        <p className="text-sm text-slate-500 font-medium">
                            Scan to verify pickup
                        </p>
                        <button
                            onClick={() => setShowQR(false)}
                            className="mt-4 text-slate-400 hover:text-slate-600 text-sm"
                        >
                            Hide QR Code
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // Kabadiwala View
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
                Verify Pickup & Weight
            </h3>

            {!scannedData ? (
                <div className="text-center">
                    <p className="text-slate-600 mb-6">
                        Scan the seller's QR code to confirm you are at the location.
                    </p>
                    <button
                        onClick={handleScan}
                        disabled={isScanning}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                        {isScanning ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Scanning...
                            </>
                        ) : (
                            <>
                                <Scan className="w-5 h-5" />
                                Scan Seller's QR
                            </>
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Seller Verified</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Measured Weight (kg)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={weightInput}
                            onChange={(e) => setWeightInput(e.target.value)}
                            placeholder="e.g. 1.5"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                        />
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Max expected: 3.0 kg. Higher values will be flagged.
                        </p>
                    </div>

                    <button
                        onClick={handleConfirmWeight}
                        disabled={!weightInput || isVerifying}
                        className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Confirm Weight & Pay"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
