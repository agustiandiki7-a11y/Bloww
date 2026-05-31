import React, { useState, useEffect } from 'react';
import {
  Heart,
  User,
  Calendar,
  Lock,
  Mail,
  ArrowLeft,
  ArrowRight,
  Palette,
  Shield,
  Clock,
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { CoupleProfile } from '../types';

interface RegisterProps {
  onRegisterSuccess: (profile: CoupleProfile) => void;
  onNavigateToLogin: () => void;
}

const AVATAR_TEMPLATES = [
  { name: 'Cute Bunny', url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=120&auto=format&fit=crop&q=60' },
  { name: 'Mochi Bear', url: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=120&auto=format&fit=crop&q=60' },
  { name: 'Soft Kitten', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=120&auto=format&fit=crop&q=60' },
  { name: 'Sweet Peach Chibi', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=60' }
];

const PARTNER_AVATAR_TEMPLATES = [
  { name: 'Cozy Puppy', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=120&auto=format&fit=crop&q=60' },
  { name: 'Panda Buddy', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=60' },
  { name: 'Matcha Bear', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60' },
  { name: 'Dreamy Chibi', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=60' }
];

export default function Register({ onRegisterSuccess, onNavigateToLogin }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [anniversaryDate, setAnniversaryDate] = useState('2024-02-14');
  const [themeKey, setThemeKey] = useState<'pastel' | 'pink' | 'lavender' | 'mint' | 'dark'>('pastel');

  // Choose avatar indices
  const [userAvatarIdx, setUserAvatarIdx] = useState(0);
  const [partnerAvatarIdx, setPartnerAvatarIdx] = useState(0);

  // Steps: 1 = Details, 2 = Email OTP Verification, 3 = Aesthetics Customize
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  // OTP Verification details
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpTimer, setOtpTimer] = useState(59);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  // Countdown timer effect for OTP
  useEffect(() => {
    let interval: any = null;
    if (step === 2 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const handleNextStep = () => {
    setError('');
    
    if (step === 1) {
      if (!email || !userName || !partnerName || !password) {
        setError('All credentials fields must be complete before establishing pairing links.');
        return;
      }
      if (!termsAccepted) {
        setError('You must read and accept LoveBloom’s Terms of Space Usage and Privacy Mandates to proceed.');
        return;
      }
      
      // Simulate sending OTP
      setOtpSent(true);
      setOtpTimer(59);
      setStep(2);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otpInput.trim()) {
      setError('Please provide the 6-digit confirmation key.');
      return;
    }

    // Accepting any typical 6 digit code or demo code '123456' / '520131'
    if (otpInput.length < 4) {
      setError('Verification token must be valid format.');
      return;
    }

    // Pass verification
    setResendStatus('Verified Successfully! 🌸 Entering garden room...');
    setTimeout(() => {
      setStep(3);
      setResendStatus(null);
    }, 1200);
  };

  const handleResendOtp = () => {
    setOtpTimer(59);
    setResendStatus('A new 6-digit passcode has been dispatched to: ' + email);
    setTimeout(() => {
      setResendStatus(null);
    }, 4500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save credentials to localStorage as persistent account so login actually matches
    const savedCredentials = {
      email,
      password,
      userName,
      partnerName
    };
    localStorage.setItem('amour_simulated_credentials', JSON.stringify(savedCredentials));

    const finalProfile: CoupleProfile = {
      userName,
      partnerName,
      avatarUrl: AVATAR_TEMPLATES[userAvatarIdx].url,
      partnerAvatarUrl: PARTNER_AVATAR_TEMPLATES[partnerAvatarIdx].url,
      anniversaryDate,
      themeKey,
      loveClicks: 5,
    };

    localStorage.setItem('amour_saved_profile', JSON.stringify(finalProfile));
    onRegisterSuccess(finalProfile);
  };

  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center relative overflow-hidden text-stone-850">
      
      {/* Charming backdrop animations */}
      <div className="absolute top-10 left-10 text-pink-300 pointer-events-none select-none text-2xl animate-bounce">🩰</div>
      <div className="absolute bottom-10 right-10 text-pink-300 pointer-events-none select-none text-2xl animate-bounce">🍨</div>

      <div className="w-full max-w-lg bg-white/75 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl relative z-10 transition-all duration-300 text-left">
        
        {/* Navigation back */}
        <div className="mb-6 flex justify-between items-center select-none">
          <button
            onClick={() => {
              if (step === 2) setStep(1);
              else if (step === 3) setStep(2);
              else onNavigateToLogin();
            }}
            className="flex items-center gap-1 text-stone-500 hover:text-stone-800 transition text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Back to Login' : step === 2 ? 'Back to Details' : 'Back to OTP Verification'}</span>
          </button>
          
          <span className="text-stone-400 text-xxs font-extrabold uppercase tracking-widest bg-stone-100/90 px-3 py-1 rounded-full border border-stone-200/55">
            Step {step} of 3
          </span>
        </div>

        {/* Message */}
        <div className="text-center mb-6 select-none">
          <h2 className="text-xl font-bold font-serif italic text-stone-800">Establish Companion Harmony</h2>
          <p className="text-xs text-stone-500 mt-1">Join LoveBloom's offline-secure joint space platform</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-2xl mb-5 border border-red-100 flex items-center gap-2 font-semibold">
            <span className="shrink-0 text-stone-400">🚨</span>
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: BASIC ACCOUNTS REGISTRATION */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1.5 ml-1">Your Nickname</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Mochi Lover"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1.5 ml-1">Partner Nickname</label>
                <div className="relative">
                  <Heart className="w-4 h-4 text-pink-400/80 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Peach Partner"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1.5 ml-1">Pair Space Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="loveplants@duo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1.5 ml-1">Private Lock Code (Password)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs font-medium"
                />
              </div>
            </div>

            {/* MANDATORY AGREE TO PRIVACY */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl relative space-y-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 text-pink-500 rounded border-stone-300 focus:ring-pink-400 cursor-pointer mt-0.5 shrink-0"
                />
                <span className="text-[11px] text-stone-600 leading-normal font-sans font-medium">
                  I accept the <button type="button" onClick={() => setShowTermsModal(true)} className="text-pink-600 font-bold underline hover:text-pink-700">Terms of Service</button> and <button type="button" onClick={() => setShowTermsModal(true)} className="text-pink-600 font-bold underline hover:text-pink-700">Consent Data Privacy Directives</button> detailing absolute geolocation opt-in keys.
                </span>
              </label>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-pink-300/20 hover:scale-[1.01] transition active:scale-[0.99] flex items-center justify-center gap-2 text-xs text-center cursor-pointer border-b-2 border-pink-700/10"
            >
              <span>Validate Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* STEP 2: EMAIL VERIFICATION LOOP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="bg-pink-55/40 bg-rose-50/50 p-4 border border-rose-100 rounded-2xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-605 text-stone-600 leading-normal font-sans font-medium">
                <p className="font-bold text-stone-850">Handshake Verification Dispatch</p>
                <p className="mt-0.5">A secure 6-digit coordinate invitation hash has been sent to your email <strong>{email}</strong>.</p>
              </div>
            </div>

            {resendStatus && (
              <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-xl border border-emerald-105 font-semibold">
                🔔 {resendStatus}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1 ml-1 text-left">
                Enter 6-Digit Code
              </label>
              
              <input
                type="text"
                maxLength={6}
                required
                placeholder="123456"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center tracking-[0.75em] pl-[0.75em] py-3 bg-stone-50 border border-stone-200 rounded-2xl text-lg font-mono font-bold text-rose-950 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="flex items-center justify-between text-xxs font-bold text-stone-400 uppercase tracking-wider pl-1">
              <span>Code expires in: <strong className="text-rose-550 text-rose-600 font-mono text-xs">{otpTimer}s</strong></span>
              {otpTimer === 0 ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-pink-600 font-extrabold hover:underline"
                >
                  Resend Key Code
                </button>
              ) : (
                <span className="text-stone-300">Resend (Wait {otpTimer}s)</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md active:scale-95 transition flex items-center justify-center gap-1 text-xs cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Verify Mail and Setup Aesthetics</span>
            </button>
          </form>
        )}

        {/* STEP 3: AESTHETICS CUSTOMIZATION */}
        {step === 3 && (
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Anniversary setup */}
            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1.5 px-1">Anniversary Date (Starts Custom Counter)</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-anniversary"
                  type="date"
                  required
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-stone-200 rounded-xl text-stone-850 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs font-semibold"
                />
              </div>
            </div>

            {/* Choose Theme Key */}
            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1.5 px-1 flex items-center gap-1 select-none">
                <Palette className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
                Workspace Skin Preset
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { key: 'pastel', label: 'Cream', dot: 'bg-amber-100 border-amber-300' },
                  { key: 'pink', label: 'Petal', dot: 'bg-pink-100 border-pink-300' },
                  { key: 'lavender', label: 'Lilac', dot: 'bg-purple-100 border-purple-300' },
                  { key: 'mint', label: 'Mint', dot: 'bg-emerald-100 border-emerald-300' },
                  { key: 'dark', label: 'Deep', dot: 'bg-stone-800 border-stone-700 text-white' }
                ].map((th) => (
                  <button
                    key={th.key}
                    type="button"
                    onClick={() => setThemeKey(th.key as any)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-extrabold transition cursor-pointer select-none ${
                        themeKey === th.key
                        ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm'
                        : 'border-stone-200 bg-white text-stone-500 hover:bg-stone-50'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${th.dot} border mb-1`} />
                    <span>{th.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar picker - user */}
            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1 px-1">Your Mascot Avatar</label>
              <div className="grid grid-cols-4 gap-2">
                {AVATAR_TEMPLATES.map((tpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUserAvatarIdx(idx)}
                    className={`relative p-1 rounded-xl overflow-hidden border-2 transition ${
                      userAvatarIdx === idx ? 'border-pink-500 ring-2 ring-pink-100 bg-pink-50/10' : 'border-dashed border-stone-200'
                    }`}
                  >
                    <img src={tpl.url} alt={tpl.name} className="w-full h-8 object-cover rounded-lg" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar picker - partner */}
            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1 px-1">Partner's Mascot Avatar</label>
              <div className="grid grid-cols-4 gap-2">
                {PARTNER_AVATAR_TEMPLATES.map((tpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPartnerAvatarIdx(idx)}
                    className={`relative p-1 rounded-xl overflow-hidden border-2 transition ${
                      partnerAvatarIdx === idx ? 'border-indigo-500 ring-2 ring-indigo-100 bg-indigo-50/10' : 'border-dashed border-stone-200'
                    }`}
                  >
                    <img src={tpl.url} alt={tpl.name} className="w-full h-8 object-cover rounded-lg" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Instantiate Garden space */}
            <button
              id="register-submit-btn"
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-450 hover:from-pink-600 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md border-b-2 border-pink-700/20 active:scale-95 transition flex items-center justify-center gap-1 text-xs cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white animate-pulse" />
              <span>Enter Harmonized Space</span>
            </button>
          </form>
        )}
      </div>

      {/* TERMS AND PRIVACY COMPLIANCE DIALOG OVERLAY */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-2xl space-y-4 text-left animate-fade-in">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Shield className="w-5 h-5 text-pink-500 shrink-0" />
              <h3 className="text-sm font-serif font-bold text-stone-800">Garden Terms &amp; Geolocation Consent</h3>
            </div>

            <div className="text-xxs text-stone-500 leading-normal pl-1 space-y-2.5 max-h-60 overflow-y-auto pr-2 font-medium font-sans">
              <p><strong>1. Privacy-First Identity Mandate</strong>: LoveBloom secures digital scrapbooks and GPS telemetry markers inside sandboxed private space storage keys. We NEVER serialize or disclose coordinate feeds to third-party ad brokers.</p>
              <p><strong>2. Interactive GPS Opt-In</strong>: The Love Radar feature operates under explicit voluntary consent constraints. Browser coordinates are queried solely through standard Geolocation specifications during active user foreground focus sessions.</p>
              <p><strong>3. Emergency Severance Toggle</strong>: Users maintain absolute unilateral authority to terminate coordinate stream relays instantly. Selecting the "Emergency Stop Sharing" trigger mutes transmission grids without penalty.</p>
              <p><strong>4. Localized History Purge</strong>: Location records are turned off by default. Enabling historical tracing is purely opt-in, with absolute data deletion controls stored directly within the User Space Settings dashboard.</p>
            </div>

            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Acknowledge Declarations
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
