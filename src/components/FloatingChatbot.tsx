"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MapPin,
  Image as ImageIcon,
  Navigation,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { uploadToFirebase } from "@/lib/upload";

// Types
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
  image?: string;
  isLoading?: boolean;
  isError?: boolean;
}

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: string;
  source: "gps" | "map_selection";
  accuracy?: number;
}

// Map-related dynamic imports
let MapContainer: any, TileLayer: any, Marker: any, useMapEvents: any, L: any;
let mapComponentsLoaded = false;

const loadMapComponents = async () => {
  if (mapComponentsLoaded) return;

  try {
    const leaflet = await import("leaflet");
    const reactLeaflet = await import("react-leaflet");
    // Import CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    L = leaflet.default;
    MapContainer = reactLeaflet.MapContainer;
    TileLayer = reactLeaflet.TileLayer;
    Marker = reactLeaflet.Marker;
    useMapEvents = reactLeaflet.useMapEvents;

    // Fix Leaflet default marker icons
    const markerIcon2x = (await import("leaflet/dist/images/marker-icon-2x.png")).default;
    const markerIcon = (await import("leaflet/dist/images/marker-icon.png")).default;
    const markerShadow = (await import("leaflet/dist/images/marker-shadow.png")).default;

    const DefaultIcon = L.icon({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    mapComponentsLoaded = true;
  } catch (error) {
    console.error("Failed to load map components:", error);
  }
};

// LocationMarker component
const LocationMarker = ({ position, setPosition }: any) => {
  useMapEvents({
    click: (e: any) => {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

// MapModal component
interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (position: { lat: number; lng: number }) => void;
}

const MapModal = ({ isOpen, onClose, onLocationSelect }: MapModalProps) => {
  const [tempPosition, setTempPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom] = useState(2);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !mapComponentsLoaded) {
      loadMapComponents().then(() => setMapsLoaded(true));
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (tempPosition) {
      onLocationSelect(tempPosition);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-2xl w-[90%] max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <h3 className="font-bold">Select Location on Map</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Map */}
        <div className="h-96 relative">
          {mapsLoaded && MapContainer ? (
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={tempPosition} setPosition={setTempPosition} />
            </MapContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {tempPosition && (
            <p className="text-sm text-gray-600 mb-3">
              Selected: {tempPosition.lat.toFixed(6)}, {tempPosition.lng.toFixed(6)}
            </p>
          )}
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!tempPosition}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ChatMessage component
interface ChatMessageProps {
  message: Message;
  isBot: boolean;
}

const ChatMessage = ({ message, isBot }: ChatMessageProps) => {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      {isBot && (
        <div className="bg-green-100 p-2 rounded-full mr-2 flex-shrink-0">
          <Bot className="h-5 w-5 text-green-600" />
        </div>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-2xl ${
          isBot
            ? "bg-white text-slate-900 border border-slate-200"
            : "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
        }`}
      >
        {/* Image thumbnail if present */}
        {message.image && (
          <div className="mb-2">
            <img
              src={message.image}
              alt="Uploaded"
              className="rounded-lg max-w-full h-auto max-h-48 object-cover"
            />
          </div>
        )}
        {/* Display clean text */}
        <p className="text-sm whitespace-pre-wrap">
          {message.isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </span>
          ) : message.image && message.text.includes("data:image") ? (
            "I found waste, here's a photo"
          ) : (
            message.text
          )}
        </p>
        {message.timestamp && !message.isLoading && (
          <p className={`text-xs mt-1 ${isBot ? "text-gray-500" : "text-green-100"}`}>
            {message.timestamp}
          </p>
        )}
      </div>
      {!isBot && (
        <div className="bg-gray-100 p-2 rounded-full ml-2 flex-shrink-0">
          <User className="h-5 w-5 text-gray-600" />
        </div>
      )}
    </div>
  );
};

// Main FloatingChatbot component
export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your EcoAssistant. How can I help you with waste management or recycling today?",
      isBot: true,
      timestamp: formatTime(new Date()),
    },
  ]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice and TTS
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messageRef = useRef("");

  // Location and Image
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const locationMenuRef = useRef<HTMLDivElement>(null);

  // API base URL
  const FASTAPI_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  // Format time helper
  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Clean markdown-like asterisks from model output
  const cleanBotText = (text: string): string => {
    if (!text) return text;
    let out = String(text);
    try {
      // Remove code ticks and inline code
      out = out.replace(/`{1,3}([^`]*?)`{1,3}/gs, "$1");
      // Remove markdown headings like #, ##, ### at line start
      out = out.replace(/^\s*#{1,6}\s+/gm, "");
      // Remove blockquote markers
      out = out.replace(/^\s*>+\s?/gm, "");
      // Remove bold markers **text**
      out = out.replace(/\*\*(.*?)\*\*/gs, "$1");
      // Remove italics *text* or _text_
      out = out.replace(/\*(.*?)\*/g, "$1").replace(/_(.*?)_/g, "$1");
      // Replace leading '* ' bullets with a bullet char
      out = out.replace(/^\s*\*\s+/gm, "• ");
      // Replace leading '- ' bullets with a bullet char
      out = out.replace(/^\s*-\s+/gm, "• ");
      // Replace numbered list like '1. ' with '• '
      out = out.replace(/^\s*\d+\.\s+/gm, "• ");
      // Remove remaining stray asterisks
      out = out.replace(/\*/g, "");
      // Collapse multiple blank lines
      out = out.replace(/\n{3,}/g, "\n\n");
      // Trim whitespace
      out = out.trim();
    } catch (e) {
      return String(text).replace(/\*/g, "");
    }
    return out;
  };

  // Text-to-speech
  const speak = (text: string) => {
    if (!ttsEnabled || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
        // Automatically submit the message when speech ends
        if (messageRef.current.trim()) {
          handleSubmit(null, messageRef.current);
        }
      };
      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setMessage(finalTranscript || interimTranscript);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  // Update message ref
  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Close location menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationMenuRef.current && !locationMenuRef.current.contains(event.target as Node)) {
        setShowLocationMenu(false);
      }
    };

    if (showLocationMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showLocationMenu]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  // Get current GPS location
  const getCurrentLocation = () => {
    setShowLocationMenu(false);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const location: LocationData = {
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
          source: "gps",
          accuracy,
        };
        setLocationData(location);

        // Auto-send location message to agent
        const locationMsg = `[Location captured via GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}]`;
        handleSubmit(null, locationMsg);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please try again or select on map.");
      }
    );
  };

  // Open map for location selection
  const openMapModal = () => {
    setShowLocationMenu(false);
    setIsMapModalOpen(true);
  };

  // Handle location selected from map
  const handleMapLocationSelect = (position: { lat: number; lng: number }) => {
    const location: LocationData = {
      latitude: position.lat,
      longitude: position.lng,
      timestamp: new Date().toISOString(),
      source: "map_selection",
    };
    setLocationData(location);

    // Auto-send location message to agent
    const locationMsg = `[Location selected on map: ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}]`;
    handleSubmit(null, locationMsg);
  };

  // Handle image file selection
  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    try {
      // Create preview for UI - wait for it to load
      const previewImage = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Upload image to Firebase Storage
      const imageUrl = await uploadToFirebase(file);

      // Create user message with preview (for UI display only)
      const userMessage: Message = {
        id: messages.length + 1,
        text: "I found waste, here's a photo",
        isBot: false,
        timestamp: formatTime(new Date()),
        image: previewImage, // Show preview in chat UI
      };

      setMessages((prev) => [...prev, userMessage]);

      // Clear preview state
      clearImage();

      // Send ONLY the Firebase URL to backend (not the preview)
      const imageMsg = `Here is the waste image URL: ${imageUrl}`;
      await sendToBackend(imageMsg);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      clearImage();
    }
  };

  // Clear selected image
  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Clear location
  const clearLocation = () => {
    setLocationData(null);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Send message to backend API
  const sendToBackend = async (text: string) => {
    try {
      const loadingMessage: Message = {
        id: messages.length + 2,
        text: "Thinking...",
        isBot: true,
        timestamp: formatTime(new Date()),
        isLoading: true,
      };

      setMessages((prev) => [...prev, loadingMessage]);

      // Get the auth token from localStorage
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).token : null;

      // Prepare request body for ReAct Agent
      const requestBody: {
        message: string;
        session_id?: string | null;
        metadata?: { location?: LocationData };
      } = {
        message: text,
      };

      if (sessionId) {
        requestBody.session_id = sessionId;
      }

      // Add metadata if location data exists
      if (locationData) {
        requestBody.metadata = {
          location: locationData,
        };
      }

      // Call the ReAct Agent API endpoint
      const response = await fetch(`${FASTAPI_BASE}/agent/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }
      const data = await response.json();

      // Extract message and session_id from response
      const rawBotText = data?.response ?? "";
      const botText = cleanBotText(String(rawBotText));

      // Store session_id for future requests
      if (data?.session_id) {
        setSessionId(data.session_id);
      }

      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            id: filtered.length + 1,
            text: botText,
            isBot: true,
            timestamp: formatTime(new Date()),
          },
        ];
      });
      speak(botText);
    } catch (error) {
      console.error("Error:", error);

      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            id: filtered.length + 1,
            text: "Sorry, I encountered an error. Please try again later.",
            isBot: true,
            timestamp: formatTime(new Date()),
            isError: true,
          },
        ];
      });
    }
  };

  // Handle submit to ReAct Agent backend
  const handleSubmit = async (e: React.FormEvent | null, text = message) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    // Show image preview in chat UI if available
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: formatTime(new Date()),
      image: imagePreview ?? undefined, // Show preview in UI only
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Clear image preview after sending
    if (imagePreview) {
      clearImage();
    }

    // Send to backend
    await sendToBackend(text);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        <div
          className={`absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }`}
        >
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl p-4 text-white">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">EcoAssistant</h3>
                <p className="text-xs text-green-100">Online • Ready to help</p>
              </div>
              <button
                onClick={toggleChat}
                className="ml-auto p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-80 overflow-y-auto p-4 bg-slate-50">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} isBot={msg.isBot} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white rounded-b-2xl">
            {/* Location and Image Status */}
            {(locationData || imagePreview) && (
              <div className="px-3 pt-2 pb-1 border-b border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {locationData && (
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                      <MapPin className="h-3 w-3" />
                      <span>Location set</span>
                      <button type="button" onClick={clearLocation} className="ml-1 hover:text-green-900">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {imagePreview && (
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                      <ImageIcon className="h-3 w-3" />
                      <span>Image attached</span>
                      <button type="button" onClick={clearImage} className="ml-1 hover:text-blue-900">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Main Input Area - Two Rows */}
            <div className="p-3">
              {/* Top Row - Action Icons */}
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 text-gray-400 hover:text-green-600 transition-colors ${
                    isListening ? "text-red-500" : ""
                  }`}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title={ttsEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
                >
                  {ttsEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </button>

                {/* Location Dropdown Menu */}
                <div className="relative" ref={locationMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowLocationMenu(!showLocationMenu)}
                    className={`p-2 ${
                      locationData ? "text-green-600" : "text-gray-400"
                    } hover:text-green-600 transition-colors flex items-center`}
                    title="Add location"
                  >
                    <MapPin className="h-5 w-5" />
                    <ChevronDown className="h-3 w-3 ml-0.5" />
                  </button>

                  {showLocationMenu && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50">
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 rounded-t-lg"
                      >
                        <Navigation className="h-4 w-4 text-green-600" />
                        <span>Use GPS Location</span>
                      </button>
                      <button
                        type="button"
                        onClick={openMapModal}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100 rounded-b-lg"
                      >
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span>Select on Map</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 ${
                    imagePreview ? "text-blue-600" : "text-gray-400"
                  } hover:text-green-600 transition-colors`}
                  title="Attach image"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              {/* Bottom Row - Text Input and Send Button */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type or say something..."
                  className="flex-1 border-0 focus:ring-0 focus:outline-none px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-900"
                />
                <button
                  type="submit"
                  className="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!message.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Helper Text Label */}
        <div
          className={`absolute bottom-20 right-20 transition-all duration-300 ${
            isOpen ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-slate-200 whitespace-nowrap">
            <p className="text-sm text-slate-700 font-medium">How can I help you?</p>
          </div>
        </div>

        {/* Chat Bubble Button */}
        <button
          onClick={toggleChat}
          className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <div className="relative">
            <MessageCircle
              className={`w-7 h-7 transition-all duration-300 ${
                isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`w-7 h-7 absolute top-0 left-0 transition-all duration-300 ${
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </div>
        </button>

        {/* Pulse Animation Ring */}
        {!isOpen && (
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-green-600 animate-ping opacity-20 pointer-events-none"></div>
        )}
      </div>

      {/* Map Modal */}
      <MapModal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} onLocationSelect={handleMapLocationSelect} />
    </>
  );
}
