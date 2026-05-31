import React, { useState } from 'react';
import { Heart, Sparkles, Star, Check, Shield, Zap, Sparkle, LogIn, Lock, ArrowRight, BookOpen, Smartphone, Gift, Music, Film, MessageCircle, Crown, Settings as SettingsIcon, X, Calendar, AlertCircle } from 'lucide-react';
import Login from './Login';
import Register from './Register';
import { CoupleProfile } from '../types';

interface LandingPageProps {
  onLoginSuccess: (profile: CoupleProfile) => void;
}

export default function LandingPage({ onLoginSuccess }: LandingPageProps) {
  const [activeAuthTab, setActiveAuthTab] = useState<'login' | 'register' | null>(null);
  
  // Checkout & Premium Simulator States
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string, code: string} | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'GoPay' | 'DANA' | 'QRIS' | 'Bank Transfer' | 'Virtual Account' | null>(null);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'waiting_payment' | 'processing' | 'success' | 'failed'>('idle');
  const [countdown, setCountdown] = useState(15);
  const [checkoutCode, setCheckoutCode] = useState('');

  const plans = [
    {
      name: "Free Bloom Option",
      price: "Rp 0",
      desc: "For sweet duos dipping their toes in digital romance.",
      code: "free",
      features: [
        "Create basic digital bouquets",
        "Single scrapbook diary page",
        "Standard mobile lockscreen stickers",
        "Cozy default music player loops",
      ],
      popular: false
    },
    {
      name: "Premium Couple Bundle",
      price: "Rp 49,000 /mo",
      desc: "Perfect tier to keep your love coordinates perfectly in sync.",
      code: "premium",
      features: [
        "Unlimited scrapbook album diaries",
        "HD quality wallpaper export backgrounds",
        "Exclusive premium sticker palettes",
        "Fully shared media & cinemax boards",
        "High priority custom note indicators"
      ],
      popular: true
    },
    {
      name: "Shared Couple Infinity",
      price: "Rp 89,000 /lifetime",
      desc: "For true romantic soulmates building an everlasting archive.",
      code: "infinity",
      features: [
        "All Premium features included forever",
        "Shared cloud workspace with 5GB storage",
        "Instantly broadcast active moods",
        "VIP exclusive theme skins (Lotus, Lilac)",
        "Zero subscription constraints"
      ],
      popular: false
    }
  ];

  const triggerCheckout = (plan: typeof plans[0]) => {
    if (plan.code === 'free') {
      alert("Enjoy LoveBloom's Free Tier! Registrasi akun Anda sekarang untuk mulai.");
      setActiveAuthTab('register');
      return;
    }
    setSelectedPlan({ name: plan.name, price: plan.price, code: plan.code });
    setPaymentMethod('QRIS');
    setCheckoutState('idle');
  };

  const handlePayNow = () => {
    if (!paymentMethod) return;
    setCheckoutState('processing');

    // Simulate Midtrans/Xendit processing
    setTimeout(() => {
      // 10% chance fail just to showcase robust failed boundary check
      const success = Math.random() > 0.15;
      if (success) {
        setCheckoutState('waiting_payment');
        // Generate mock payment transfer code/QR code
        if (paymentMethod === 'QRIS') {
          setCheckoutCode('QR_LOVEBLOOM_' + Math.floor(Math.random() * 900000 + 100000));
        } else {
          setCheckoutCode('VA_MANDIRI_8008' + Math.floor(Math.random() * 9000000 + 1000000));
        }
      } else {
        setCheckoutState('failed');
      }
    }, 1200);
  };

  const simulateSuccessPayment = () => {
    setCheckoutState('processing');
    setTimeout(() => {
      setCheckoutState('success');
      // Set premium cookie to true
      localStorage.setItem('amour_is_premium', 'true');
    }, 1000);
  };

  return (
    <div id="landing-container" className="min-h-screen bg-[#FFFBF7] text-[#2D2A32] font-sans antialiased relative overflow-x-hidden">
      
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 -left-20 w-96 h-96 bg-[#FFEBEF] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-[40%] -right-20 w-80 h-80 bg-[#D9C2FF]/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FFF6E9] rounded-full blur-3xl opacity-70 pointer-events-none" />

      {/* Floating Sparkles & Hearts */}
      <div className="absolute top-24 right-10 text-[#FF8FAB] text-2xl animate-pulse pointer-events-none select-none">💖</div>
      <div className="absolute top-[60%] left-6 text-purple-300 text-3xl animate-bounce pointer-events-none select-none">✨</div>
      <div className="absolute bottom-[20%] right-24 text-red-400 text-xl animate-pulse pointer-events-none select-none">🌷</div>

      {/* Primary Top Header Header bar */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-rose-100 px-4 py-3.5 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="text-3xl animate-pulse">🌷</span>
            <div>
              <span className="font-serif italic font-bold text-xl md:text-2xl text-rose-500 block leading-tight">LoveBloom</span>
              <span className="text-[9px] uppercase tracking-widest text-[#FF4D6D] font-bold block leading-none">Original Nest Space</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[#2D2A32]/80">
            <a href="#features-anchor" className="hover:text-rose-500 transition">Playgrounds</a>
            <a href="#testimonials-anchor" className="hover:text-rose-500 transition">Duos Happy Stories</a>
            <a href="#pricing-anchor" className="hover:text-rose-500 transition">Premium Tiers</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveAuthTab('login')}
              className="px-3.5 py-1.5 h-[40px] text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-1.5 border border-rose-100"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => setActiveAuthTab('register')}
              className="px-4 py-1.5 h-[40px] text-xs font-extrabold text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 rounded-xl transition shadow-sm shadow-pink-200"
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Core Section with elegant Bloomy 🌷 welcome box */}
      <section className="relative pt-12 md:pt-24 pb-16 px-4 max-w-7xl mx-auto z-10 text-center">
        <div className="max-w-3xl mx-auto">
          
          {/* Bloomy Welcome Dialog Bubble */}
          <div className="inline-flex items-center gap-3 bg-white border border-rose-100 rounded-full px-5 py-2 shadow-sm mb-6 animate-bounce">
            <span className="text-2xl">🌷</span>
            <span className="text-xs font-medium text-rose-800">
              Hi, I'm <strong className="font-serif italic">Bloomy</strong>! Let me guide you to plant beautiful love seed memories.
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6.5xl font-serif italic font-extrabold tracking-tight text-[#2D2A32] leading-tight max-w-2xl mx-auto">
            Turn your feelings into beautiful <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-red-500">digital memories</span>.
          </h2>
          
          <p className="mt-5 text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            LoveBloom is a cute premium space crafted for couples. Express states instantly, construct beautiful bouquets, design custom wallpapers, write romantic scrapbook albums, and cue quiet soundtracks.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => setActiveAuthTab('register')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-extrabold text-sm rounded-2xl shadow-lg border-b-4 border-pink-700/20 active:scale-97 transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build My Couple Workspace</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            
            <button
              onClick={() => {
                const element = document.getElementById('features-anchor');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-rose-50 text-[#2D2A32] font-bold text-sm rounded-2xl border border-rose-150 transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Features</span>
            </button>
          </div>
        </div>

        {/* Handcrafted CSS Showcase mockup on beautiful responsive canvas */}
        <div className="mt-16 w-full max-w-5xl mx-auto relative px-3">
          <div className="absolute inset-0 bg-[#FF8FAB]/10 rounded-3xl filter blur-3xl transform -rotate-1 pointer-events-none" />
          
          <div className="relative bg-white/75 backdrop-blur-xl rounded-xxl p-6 md:p-8 border-2 border-white shadow-2xl flex flex-col md:flex-row gap-6 items-center text-left">
            <div className="flex-1 space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF4D6D] bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">Shared Live Interface</span>
              <h3 className="text-2xl md:text-3.5xl font-serif italic font-bold text-rose-950">A secure private nest for the two of you</h3>
              <p className="text-xs text-stone-605 text-stone-600 leading-relaxed">
                Unlock gorgeous local states, live status updates, handpicked cinema watching calendars, and an immersive background soundtrack workspace. Best used as your personal lockscreen wallpaper maker and scrapbook diary!
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-[#FFF6E9] rounded-2xl border border-amber-100">
                  <span className="text-xl block mb-1">🎁</span>
                  <p className="text-xs font-bold text-stone-800">GIF Gift Studio</p>
                  <p className="text-[10px] text-stone-550 leading-tight">Transmit animations instantly with scheduled notes</p>
                </div>
                <div className="p-3 bg-[#D9C2FF]/30 rounded-2xl border border-purple-100">
                  <span className="text-xl block mb-1">🎨</span>
                  <p className="text-xs font-bold text-stone-800">Wallpaper Maker</p>
                  <p className="text-[10px] text-stone-550 leading-tight">Generate adorable lockscreens with customizable stickers</p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full relative sm:p-4">
              {/* Device Frame Preview simulator */}
              <div className="bg-rose-950/90 border-4 border-white shadow-xl rounded-3xl overflow-hidden p-4 text-white font-mono text-center relative">
                <div className="w-16 h-4 bg-white rounded-full mx-auto mb-4 relative" />
                <div className="text-left font-sans text-xs bg-[#FFFBF7]/10 p-3 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌷</span>
                    <div>
                      <h4 className="font-extrabold text-white text-[11px]">Bloomy Mascot Notice:</h4>
                      <p className="text-[9px] text-[#FFF6E9]/80">"Your partner just sent a bouquet!"</p>
                    </div>
                  </div>
                  <div className="h-20 flex items-center justify-center border border-dashed border-white/25 rounded-xl bg-white/5 font-serif italic text-rose-300 text-xs text-center p-2">
                    "Red Rose Bouquet for my lovely bunny" 🌹🌹🌹
                  </div>
                </div>
                <div className="mt-4 text-[9px] uppercase tracking-widest text-pink-300 font-bold">LoveBloom Live Simulator</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Showcase Grid */}
      <section id="features-anchor" className="py-16 px-4 bg-[#FFF9F5] border-t border-rose-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif italic font-extrabold text-3xl text-rose-950">Packed with Interactive Playgrounds</h3>
            <p className="text-xs text-stone-600 mt-2">No unrequested features, just pure romantic tools formatted beautifully for phones & laptops alike.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs hover:shadow-md transition">
              <div className="p-3 bg-pink-100/40 rounded-2xl w-fit text-pink-500 font-bold mb-4">
                <BookOpen className="w-5 h-5 text-[#FF8FAB]" />
              </div>
              <h4 className="text-sm font-serif italic font-bold text-stone-800">Scrapbook Creator</h4>
              <p className="text-xs text-stone-550 mt-1 leading-relaxed">Drag-and-drop stickers, write hand-penned love notes, upload images, and easily export shared pages.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs hover:shadow-md transition">
              <div className="p-3 bg-blue-150/40 bg-blue-50 rounded-2xl w-fit text-[#FF8FAB] mb-4">
                <Smartphone className="w-5 h-5 text-blue-500" />
              </div>
              <h4 className="text-sm font-serif italic font-bold text-stone-800">Wallpaper Creator</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Design adorable couple phone lockscreens. Choose elegant templates, insert stickers, and export in HD format.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs hover:shadow-md transition">
              <div className="p-3 bg-amber-100/40 rounded-2xl w-fit text-amber-500 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <h4 className="text-sm font-serif italic font-bold text-stone-800">Flower Bouquet Builder</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Arrange gorgeous custom digital bouquets using Red Roses, Peach Tulips, and Sunflowers. Tuck in customized note cards.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs hover:shadow-md transition">
              <div className="p-3 bg-purple-100/40 rounded-2xl w-fit text-purple-600 mb-4">
                <Music className="w-5 h-5 text-purple-500" />
              </div>
              <h4 className="text-sm font-serif italic font-bold text-stone-800">Spotify & Cozy Audiowaves</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Connect Spotify or queue our cozy built-in ambient tape recorder, setting a warm atmosphere while browsing.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs hover:shadow-md transition">
              <div className="p-3 bg-rose-100/40 rounded-2xl w-fit text-red-500 mb-4">
                <Film className="w-5 h-5 text-[#FF4D6D]" />
              </div>
              <h4 className="text-sm font-serif italic font-bold text-stone-800">Cinema Watchlist Planners</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">Unveil lovely recommendations sorted by genre/anime. Keep list dates and coordinate watchlist reviews easily.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs hover:shadow-md transition">
              <div className="p-3 bg-rose-50 rounded-2xl w-fit text-rose-500 mb-4">
                <MessageCircle className="w-5 h-5 text-rose-500" />
              </div>
              <h4 className="text-sm font-serif italic font-bold text-stone-800">Whisper Chat & Mood Cues</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">A completely private live secure chat to broadcast emotional resonance indicators back and forth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Testimonials Section */}
      <section id="testimonials-anchor" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF4D6D] bg-rose-50 px-3.5 py-1 rounded-full">Loved by Soulmates</span>
          <h3 className="font-serif italic font-extrabold text-3xl text-rose-950 mt-3 mb-10">Duo Happy Stories</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#FFF6E9]/40 border border-amber-100 p-6 rounded-3xl relative">
              <div className="flex gap-1 text-amber-400 mb-2.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 shrink-0" />)}
              </div>
              <p className="text-xs text-stone-705 text-stone-700 italic leading-relaxed">
                "The lockscreen wallpaper maker on LoveBloom is brilliant! We build a custom sunset wallpaper with stickers every single Sunday. It looks gorgeous on our phones!"
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-lg">🩰</span>
                <div>
                  <h5 className="text-[11px] font-bold text-stone-800">Clara &amp; Tommy</h5>
                  <p className="text-[9px] text-stone-400 uppercase tracking-wide">Premium partners &bull; 2 years</p>
                </div>
              </div>
            </div>

            <div className="bg-[#D9C2FF]/10 border border-purple-100 p-6 rounded-3xl relative">
              <div className="flex gap-1 text-amber-400 mb-2.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 shrink-0" />)}
              </div>
              <p className="text-xs text-stone-705 text-stone-700 italic leading-relaxed">
                "Finding sweet notes locked each day by Tommy is my favorite part of waking up. And Bloomy 🌷 is such an adorable mascot, checking in whenever we update our scrapbook!"
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-lg">🧸</span>
                <div>
                  <h5 className="text-[11px] font-bold text-stone-800">Sasha &amp; Ken</h5>
                  <p className="text-[9px] text-stone-400 uppercase tracking-wide">Infinity partners &bull; 8 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Pricing Section & Checkout Portals Simulator */}
      <section id="pricing-anchor" className="py-16 px-4 bg-[#FFF9F5] border-t border-rose-100/55">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif italic font-extrabold text-3xl text-rose-950">Simple, Transparent Pricing</h3>
            <p className="text-xs text-stone-655 text-stone-600 mt-2">
              Enhance your connections. Choose a tier or try the Premium interactive purchase simulator below!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((p) => (
              <div
                key={p.code}
                className={`bg-white rounded-3xl p-6.5 border flex flex-col justify-between transition-all duration-300 relative ${
                  p.popular
                    ? 'border-[#FF8FAB] ring-2 ring-[#FF8FAB]/25 scale-102 shadow-md md:-translate-y-2'
                    : 'border-rose-100/80 shadow-xs'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF8FAB] to-[#FF4D6D] text-white text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                    Most Popular Duo Choice
                  </span>
                )}

                <div>
                  <h4 className="text-base font-serif italic font-bold text-[#2D2A32]">{p.name}</h4>
                  <div className="my-3 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-rose-950">{p.price}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed mb-5">{p.desc}</p>
                  
                  <div className="w-full h-px bg-rose-50 border-dashed mb-5" />
                  
                  <ul className="space-y-2.5 text-left text-xs text-stone-600 mb-6">
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => triggerCheckout(p)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition duration-150 ${
                    p.popular
                      ? 'bg-[#FF8FAB] hover:bg-[#FF4D6D] text-white shadow-sm'
                      : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-150'
                  }`}
                >
                  {p.code === 'free' ? 'Select Free Tier' : 'Aquire Premium'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Payment Gateway Integrations & Checkout Panel Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2A32]/40 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white rounded-3xl p-6.5 w-full max-w-md border-2 border-rose-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-rose-50 rounded-full transition text-stone-500"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Simulated Stages */}
            {checkoutState === 'idle' && (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/50">
                  Secure Checkout Portal
                </span>
                <h3 className="text-xl font-serif italic font-bold text-rose-950 mt-2 mb-1">
                  Connect {selectedPlan.name}
                </h3>
                <p className="text-xs text-stone-550 mb-4 ">
                  Midtrans &amp; Xendit automated banking system placeholder. Select your active regional payment option:
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    { id: 'QRIS', label: 'QRIS Instant Scan', fee: 'No fee', icon: '📱' },
                    { id: 'GoPay', label: 'GoPay E-wallet', fee: '0.7% charge', icon: '🟢' },
                    { id: 'DANA', label: 'DANA E-wallet', fee: '0.7% charge', icon: '🔵' },
                    { id: 'Bank Transfer', label: 'Bank Transfer (BCA, Mandiri)', fee: 'Rp 4,000 charge', icon: '🏦' },
                    { id: 'Virtual Account', label: 'Virtual Account (VA Transfer)', fee: 'No charges', icon: '💳' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer select-none ${
                        paymentMethod === method.id
                          ? 'border-rose-400 bg-rose-50/50 shadow-inner'
                          : 'border-stone-200/80 bg-white hover:bg-rose-50/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs text-stone-800">
                        <span className="text-base">{method.icon}</span>
                        <div>
                          <p className="font-bold">{method.label}</p>
                          <p className="text-[9px] text-[#FF4D6D]/95 font-medium">{method.fee}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="pay_method"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id as any)}
                        className="w-4 h-4 accent-rose-500 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>

                <div className="p-3 bg-stone-50 border border-dashed border-stone-200/80 rounded-2xl flex items-center justify-between text-xs font-semibold text-stone-700 mb-5">
                  <span>Grand Total:</span>
                  <span className="text-base text-rose-600 font-extrabold">{selectedPlan.price}</span>
                </div>

                <button
                  onClick={handlePayNow}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md transition active:scale-98"
                >
                  Generate {paymentMethod} Payment code via Gateway
                </button>
              </div>
            )}

            {checkoutState === 'processing' && (
              <div className="text-center py-10">
                <span className="text-4xl animate-spin block w-fit mx-auto mb-4">🌷</span>
                <h4 className="font-bold text-stone-800 text-base">Re-routing via Gateways...</h4>
                <p className="text-xs text-stone-400 mt-1">Connecting securely to Midtrans/Xendit secure portals</p>
              </div>
            )}

            {/* Waiting Payment State */}
            {checkoutState === 'waiting_payment' && (
              <div className="text-center py-2">
                <span className="text-xxs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 uppercase tracking-widest block w-fit mx-auto mb-3">
                  Waiting for Transfer
                </span>
                
                <h3 className="text-lg font-serif italic font-bold text-stone-800 mb-1">We're Ready for Your Seed!</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mb-4">
                  Please scan the QRIS payload or forward your Virtual Account payments to unlock {selectedPlan.name} instant access:
                </p>

                {paymentMethod === 'QRIS' ? (
                  <div className="p-4 bg-white border border-rose-100 rounded-3xl w-fit mx-auto mb-4 shadow-inner">
                    {/* Fake high-contrast QR illustration */}
                    <div className="w-32 h-32 bg-stone-900 rounded-lg p-2 flex flex-col justify-between mx-auto">
                      <div className="flex justify-between">
                        <div className="w-6 h-6 bg-white border-4 border-stone-900 rounded" />
                        <div className="w-6 h-6 bg-white border-4 border-stone-900 rounded" />
                      </div>
                      <span className="text-[10px] text-white font-mono tracking-widest text-center font-extrabold">QRIS PAY</span>
                      <div className="flex justify-between">
                        <div className="w-6 h-6 bg-white border-4 border-stone-900 rounded" />
                        <div className="w-6 h-6 bg-white border-4 border-stone-900 rounded" />
                      </div>
                    </div>
                    <p className="text-[10px] font-mono font-extrabold text-[#4A4A4A] tracking-wider mt-2 bg-rose-50/50 py-1 rounded">{checkoutCode}</p>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-50/30 border border-dashed border-rose-200 rounded-2xl text-[#2D2A32] mb-4">
                    <p className="text-xxs text-rose-500 font-bold uppercase tracking-wide">VIRTUAL ACCOUNT INVOICE CODE</p>
                    <p className="text-lg font-mono font-bold text-stone-800 tracking-wider my-1">{checkoutCode}</p>
                    <p className="text-[10px] text-stone-505">Transfer exact invoice total: <strong className="text-rose-600">{selectedPlan.price}</strong></p>
                  </div>
                )}

                {/* Simulated Mascot Notice */}
                <div className="bg-amber-50/40 border border-amber-100 p-3 rounded-2xl text-left text-[11px] text-stone-600 flex gap-2 items-start mb-5">
                  <span className="text-sm shrink-0">🌷</span>
                  <p>
                    <strong>Bloomy's Hint:</strong> QR Code has generated a secure, simulated portal. Clinching the button below registers automatic activation!
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutState('idle')}
                    className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-xl text-xs transition"
                  >
                    Change Method
                  </button>
                  <button
                    onClick={simulateSuccessPayment}
                    className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    Simulate Payment Success 🌸
                  </button>
                </div>
              </div>
            )}

            {/* Checkout Failed State */}
            {checkoutState === 'failed' && (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">🥀</div>
                <h3 className="text-lg font-serif italic font-bold text-rose-950 mb-1 leading-tight">Payment Generation Failed</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mb-5 leading-relaxed">
                  Oh dear, Xendit/Midtrans simulated gateway returned an unexpected response code. Let's ask Bloomy 🌷 to restart the signal!
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutState('idle')}
                    className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-xs rounded-xl transition"
                  >
                    Back to Checkout
                  </button>
                  <button
                    onClick={handlePayNow}
                    className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-650 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition"
                  >
                    Retry Signals
                  </button>
                </div>
              </div>
            )}

            {/* Payment Success Page / Premium Activated State */}
            {checkoutState === 'success' && (
              <div className="text-center py-6">
                <div className="text-6xl animate-bounce mb-3">🌷💖</div>
                <h3 className="text-xl font-serif italic font-bold text-[#FF4D6D] mb-1">LoveBloom Premium Activated!</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4 leading-relaxed">
                  Congratulations! We have planted your memory seeds successfully. Endless scrapbooking collage space, mobile Lockscreen exports, and VIP custom themes are now fully unlocked!
                </p>

                <div className="p-3.5 bg-green-50 rounded-2xl text-[11px] text-green-800 border border-green-100 text-left mb-5">
                  <strong className="block mb-0.5">🌸 Bloomy's Message of Devotion:</strong>
                  "Thank you for cultivating LoveBloom with us! Register your couple accounts now to start documenting every single page!"
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(null);
                    setCheckoutState('idle');
                    setActiveAuthTab('register');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Create Duo Accounts Now!
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Unified Login/Register Dialog Overlays */}
      {activeAuthTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2A32]/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md border border-rose-100 shadow-2xl relative p-5 max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveAuthTab(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-rose-50 rounded-full transition text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {activeAuthTab === 'login' ? (
              <Login
                onLoginSuccess={(prof) => {
                  setActiveAuthTab(null);
                  onLoginSuccess(prof);
                }}
                onNavigateToRegister={() => setActiveAuthTab('register')}
              />
            ) : (
              <Register
                onRegisterSuccess={(prof) => {
                  setActiveAuthTab(null);
                  onLoginSuccess(prof);
                }}
                onNavigateToLogin={() => setActiveAuthTab('login')}
              />
            )}
          </div>
        </div>
      )}

      {/* Primary Brand Footer copyright & details */}
      <footer className="border-t border-rose-100 bg-[#FFFBF7] py-12 px-4 select-none relative z-10 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌷</span>
            <span className="font-serif italic font-bold text-[#2D2A32] text-lg">LoveBloom</span>
          </div>

          <p className="text-xs text-stone-450 text-stone-500 max-w-md leading-relaxed">
            LoveBloom is an independent couple memory workspace &bull; Turn your feelings into beautiful digital memories. &copy; 2026 LoveBloom Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs font-bold text-stone-400/80">
            <a href="#" onClick={(e) => {e.preventDefault(); alert("LoveBloom's Terms and Privacy agreement are protected with end-to-end romantic encryption.");}} className="hover:text-rose-400">Terms of Use</a>
            <span>&bull;</span>
            <a href="#" onClick={(e) => {e.preventDefault(); alert("Our private databases are strictly confidential for verified romantic soulmates only.");}} className="hover:text-rose-400">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
