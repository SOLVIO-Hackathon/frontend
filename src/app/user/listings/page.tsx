"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { uploadToFirebase } from "@/lib/upload";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Upload, Camera, X, CheckCircle, MapPin } from "lucide-react";

type DeviceType = "laptop" | "phone" | "tablet" | "desktop" | "accessory";
type Condition = "working" | "needs_repair" | "broken";

export default function ListingsPage() {
	const { token } = useAuth();

	// Form state
	const [deviceName, setDeviceName] = useState("");
	const [deviceType, setDeviceType] = useState<DeviceType>("laptop");
	const [condition, setCondition] = useState<Condition>("working");
	const [description, setDescription] = useState("");

	// Images
	const [files, setFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);
	const [progress, setProgress] = useState<number[]>([]);
	const [imageUrls, setImageUrls] = useState<string[]>([]);

	// Location
	const [lat, setLat] = useState<number | null>(null);
	const [lng, setLng] = useState<number | null>(null);

	// UI state
	const [uploading, setUploading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const list = Array.from(e.target.files || []);
		setFiles(list);
		setImageUrls([]);
		setProgress(list.map(() => 0));
		// Generate previews
		const readers = list.map(
			(file) =>
				new Promise<string>((resolve) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result as string);
					reader.readAsDataURL(file);
				})
		);
		Promise.all(readers).then(setPreviews);
	};

	const removeImage = (idx: number) => {
		const newFiles = files.filter((_, i) => i !== idx);
		const newPreviews = previews.filter((_, i) => i !== idx);
		const newProgress = progress.filter((_, i) => i !== idx);
		const newUrls = imageUrls.filter((_, i) => i !== idx);
		setFiles(newFiles);
		setPreviews(newPreviews);
		setProgress(newProgress);
		setImageUrls(newUrls);
	};

	const uploadAllImages = async () => {
		if (!files.length) return [] as string[];
		setUploading(true);
		setMessage(null);
		const urls: string[] = [];
		try {
			// Upload sequentially to report per-file progress
			for (let i = 0; i < files.length; i++) {
				const url = await uploadToFirebase(files[i], (p) => {
					setProgress((prev) => {
						const clone = [...prev];
						clone[i] = p;
						return clone;
					});
				});
				urls.push(url);
			}
			setImageUrls(urls);
			setMessage("Images uploaded successfully.");
			return urls;
		} catch (e: any) {
			setMessage(e?.message || "Failed to upload images");
			throw e;
		} finally {
			setUploading(false);
		}
	};

	const handleUseMyLocation = () => {
		setMessage(null);
		if (!navigator.geolocation) {
			setMessage("Geolocation is not supported by your browser.");
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setLat(pos.coords.latitude);
				setLng(pos.coords.longitude);
			},
			(err) => {
				console.error(err);
				setMessage("Couldn't get location. Please allow location access.");
			},
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	};

	const ensureUploaded = async () => {
		if (files.length && imageUrls.length !== files.length) {
			return await uploadAllImages();
		}
		return imageUrls;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage(null);

		if (!deviceName || !description) {
			setMessage("Please fill in device name and description.");
			return;
		}
		if (lat == null || lng == null) {
			setMessage("Please provide location (use the button to take your location).");
			return;
		}
		try {
			setSubmitting(true);
			const urls = await ensureUploaded();
			if (!urls.length) {
				setMessage("Please upload at least one image.");
				setSubmitting(false);
				return;
			}

			const payload = {
				condition,
				description,
				device_name: deviceName,
				device_type: deviceType,
				image_urls: urls,
				location: { latitude: lat, longitude: lng },
			};

			await apiRequest("/listings", {
				method: "POST",
				body: JSON.stringify(payload),
				auth: true,
				token,
			});

			setMessage("Listing created successfully.");
			// Optionally reset form
			// setDeviceName(""); setDescription(""); setFiles([]); setPreviews([]); setProgress([]); setImageUrls([]);
		} catch (e: any) {
			setMessage(e?.message || "Failed to create listing");
		} finally {
			setSubmitting(false);
		}
	};

	const mapSrc = (() => {
		const d = 0.02;
		const cLat = lat ?? 23.7808;
		const cLng = lng ?? 90.4219;
		const left = cLng - d;
		const right = cLng + d;
		const top = cLat + d;
		const bottom = cLat - d;
		const marker = `&marker=${encodeURIComponent(`${cLat},${cLng}`)}`;
		return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(`${left},${bottom},${right},${top}`)}&layer=mapnik${marker}`;
	})();

	return (
		<ProtectedRoute>
			<div className="relative min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
				{/* Decorative blobs */}
				<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
					<div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
					<div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
				</div>

				<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
					{/* Header */}
					<div className="mb-12">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-12 h-12 bg-linear-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
								<Upload className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Create Listing</h1>
								<p className="text-slate-600 mt-1">Post your reusable device for others</p>
							</div>
						</div>
					</div>

					<div className="grid lg:grid-cols-2 gap-8">
						{/* Left: Form */}
						<div className="space-y-6">
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Images */}
								<div className="bg-white/40 rounded-lg p-6 border border-slate-200/50">
									<label className="block text-sm font-semibold text-slate-800 mb-3">
										<Camera className="w-4 h-4 inline mr-2" />
										Upload Photos
									</label>

									{previews.length === 0 ? (
										<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-emerald-300 rounded-lg cursor-pointer bg-white/30 hover:bg-emerald-50/30 transition-all duration-300 hover:border-emerald-400">
											<Upload className="w-12 h-12 text-emerald-500 mb-3" />
											<p className="text-sm text-slate-700">
												<span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop
											</p>
											<p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG up to 10MB. You can select multiple.</p>
											<input
												type="file"
												multiple
												accept="image/*"
												className="hidden"
												onChange={handleFileChange}
												required
											/>
										</label>
									) : (
										<div className="space-y-3">
											<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
												{previews.map((src, i) => (
													<div key={i} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-white/40">
														<img src={src} alt={`Preview ${i + 1}`} className="w-full h-36 object-cover" />
														{progress[i] > 0 && progress[i] < 100 && (
															<div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2">
																<div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
																	<div
																		className="h-1.5 bg-linear-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
																		style={{ width: `${progress[i]}%` }}
																	/>
																</div>
																<div className="text-[10px] text-slate-700 mt-1 font-medium">Uploading {progress[i]}%</div>
															</div>
														)}
														{imageUrls[i] && (
															<div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
																<CheckCircle className="w-3 h-3" />
																Uploaded
															</div>
														)}
														<button
															type="button"
															onClick={() => removeImage(i)}
															className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
															aria-label="Remove"
														>
															<X className="w-4 h-4" />
														</button>
													</div>
												))}
											</div>

											<div className="flex gap-3">
												<label className="px-4 py-2.5 border border-slate-300 hover:bg-white/50 text-slate-700 font-semibold rounded-lg transition-all duration-200 cursor-pointer">
													Add more
													<input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
												</label>
												<button
													type="button"
													onClick={uploadAllImages}
													disabled={uploading || files.length === 0}
													className="flex-1 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
												>
													{uploading ? "Uploading..." : imageUrls.length === files.length && files.length > 0 ? "Re-upload" : "Upload Images"}
												</button>
											</div>
										</div>
									)}
								</div>

								{/* Details */}
								<div className="bg-white/40 rounded-lg p-6 border border-slate-200/50 space-y-4">
									{message && (
										<div className="text-sm text-slate-700 bg-blue-50 border border-blue-200 rounded-lg p-3">{message}</div>
									)}

									<div className="grid gap-4 md:grid-cols-2">
										<div className="md:col-span-2">
											<label className="block text-sm font-medium text-slate-700 mb-2">Device Name</label>
											<input
												type="text"
												value={deviceName}
												onChange={(e) => setDeviceName(e.target.value)}
												placeholder="Dell Latitude E7450"
												className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/40"
												required
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-slate-700 mb-2">Device Type</label>
											<select
												value={deviceType}
												onChange={(e) => setDeviceType(e.target.value as DeviceType)}
												className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/40"
											>
												<option value="laptop">Laptop</option>
												<option value="phone">Phone</option>
												<option value="tablet">Tablet</option>
												<option value="desktop">Desktop</option>
												<option value="accessory">Accessory</option>
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-slate-700 mb-2">Condition</label>
											<select
												value={condition}
												onChange={(e) => setCondition(e.target.value as Condition)}
												className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/40"
											>
												<option value="working">Working</option>
												<option value="needs_repair">Needs Repair</option>
												<option value="broken">Broken</option>
											</select>
										</div>
										<div className="md:col-span-2">
											<label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
											<textarea
												value={description}
												onChange={(e) => setDescription(e.target.value)}
												rows={3}
												placeholder="Good condition laptop, minor scratches on body"
												className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/40"
												required
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-slate-700 mb-2">Latitude</label>
											<input
												type="number"
												value={lat ?? ""}
												onChange={(e) => setLat(e.target.value ? Number(e.target.value) : null)}
												placeholder="23.7808"
												className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/40"
												step="any"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-slate-700 mb-2">Longitude</label>
											<input
												type="number"
												value={lng ?? ""}
												onChange={(e) => setLng(e.target.value ? Number(e.target.value) : null)}
												placeholder="90.4219"
												className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/40"
												step="any"
											/>
										</div>
									</div>

									<div className="flex gap-3">
										<button
											type="button"
											onClick={handleUseMyLocation}
											className="flex-1 px-4 py-2.5 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50/50 transition-all duration-200 font-medium flex items-center justify-center gap-2"
										>
											<MapPin className="w-4 h-4" /> Take my location
										</button>
										<button
											type="submit"
											disabled={submitting}
											className="flex-1 px-4 py-2.5 rounded-lg bg-linear-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 disabled:opacity-60 transition-all duration-200 font-semibold disabled:cursor-not-allowed"
										>
											{submitting ? "Posting..." : "Post Listing"}
										</button>
									</div>
								</div>
							</form>
						</div>

						{/* Right: Map & tips */}
						<div className="space-y-6">
							<div className="bg-white/40 rounded-lg p-6 border border-slate-200/50">
								<h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
									<MapPin className="w-5 h-5 text-emerald-600" /> Location Preview (OpenStreetMap)
								</h3>
								<div className="rounded-lg overflow-hidden border border-slate-200">
									<iframe
										title="OpenStreetMap"
										width="100%"
										height="320"
										frameBorder="0"
										scrolling="no"
										src={mapSrc}
									/>
								</div>
								<p className="text-xs text-slate-600 mt-2">
									Map centers on your chosen coordinates. Click "Take my location" to auto-fill latitude and longitude.
								</p>
							</div>

							<div className="bg-linear-to-br from-green-600 to-emerald-600 rounded-lg p-6 text-white">
								<h3 className="text-lg font-bold mb-2">Tip</h3>
								<p className="text-sm opacity-95">
									Clear photos and accurate location increase your listing's visibility and chances of reuse.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}
