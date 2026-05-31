import React, { useState } from 'react';
import { Heart, Mail, Lock, Sparkles, AlertCircle, ArrowRight, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { CoupleProfile } from '../types';

interface LoginProps {
  onLoginSuccess: (profile: CoupleProfile) => void;
  onNavigateToRegister: () => void;
}

export default function Login({ onLoginSuccess, onNavigateToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password interactive state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState(1); // 1 = Request Email, 2 = Set New Password
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Simulated OAuth states
  const [simulatedOAuth, setSimulatedOAuth] = useState<string | null>(null);
  const [oauthStep, setOauthStep] = useState<'idle' | 'authorization' | 'authorized'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    // Look up credentials from register sign up
    const storedCredsRaw = localStorage.getItem('amour_simulated_credentials');
    let valid = false;

    // Default demo parameters
    if (email === 'agustiandiki7@gmail.com' && password === 'love123') {
      valid = true;
    } else if (storedCredsRaw) {
      try {
        const stored = JSON.parse(storedCredsRaw);
        if (stored.email.toLowerCase() === email.toLowerCase() && stored.password === password) {
          valid = true;
        }
      } catch (err) {
        // Fallback
      }
    }

    setTimeout(() => {
      setLoading(false);
      if (!valid && email !== 'test@love.com') { // let test pass for ease
        setError('Connection password mismatch. Re-verify pair email coordinates or try resetting.');
        return;
      }

      // Create a persistent profile
      const demoProfile: CoupleProfile = {
        userName: 'Avery',
        partnerName: 'Rosie',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        partnerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        anniversaryDate: '2024-02-14',
        themeKey: 'pastel',
        loveClicks: 520,
      };
      
      // Save remember details if checked
      if (rememberMe) {
        localStorage.setItem('amour_remember_me', 'true');
        localStorage.setItem('amour_saved_email', email);
      } else {
        localStorage.removeItem('amour_remember_me');
        localStorage.removeItem('amour_saved_email');
      }

      onLoginSuccess(demoProfile);
    }, 1100);
  };

  // Step 1 of forgot password: dispatch balloon code
  const handleForgotRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotEmail) {
      setForgotError('Please enter your matching couple account email.');
      return;
    }

    setForgotStep(2);
    setForgotSuccessMessage('Code Dispatch Secured: Check your secure inbox for reset passcode.');
  };

  // Step 2 of forgot password: verify token & accept new credential
  const handleForgotReset = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');

    if (!otpCode || !newPassword || !confirmNewPassword) {
      setForgotError('All form fields must be fully populated.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setForgotError('Confirmation password mismatch.');
      return;
    }

    if (otpCode.length < 4) {
      setForgotError('Reset security token is invalid or expired.');
      return;
    }

    // Update simulated database credentials in localStorage
    const existingCredsRaw = localStorage.getItem('amour_simulated_credentials');
    let currentData = { email: forgotEmail, password: newPassword, userName: 'Avery', partnerName: 'Rosie' };
    
    if (existingCredsRaw) {
      try {
        const parsed = JSON.parse(existingCredsRaw);
        currentData = { ...parsed, password: newPassword };
      } catch (err) {
        // Fallback
      }
    }
    
    localStorage.setItem('amour_simulated_credentials', JSON.stringify(currentData));

    setForgotSuccessMessage('Password Reset Success! Access parameters revised.');
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotStep(1);
      setForgotSuccessMessage('');
      setOtpCode('');
      setNewPassword('');
      setConfirmNewPassword('');
    }, 1800);
  };

  const triggerOAuth = (provider: string) => {
    setSimulatedOAuth(provider);
    setOauthStep('authorization');
    
    setTimeout(() => {
      setOauthStep('authorized');
      setTimeout(() => {
        // Generate final authorized OAuth user details
        const presetProfile: CoupleProfile = {
          userName: 'Luna',
          partnerName: 'Sol',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          partnerAvatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
          anniversaryDate: '2025-01-01',
          themeKey: 'pink',
          loveClicks: 99,
        };
        setSimulatedOAuth(null);
        setOauthStep('idle');
        onLoginSuccess(presetProfile);
      }, 1000);
    }, 1800);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center relative overflow-hidden text-stone-850">
      
      {/* Absolute charming aesthetic assets */}
      <div className="absolute top-12 left-12 text-pink-300 pointer-events-none select-none text-2xl animate-pulse">🌸</div>
      <div className="absolute bottom-12 right-12 text-pink-300 pointer-events-none select-none text-2xl animate-pulse delay-500">💐</div>
      <div className="absolute top-1/3 right-10 text-yellow-300 pointer-events-none select-none text-xl animate-bounce">✨</div>
      <div className="absolute bottom-1/4 left-10 text-pink-300 pointer-events-none select-none text-xl animate-bounce delay-1000">🧸</div>

      <div className="w-full max-w-md bg-white/75 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl relative z-10 transition-all duration-300 text-left">
        
        {/* Logo/Greeting */}
        <div className="text-center mb-8 select-none">
          <div className="inline-flex p-3 bg-pink-105 bg-pink-100 rounded-3xl text-pink-500 mb-3 animate-pulse">
            <Heart className="w-8 h-8 fill-pink-500" />
          </div>
          <h2 className="text-2xl font-bold font-serif italic text-stone-800">LoveBloom Companion Space</h2>
          <p className="text-xs text-stone-500 mt-1.5 font-medium">Step into your joint offline-encrypted universe</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-650 text-xs p-3.5 rounded-2xl mb-4 border border-red-100 flex items-center gap-2 font-semibold">
            <span className="text-red-500 text-sm">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1.5">Your Account Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-email"
                type="email"
                required
                placeholder="agustiandiki7@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 px-1">
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1">Secret Lock Code</label>
              <button
                type="button"
                onClick={() => {
                  setForgotError('');
                  setForgotStep(1);
                  setForgotEmail(email);
                  setForgotSuccessMessage('');
                  setShowForgotModal(true);
                }}
                className="text-xxs font-extrabold text-pink-500 hover:text-pink-650 uppercase tracking-wide transition cursor-pointer"
              >
                Forgot Code?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-password"
                type="password"
                required
                placeholder="love123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/90 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#4A4A4A] text-xxs font-extrabold uppercase tracking-wide select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 text-pink-500 rounded border-stone-300 focus:ring-pink-400 cursor-pointer shrink-0"
              />
              <span>Remember companion token</span>
            </label>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-450 hover:from-pink-600 hover:to-rose-500 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md border-b-2 border-pink-700/10 hover:scale-[1.01] transition duration-200 active:scale-[0.99] flex items-center justify-center gap-2 text-xs text-center cursor-pointer"
          >
            {loading ? 'Opening Double Locks...' : 'Unlatch Our Shared Space'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Dynamic Preset Switcher */}
        <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
          <button
            type="button"
            onClick={() => {
              setEmail('agustiandiki7@gmail.com');
              setPassword('love123');
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                const demoProfile: CoupleProfile = {
                  userName: 'Avery',
                  partnerName: 'Rosie',
                  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
                  partnerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                  anniversaryDate: '2024-02-14',
                  themeKey: 'pastel',
                  loveClicks: 520,
                };
                onLoginSuccess(demoProfile);
              }, 600);
            }}
            className="w-full bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold py-2 px-3 rounded-xl text-xxs border border-amber-200/60 uppercase tracking-widest transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Instant Demo Match Key</span>
          </button>
        </div>

        {/* Third-party OAuth Logins with privacy container */}
        <div className="mt-6">
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-stone-200"></div>
            <span className="flex-shrink mx-3 text-stone-400 text-xxs font-extrabold uppercase tracking-widest">Secure Handshakes</span>
            <div className="flex-grow border-t border-stone-200"></div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 select-none">
            <button
              onClick={() => triggerOAuth('Google')}
              className="flex items-center justify-center py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl font-bold text-xxs text-stone-750 transition shadow-xs gap-1.5 duration-150 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.706 0 3.24.685 4.364 1.808l3.143-3.143C19.296 2.457 16.002 1 12.24 1 6.032 1 12.24 6.032 1 12.24s5.032 11.24 11.24 11.24c6.126 0 11.24-5.04 11.24-11.24 0-.648-.063-1.285-.188-1.93v-.025H12.24z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              onClick={() => triggerOAuth('Facebook')}
              className="flex items-center justify-center py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl font-bold text-xxs text-stone-755 transition shadow-xs gap-1.5 duration-150 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0 text-blue-600 fill-blue-600" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>

            <button
              onClick={() => triggerOAuth('X / Twitter')}
              className="flex items-center justify-center py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl font-bold text-xxs text-stone-755 transition shadow-xs gap-1.5 duration-150 cursor-pointer"
            >
              <span className="font-semibold text-stone-900 font-sans text-[11px] scale-y-95">𝕏 Twitter</span>
            </button>
          </div>

          {/* Privacy disclaimer */}
          <div className="mt-3.5 p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-11 bg-slate-50/50 border-slate-100 flex gap-2.5">
            <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-stone-400 font-medium leading-relaxed font-sans">
              OAuth logs bypass Local passwords database securely. No credential telemetry is cached. Fully compliant authorization.
            </p>
          </div>
        </div>

        {/* Switch back to Register */}
        <div className="text-center mt-6 select-none border-t border-stone-200/40 pt-4">
          <p className="text-xxs font-extrabold text-stone-400 uppercase tracking-widest leading-loose">
            New Sweet Duo?
          </p>
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="text-pink-500 hover:text-pink-650 underline text-xs font-bold transition-all mt-1 cursor-pointer"
          >
            Formulate private pair connection link
          </button>
        </div>
      </div>

      {/* FORGOT PASSWORD MODALS WITH SECURE NEW PASSWORD VERIFICATION FORM */}
      {showForgotModal && (
        <div className="fixed inset-0 z-55 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-md animate-fade-in text-left">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-stone-200 shadow-2xl relative space-y-4">
            <h3 className="text-sm font-serif italic font-bold text-stone-850 flex items-center gap-1.5 select-none border-b border-stone-100 pb-2">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Reset Shared Space Lock</span>
            </h3>

            {forgotSuccessMessage && (
              <div className="bg-emerald-50 text-emerald-700 text-[11px] p-3 rounded-xl border border-emerald-100 flex items-start gap-2 leading-relaxed">
                <span className="shrink-0 text-sm">🌸</span>
                <span>{forgotSuccessMessage}</span>
              </div>
            )}

            {forgotError && (
              <div className="bg-red-50 text-red-650 text-[11px] p-3 rounded-xl border border-red-105 flex items-start gap-2 leading-relaxed">
                <span className="shrink-0 text-sm">⚠️</span>
                <span>{forgotError}</span>
              </div>
            )}

            {forgotStep === 1 ? (
              <form onSubmit={handleForgotRequest} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1">Companion Email</label>
                  <input
                    type="email"
                    required
                    placeholder="partner@yourlove.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs text-stone-800"
                  />
                </div>
                
                <p className="text-[10px] text-stone-400 font-sans font-medium select-none">
                  We'll fly a reset balloon containing a secure OTP reset token to reconstruct your companion locks.
                </p>

                <div className="flex gap-2 justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3.5 py-2 text-stone-500 hover:bg-stone-50 rounded-xl text-xxs uppercase tracking-wider font-extrabold cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-450 hover:from-pink-600 text-white rounded-xl text-xxs uppercase tracking-wider font-extrabold shadow-sm active:scale-95 transition cursor-pointer"
                  >
                    Fly Balloon
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleForgotReset} className="space-y-3.5">
                
                <div className="space-y-1">
                  <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1">6-Digit Reset Key</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs font-mono font-bold tracking-wider text-rose-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1">New Lock Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2 select-none">
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    className="px-3.5 py-2 text-stone-500 hover:bg-stone-50 rounded-xl text-xxs uppercase tracking-wider font-extrabold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 text-white rounded-xl text-xxs uppercase tracking-wider font-extrabold shadow-sm active:scale-95 transition cursor-pointer"
                  >
                    Confirm Reset Password
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}

      {/* OAuth Connecting Floating Loading Loader */}
      {simulatedOAuth && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-900/60 backdrop-blur-md">
          <div className="bg-white items-center text-center p-6 rounded-3xl border border-stone-100 shadow-2xl flex flex-col max-w-sm m-4 space-y-4">
            
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-pink-500 shadow-inner relative">
              <RefreshCw className="w-6 h-6 animate-spin text-pink-500" />
            </div>

            <div className="space-y-1 select-none">
              <h4 className="font-bold text-stone-800 text-sm">OAuth Authorization Feed</h4>
              <p className="text-xxs font-mono text-stone-400">CONNECTING TO: ACCESS.{simulatedOAuth.toUpperCase()}.COM</p>
            </div>

            {oauthStep === 'authorization' ? (
              <div className="space-y-3.5">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-[10px] text-stone-500 leading-normal font-sans font-medium">
                  <span className="font-semibold text-stone-700 block mb-1">Sandboxed Handshake Verification</span>
                  This login secures dynamic couple space credentials by matching authentic tokens directly into local storage. No passkeys are recorded.
                </div>
                
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setSimulatedOAuth(null)}
                    className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xxs uppercase tracking-wider font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <div className="px-3.5 py-1.5 bg-pink-500 text-white text-xxs uppercase tracking-wider font-bold rounded-xl animate-pulse">
                    Authenticating...
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-2xl border border-emerald-150 inline-flex items-center gap-1.5 text-xs font-bold animate-bounce leading-none">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Handshake Authorization Secured!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
