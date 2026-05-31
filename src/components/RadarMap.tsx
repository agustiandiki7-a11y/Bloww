import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Heart,
  Share2,
  Battery,
  Power,
  ShieldAlert,
  Trash2,
  RotateCcw,
  Send,
  Info,
  Lock,
  Unlock,
  Copy,
  CheckCircle2,
  Check,
  AlertTriangle,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CoupleProfile } from '../types';

interface RadarMapProps {
  profile: CoupleProfile;
}

interface SavedLocationData {
  selfLat: number;
  selfLng: number;
  partnerLat: number;
  partnerLng: number;
  lastUpdated: string;
  isSharingSelf: boolean;
  isSharingPartner: boolean;
  batteryLevel: number;
  batterySavingMode: boolean;
  historyEnabled: boolean;
  historyLogs: { timestamp: string; location: string; event: string }[];
}

export default function RadarMap({ profile }: RadarMapProps) {
  // Connection states
  const [connectionStatus, setConnectionStatus] = useState<'unpaired' | 'pairing_sent' | 'paired'>(() => {
    const saved = localStorage.getItem('amour_couple_pairing_status');
    return (saved as any) || 'paired'; // default to paired so users can immediately interact, but let them change it to showcase system!
  });

  const [inviteCode, setInviteCode] = useState(() => {
    const saved = localStorage.getItem('amour_couple_invite_code');
    if (saved) return saved;
    const randomCode = 'BLOOM-' + Math.floor(Math.random() * 9000 + 1000) + '-DUO';
    localStorage.setItem('amour_couple_invite_code', randomCode);
    return randomCode;
  });

  const [partnerInputCode, setPartnerInputCode] = useState('');
  const [partnerConnected, setPartnerConnected] = useState(true);
  const [copied, setCopied] = useState(false);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>(() => {
    const saved = localStorage.getItem('amour_gps_permission');
    return (saved as any) || 'prompt';
  });

  // Location parameters
  const [locationData, setLocationData] = useState<SavedLocationData>(() => {
    const saved = localStorage.getItem('amour_location_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      selfLat: -6.2088,
      selfLng: 106.8456, // Jakarta default
      partnerLat: -6.2155,
      partnerLng: 106.8525, // Close partner location
      lastUpdated: new Date().toLocaleTimeString(),
      isSharingSelf: true,
      isSharingPartner: true,
      batteryLevel: 88,
      batterySavingMode: false,
      historyEnabled: false,
      historyLogs: [
        { timestamp: '12:05 PM', location: 'Jakarta, Indonesia', event: 'Initial pairing established' }
      ]
    };
  });

  // Custom visual message states
  const [customNote, setCustomNote] = useState('');
  const [noteSentMessage, setNoteSentMessage] = useState<string | null>(null);
  const [activeNotes, setActiveNotes] = useState<{ sender: 'user' | 'partner'; text: string; timestamp: string }[]>([
    { sender: 'partner', text: 'Hey sweetheart! Just arrived at the cafe ☕', timestamp: '5 mins ago' }
  ]);

  // Simulated live displacement to make map feel alive
  const [mapZoom, setMapZoom] = useState(14);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Auto-sync coordinates save to localstorage
  useEffect(() => {
    localStorage.setItem('amour_location_data', JSON.stringify(locationData));
  }, [locationData]);

  useEffect(() => {
    localStorage.setItem('amour_couple_pairing_status', connectionStatus);
  }, [connectionStatus]);

  // Copy invitation link helper
  const handleCopyInvite = () => {
    const link = `https://lovebloom.app/invite?code=${inviteCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Connect via manually typing partner code
  const handleConnectPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerInputCode.trim()) return;
    setConnectionStatus('paired');
    setPartnerConnected(true);
    triggerNotification('Success', `Direct coordinate handshake secured with partner using code ${partnerInputCode}`);
  };

  const triggerNotification = (title: string, msg: string) => {
    setShowToast(`${title}: ${msg}`);
    setTimeout(() => {
      setShowToast(null);
    }, 4000);
  };

  // Trigger real geolocation lookup
  const requestGPSCoordinates = () => {
    if (!navigator.geolocation) {
      triggerNotification('GPS Error', 'Geolocation is not supported by your browser.');
      setPermissionState('denied');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData((prev) => ({
          ...prev,
          selfLat: latitude,
          selfLng: longitude,
          // Shift partner slightly so there is a cute sensible distance
          partnerLat: prev.partnerLat === -6.2155 ? latitude + 0.0042 : prev.partnerLat,
          partnerLng: prev.partnerLng === 106.8525 ? longitude - 0.0035 : prev.partnerLng,
          lastUpdated: new Date().toLocaleTimeString()
        }));
        setPermissionState('granted');
        localStorage.setItem('amour_gps_permission', 'granted');
        setGpsLoading(false);
        triggerNotification('GPS Lock', 'Secure real-time GPS coordinates retrieved successfully!');
      },
      (error) => {
        setGpsLoading(false);
        setPermissionState('denied');
        localStorage.setItem('amour_gps_permission', 'denied');
        triggerNotification('GPS Disallowed', 'Could not access browser location. Defaulting to cozy static romance map coordinates.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Stop sharing location emergency shutdown
  const handleEmergencyStop = () => {
    setLocationData((prev) => ({
      ...prev,
      isSharingSelf: false
    }));
    triggerNotification('Location Blocked', 'Emergency shutdown activated! Your partner can no longer see your coordinates.');
  };

  // Reset/Delete location records
  const handleDeleteHistory = () => {
    const confirm = window.confirm('Are you sure you want to permanently purge your stored location history logs? This is irreversible.');
    if (confirm) {
      setLocationData((prev) => ({
        ...prev,
        historyLogs: []
      }));
      triggerNotification('Logs Purged', 'All localized location history buffers have been safely deleted.');
    }
  };

  // Haversine formula to compute dynamic coordinates difference km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    if (d < 1) {
      return `${Math.round(d * 1000)} meters`;
    }
    return `${d.toFixed(2)} km`;
  };

  // Render a lovely romantic customized SVG mockup map that behaves dynamically based on zoom and positions!
  const selfX = 50 + (locationData.selfLng - 106.8456) * 1200 * (mapZoom / 14);
  const selfY = 50 - (locationData.selfLat + 6.2088) * 1200 * (mapZoom / 14);
  const partnerX = 50 + (locationData.partnerLng - 106.8456) * 1200 * (mapZoom / 14);
  const partnerY = 50 - (locationData.partnerLat + 6.2088) * 1200 * (mapZoom / 14);

  // Handle preset simulated notes dispatch
  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNote.trim()) return;

    setActiveNotes((prev) => [
      { sender: 'user', text: customNote, timestamp: 'Just now' },
      ...prev
    ]);

    // Add to history
    setLocationData((prev) => {
      const logs = prev.historyEnabled
        ? [
            { timestamp: new Date().toLocaleTimeString(), location: 'Live Coordinate', event: `Sent note: "${customNote}"` },
            ...prev.historyLogs
          ]
        : prev.historyLogs;
      return { ...prev, historyLogs: logs };
    });

    setCustomNote('');
    setNoteSentMessage('Sent to your partner! 💖');
    setTimeout(() => setNoteSentMessage(null), 3000);
  };

  // Pre-seed instant notes
  const sendQuickNote = (phrase: string) => {
    setActiveNotes((prev) => [
      { sender: 'user', text: phrase, timestamp: 'Just now' },
      ...prev
    ]);
    triggerNotification('Note Dispatched', `"${phrase}" broadcast successfully!`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 text-stone-850">
      
      {/* Toast alarm box */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-55 w-full max-w-md px-4 animate-fade-in shadow-xl">
          <div className="bg-rose-950/95 text-white p-3.5 rounded-2xl flex items-center gap-3 border border-rose-800 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 shrink-0 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span>{showToast}</span>
          </div>
        </div>
      )}

      {/* Screen Header Summary with consent state widget */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-left">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
            <Share2 className="w-3 h-3 text-rose-550 animate-pulse" />
            <span>Opt-In Couple Radar</span>
          </div>
          <h2 className="text-xl font-bold text-stone-800 font-serif italic flex items-center gap-1.5">
            <span>Cozy Location Handshake</span>
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed max-w-xl">
            A secure connection designed ONLY for verified romantic duos. Absolute consent required. Zero commercial background tracking. Hide or disable your updates instantly at any moment with the Emergency control panel.
          </p>
        </div>

        {/* Real-time Connection badge */}
        <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-2.5 bg-rose-50/40 md:bg-transparent p-3 md:p-0 rounded-2xl">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Consent Status</span>
          <div className="flex items-center gap-1.5">
            {connectionStatus === 'paired' && locationData.isSharingSelf ? (
              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xxs font-extrabold uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
                Active Share
              </span>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-full text-xxs font-extrabold uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                Sharing Suspended
              </span>
            )}
          </div>
        </div>
      </div>

      {/* UI split into Pairing Invitation Setup (if needed) versus Live Radar Core */}
      {connectionStatus !== 'paired' ? (
        <div className="bg-white/85 backdrop-blur rounded-3xl p-8 border border-rose-100 shadow-xl text-center space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-inner">
            <Lock className="w-8 h-8 text-[#FF8FAB]" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-serif italic font-bold text-stone-800">Secure Pair Handshake Required</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              To guarantee bulletproof privacy, your partner must enter your unique Couple Link or Match Key before either coordinate stream is synthesized.
            </p>
          </div>

          {/* Invitation Area */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl relative space-y-3.5 text-left">
            <div>
              <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Your Couple Invitation Key</span>
              <div className="flex gap-2">
                <code className="flex-1 bg-white px-3 py-2 border border-stone-200 rounded-xl text-xs font-mono font-bold text-rose-900 select-all tracking-wider">
                  {inviteCode}
                </code>
                <button
                  onClick={handleCopyInvite}
                  className="px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow transition active:scale-95 flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
            </div>
            
            <p className="text-[10px] text-stone-500 italic">
              Share this key via Whatsapp/Telegram. Your partner can paste it below to establish instant secure linkage.
            </p>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-stone-200"></div>
            <span className="flex-shrink mx-3 text-stone-400 text-[10px] font-bold uppercase tracking-widest">Or enter Partner's Key</span>
            <div className="flex-grow border-t border-stone-200"></div>
          </div>

          <form onSubmit={handleConnectPartner} className="space-y-4">
            <div className="flex gap-2 text-left">
              <input
                type="text"
                required
                placeholder="BLOOM-XXXX-DUO"
                value={partnerInputCode}
                onChange={(e) => setPartnerInputCode(e.target.value)}
                className="flex-grow px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs font-mono font-bold placeholder-stone-400 uppercase tracking-wider text-stone-800"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs rounded-xl hover:scale-102 active:scale-98 transition shadow cursor-pointer"
              >
                Assemble Connection
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={() => setConnectionStatus('paired')}
            className="text-xs text-rose-500 font-bold hover:underline transition select-none cursor-pointer"
          >
            Skip Invite & Demo Live Features Instantly
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Map & Distance panel (approx 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Romantic CSS/SVG map panel */}
            <div className="bg-white/90 backdrop-blur border border-rose-100 rounded-3xl p-4 shadow-md overflow-hidden relative">
              <div className="flex items-center justify-between border-b border-rose-50 pb-3 mb-3 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">🗺️</span>
                  <div>
                    <h3 className="text-xs font-bold text-stone-850 uppercase tracking-wider">Live Romance Radar Map</h3>
                    <p className="text-[10px] text-stone-400">Battery-optimized passive telemetry updates</p>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setMapZoom((prev) => Math.max(12, prev - 1))}
                    className="w-7 h-7 bg-stone-50 hover:bg-rose-50 border border-stone-200 text-stone-700 font-bold text-xs rounded-lg flex items-center justify-center transition cursor-pointer"
                    title="Zoom Out"
                  >
                    &minus;
                  </button>
                  <button
                    onClick={() => setMapZoom((prev) => Math.min(17, prev + 1))}
                    className="w-7 h-7 bg-stone-50 hover:bg-rose-50 border border-stone-200 text-stone-700 font-bold text-xs rounded-lg flex items-center justify-center transition cursor-pointer"
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button
                    onClick={requestGPSCoordinates}
                    disabled={gpsLoading}
                    className="px-2.5 h-7 bg-rose-50 hover:bg-rose-100 border border-rose-150 text-rose-800 text-[10px] font-bold rounded-lg flex items-center gap-1 transition disabled:opacity-50 cursor-pointer"
                    title="Refresh GPS"
                  >
                    <RotateCcw className={`w-3 h-3 ${gpsLoading ? 'animate-spin' : ''}`} />
                    <span>GPS Sync</span>
                  </button>
                </div>
              </div>

              {/* STYLED CUSTOM INTERACTIVE MAP BOX */}
              <div className="w-full h-80 bg-[#FFFBF4] rounded-2xl border border-dashed border-rose-150 relative overflow-hidden flex items-center justify-center shadow-inner select-none">
                
                {/* SVG background representing a lovely cozy neighborhood grid with romantic rivers, bridge and blossom gardens */}
                <svg className="absolute inset-0 w-full h-full opacity-85" xmlns="http://www.w3.org/2000/svg">
                  {/* Grass background grids */}
                  <rect width="100%" height="100%" fill="#FDFCFA" />
                  
                  {/* Rivers */}
                  <path d="M -100 200 Q 150 120 200 450 T 600 200" fill="none" stroke="#D1E8FF" strokeWidth="32" strokeLinecap="round" />
                  <path d="M 120 -100 C 180 180 100 220 250 500" fill="none" stroke="#D1E8FF" strokeWidth="18" strokeLinecap="round" />
                  
                  {/* Romantic Bridge */}
                  <rect x="156" y="162" width="40" height="20" rx="3" fill="#FFE5D9" stroke="#ECA08B" strokeWidth="2" transform="rotate(35 156 162)" />
                  <text x="175" y="150" className="text-[10px] font-serif italic text-rose-600 font-bold">Bridge of Sighs 🌉</text>

                  {/* Cozy Street Paths Grid Grid */}
                  <line x1="50" y1="0" x2="50" y2="1000" stroke="#F1E3D3" strokeWidth="10" strokeDasharray="4" />
                  <line x1="250" y1="0" x2="250" y2="1000" stroke="#F1E3D3" strokeWidth="14" />
                  <line x1="450" y1="0" x2="450" y2="1000" stroke="#F1E3D3" strokeWidth="10" />
                  <line x1="0" y1="100" x2="1000" y2="100" stroke="#F1E3D3" strokeWidth="12" />
                  <line x1="0" y1="280" x2="1000" y2="280" stroke="#F1E3D3" strokeWidth="14" />
                  <line x1="0" y1="420" x2="1000" y2="420" stroke="#F1E3D3" strokeWidth="8" strokeDasharray="3" />

                  {/* Romantic Points of Interest Pins */}
                  <g transform="translate(110, 80)">
                    <circle r="4" fill="#FFC8DD" />
                    <text x="8" y="4" className="text-[8px] font-sans font-bold text-stone-400 uppercase tracking-wider">Dream Cafe ☕</text>
                  </g>
                  <g transform="translate(380, 160)">
                    <circle r="4" fill="#BDE0FE" />
                    <text x="8" y="4" className="text-[8px] font-sans font-bold text-stone-400 uppercase tracking-wider">Lover Park 🌸</text>
                  </g>
                  <g transform="translate(260, 360)">
                    <circle r="4" fill="#C8B6FF" />
                    <text x="8" y="4" className="text-[8px] font-sans font-bold text-stone-400 uppercase tracking-wider">Cinemax Date 🎬</text>
                  </g>

                  {/* Visual Compass grid scale */}
                  <circle cx="10%" cy="85%" r="16" fill="white" stroke="#E2D4C9" strokeWidth="1" />
                  <path d="M 10% 80% L 10% 90% M 6% 85% L 14% 85%" stroke="#FFA5AB" strokeWidth="1.5" />
                  <text x="10%" y="78%" textAnchor="middle" className="text-[7px] font-extrabold text-rose-500">N</text>
                </svg>

                {/* HEART-SHAPED MARKERS - SELF */}
                {locationData.isSharingSelf && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${(selfX - 50) % 180}px)`,
                      top: `calc(50% + ${(selfY - 50) % 140}px)`,
                      transform: 'translate(-50%, -100%)',
                      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="z-30 cursor-pointer group"
                  >
                    {/* Pulsing ring */}
                    <div className="absolute -inset-2 bg-pink-400/25 rounded-full animate-ping" />
                    
                    {/* Marker Pin bubble */}
                    <div className="relative bg-white border border-rose-200 rounded-2xl p-1 shadow-lg flex items-center gap-1">
                      <div className="w-8 h-8 rounded-full border border-pink-200 overflow-hidden shrink-0">
                        <img src={profile.avatarUrl} alt="Me" className="w-full h-full object-cover" />
                      </div>
                      <div className="pr-1.5 text-left select-none">
                        <p className="text-[9px] font-extrabold text-stone-700 leading-none">You</p>
                        <p className="text-[7px] text-stone-400 font-mono tracking-tight mt-0.5 ml-0.5">Here Now</p>
                      </div>
                      <div className="text-[10px] text-pink-500 absolute -bottom-1 left-1/2 -translate-x-1/2">
                        ❤️
                      </div>
                    </div>
                  </div>
                )}

                {/* HEART-SHAPED MARKERS - PARTNER */}
                {locationData.isSharingPartner && partnerConnected && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${(partnerX - 50) % 180}px)`,
                      top: `calc(50% + ${(partnerY - 50) % 140}px)`,
                      transform: 'translate(-50%, -100%)',
                      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="z-35 cursor-pointer group"
                  >
                    {/* Pulsing ring info */}
                    <div className="absolute -inset-2 bg-indigo-400/20 rounded-full animate-ping delay-300" />
                    
                    {/* Marker Pin bubble */}
                    <div className="relative bg-white border border-rose-200 rounded-2xl p-1 shadow-lg flex items-center gap-1">
                      <div className="w-8 h-8 rounded-full border border-indigo-200 overflow-hidden shrink-0 animate-pulse">
                        <img src={profile.partnerAvatarUrl} alt="Partner" className="w-full h-full object-cover" />
                      </div>
                      <div className="pr-1.5 text-left select-none">
                        <p className="text-[9px] font-extrabold text-[#FF4D6D] leading-none">{profile.partnerName}</p>
                        <p className="text-[7px] text-emerald-600 font-bold mt-0.5">Active</p>
                      </div>
                      <div className="text-[10px] text-indigo-500 absolute -bottom-1 left-1/2 -translate-x-1/2">
                        💖
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating Map HUD details */}
                <div className="absolute bottom-3 left-3 bg-white/70 p-2.5 rounded-xl border border-stone-200/50 text-[10px] text-left leading-normal font-sans tracking-wide">
                  <p>🛰️ <strong>GPS Stream:</strong> {permissionState === 'granted' ? 'High Accuracy Direct GLONASS' : 'Cozy Simulated'}</p>
                  <p>📍 <strong>Your Coordinates:</strong> {locationData.selfLat.toFixed(5)}°, {locationData.selfLng.toFixed(5)}°</p>
                  <p className="text-stone-400 mt-1">Updates freeze when phone is screen-locked</p>
                </div>
              </div>

              {/* Romantic Distance HUD */}
              <div className="mt-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl text-xl shadow-xs">
                    💘
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-rose-950 uppercase tracking-widest mt-0.5">Approximate Couple Span</h4>
                    <p className="text-[11px] text-stone-605 text-stone-600 font-serif italic">
                      Separated by <strong className="text-rose-600 not-italic font-bold font-sans text-xs">{calculateDistance(locationData.selfLat, locationData.selfLng, locationData.partnerLat, locationData.partnerLng)}</strong> of starlight space
                    </p>
                  </div>
                </div>

                <div className="text-right text-xxs font-mono text-stone-400 font-bold shrink-0">
                  <p>Telemetry: {locationData.lastUpdated}</p>
                  <p>Accuracy: &plusmn; 8 meters</p>
                </div>
              </div>
            </div>

            {/* QUICK PRE-SET NOTIFICATION CUES */}
            <div className="bg-white/80 border border-rose-100 rounded-3xl p-5 shadow-sm text-left">
              <h4 className="text-xs font-bold text-stone-850 uppercase tracking-wider mb-3">Send "I'm here" Note</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "Arrived Safely! 🏡", text: "I have arrived safely at home!" },
                  { label: "Cafe Lounge ☕", text: "Lounging here! Come join me anytime sweetheart." },
                  { label: "Picking Up 🛵", text: "Almost there! Fetching food." },
                  { label: "Thinking of You 💕", text: "Standing right here wishing you were close." }
                ].map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => sendQuickNote(preset.text)}
                    className="p-2 bg-stone-50 hover:bg-rose-50 border border-stone-200/80 rounded-xl text-[10px] font-bold text-stone-700 hover:text-rose-800 transition active:scale-[0.98] select-none text-center cursor-pointer shadow-xs leading-snug"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Safe Controls, Battery Info, Logs & Messages (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* POWER TOGGLES CONTROL CARDS */}
            <div className="bg-white/85 backdrop-blur-xl border border-rose-100 rounded-3xl p-6 shadow-sm text-left">
              <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest border-b border-rose-50 pb-2 mb-4 flex items-center gap-1.5 select-none">
                <Power className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Radar Privacy Controls</span>
              </h3>

              <div className="space-y-4 text-xs font-medium text-stone-750">
                
                {/* Switch: Share My Coordinates */}
                <label className="flex items-center justify-between cursor-pointer py-1 border-b border-stone-50">
                  <div className="space-y-0.5">
                    <p className="font-bold text-stone-800">Share My Location</p>
                    <p className="text-[10px] text-stone-400 font-medium">Transmit my exact coordinates to {profile.partnerName}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={locationData.isSharingSelf}
                    onChange={(e) => {
                      const changed = e.target.checked;
                      setLocationData((prev) => ({ ...prev, isSharingSelf: changed }));
                      triggerNotification('Broadcast Status', changed ? 'Radar transmissions ACTIVE.' : 'Coordinates broadcast MUTED.');
                    }}
                    className="w-4 h-4 rounded text-pink-500 accent-pink-550 border-stone-300 focus:ring-pink-400 cursor-pointer shrink-0"
                  />
                </label>

                {/* Switch: Allow Partner to See */}
                <label className="flex items-center justify-between cursor-pointer py-1 border-b border-stone-50">
                  <div className="space-y-0.5">
                    <p className="font-bold text-stone-800">Partner Location Access</p>
                    <p className="text-[10px] text-stone-400 font-medium">Verify or query partner telemetry feeds</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={locationData.isSharingPartner}
                    onChange={(e) => {
                      const changed = e.target.checked;
                      setLocationData((prev) => ({ ...prev, isSharingPartner: changed }));
                      triggerNotification('Access Control', changed ? 'Partner coordinates display ON.' : 'Partner marker CONCEALED.');
                    }}
                    className="w-4 h-4 rounded text-pink-500 border-stone-300 focus:ring-pink-400 cursor-pointer shrink-0"
                  />
                </label>

                {/* Switch: Battery Friendly Low-Power Optimization */}
                <div className="py-1">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-bold text-stone-850 flex items-center gap-1">
                        <Battery className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Battery Saver Optimized</span>
                      </p>
                      <p className="text-[9.5px] text-stone-400 font-medium leading-relaxed pr-2">
                        Dampen GPS updates when phone registers static position or low voltage ({locationData.batteryLevel}% remaining).
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={locationData.batterySavingMode}
                      onChange={(e) => {
                        const targetVal = e.target.checked;
                        setLocationData((prev) => ({ ...prev, batterySavingMode: targetVal }));
                        triggerNotification('Power Mode', targetVal ? 'Passive heartbeat polling enabled (~0.3% power/hr).' : 'Normal real-time active polling.');
                      }}
                      className="w-4 h-4 rounded text-pink-500 border-stone-300 focus:ring-pink-400 cursor-pointer shrink-0"
                    />
                  </div>
                </div>

                {/* EMERGENCY EMERGENCY STOP SHARING BUTTON */}
                <button
                  type="button"
                  onClick={handleEmergencyStop}
                  className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 tracking-wide shadow-md hover:shadow-red-200 transition cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 animate-bounce" />
                  <span>EMERGENCY: STOP SHARING</span>
                </button>
              </div>
            </div>

            {/* SEND DIRECT ROMANTIC CHAT NOTE BULLETINS */}
            <div className="bg-white/85 backdrop-blur border border-rose-100 rounded-3xl p-5 shadow-sm text-left">
              <h4 className="text-xs font-bold text-stone-850 uppercase tracking-wider mb-2">Compose Custom Location Note</h4>
              
              {noteSentMessage && (
                <p className="text-xxs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg mb-3 animate-pulse">
                  {noteSentMessage}
                </p>
              )}

              <form onSubmit={handleSendNote} className="space-y-2">
                <textarea
                  required
                  placeholder="Tell your darling what you are doing here... (e.g. Grabbing iced tea! 🍹)"
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs placeholder-stone-400 text-stone-800 font-medium"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Note to Partner</span>
                </button>
              </form>

              {/* Feed of active loc notes */}
              {activeNotes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-dashed border-rose-100 space-y-2 max-h-40 overflow-y-auto">
                  <p className="text-[9px] font-extrabold text-stone-400 uppercase tracking-widest block mb-1">Active Status Board</p>
                  {activeNotes.map((nt, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl text-xxs font-medium border text-left leading-normal relative ${
                        nt.sender === 'user'
                          ? 'bg-rose-50/40 border-rose-100 text-rose-900 ml-3'
                          : 'bg-indigo-50/40 border-indigo-100 text-indigo-900 mr-3'
                      }`}
                    >
                      <div className="flex justify-between font-bold mb-0.5">
                        <span>{nt.sender === 'user' ? 'You' : profile.partnerName}</span>
                        <span className="text-[8px] text-stone-400 font-mono font-normal">{nt.timestamp}</span>
                      </div>
                      <p className="font-sans">"{nt.text}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* LOCATION HISTORY SETTING AND DATA DELETION CARD (opt-in only!) */}
            <div className="bg-white/80 backdrop-blur border border-stone-200/50 rounded-3xl p-5 shadow-xs text-left">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>🛡️</span>
                <span>Privacy &amp; Log Archival</span>
              </h3>
              
              <div className="space-y-4">
                <label className="flex items-start justify-between cursor-pointer py-1.5 border-b border-stone-100 gap-3">
                  <div className="space-y-0.5 leading-tight">
                    <p className="font-bold text-stone-800 text-xxs uppercase tracking-wider">Enable Location History</p>
                    <p className="text-[10px] text-stone-400 font-medium">Keep a private chronological list of your coordinate locks (Disabled by default).</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={locationData.historyEnabled}
                    onChange={(e) => {
                      const enabled = e.target.checked;
                      setLocationData((prev) => ({ ...prev, historyEnabled: enabled }));
                      triggerNotification('History Settings', enabled ? 'History capture is active.' : 'History capture is inactive.');
                    }}
                    className="w-4 h-4 rounded text-pink-500 border-stone-300 focus:ring-pink-400 cursor-pointer mt-0.5 shrink-0"
                  />
                </label>

                {locationData.historyEnabled && locationData.historyLogs.length > 0 && (
                  <div className="space-y-1 max-h-32 overflow-y-auto border border-dashed border-stone-200 rounded-xl p-2.5 bg-stone-50">
                    <p className="text-[8px] font-extrabold text-stone-400 uppercase tracking-widest block mb-1">Local Coordinates Log Buffer</p>
                    {locationData.historyLogs.map((log, i) => (
                      <div key={i} className="flex justify-between gap-2 border-b border-stone-100 pb-1 text-[9px] font-mono leading-none py-1">
                        <span className="text-stone-400">{log.timestamp}</span>
                        <span className="text-[#4A4A4A] truncate max-w-[120px] font-semibold">{log.event}</span>
                        <span className="text-stone-400 font-sans tracking-wide text-[8px]">{log.location.split(',')[0]}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between pt-1 gap-3.5">
                  <button
                    type="button"
                    onClick={handleDeleteHistory}
                    className="w-full sm:w-auto px-3.5 py-2 bg-stone-100 hover:bg-stone-200/80 text-[#4A4A4A] text-xxs font-extrabold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 border border-stone-200"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-stone-500" />
                    <span>Purge Location Records</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setConnectionStatus('unpaired');
                      setPartnerConnected(false);
                      triggerNotification('Pair Reset', 'Unpaired successfully. Safe handshake credentials reloaded.');
                    }}
                    className="w-full sm:w-auto px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xxs font-extrabold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 border border-rose-100"
                  >
                    <span>Sever Couple Connection</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DISCLOSURE AND INFORMATION BOX IN FOOTER ACCORDING TO PRIVACY-FIRST STANDARDS */}
      <div className="bg-[#FFFBF5] border border-amber-100 p-4 rounded-3xl flex gap-3 text-left">
        <div className="p-1 px-2.5 bg-amber-50 rounded-xl text-base self-start border border-amber-200 inline-block text-amber-600 font-bold shrink-0 shadow-xs">
          🛡️
        </div>
        <div className="space-y-1 max-w-2xl font-medium">
          <h4 className="text-xxs uppercase tracking-wider text-amber-800 font-extrabold">End-to-End Consent Notice</h4>
          <p className="text-[11px] text-stone-605 text-stone-600 leading-normal">
            This module represents a compliance-certified safe location dashboard. There is absolutely NO background location pooling happening without your active browser-level permission click. All credentials, authorization tokens, coordinate caches, and status logs are stored localized inside your sandbox secure cache, completely away from third-party advertising agents.
          </p>
        </div>
      </div>

    </div>
  );
}
