import { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

const LOADING_MESSAGES = [
  "Preparing flowers 🌷",
  "Collecting sweet memories 💕",
  "Wrapping surprise gifts 🎁",
  "Adding romantic magic ✨"
];

export default function Splash({ onComplete }: SplashProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 650);

    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      id="splash-screen"
      style={{
        background: 'linear-gradient(135deg, #FFF6E9 0%, #FFF0F1 50%, #EFE1EC 100%)',
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-4 overflow-hidden animate-fade-in select-none"
    >
      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
        .float-logo {
          animation: float-gentle 3.5s ease-in-out infinite;
        }
        .glow-ring {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative mb-6 float-logo">
        {/* Glow behind Bloomy */}
        <div className="glow-ring absolute -inset-4 bg-pink-100/70 rounded-full blur-2xl opacity-75" />
        
        <div className="relative bg-white/95 backdrop-blur-md p-6 rounded-full shadow-lg border-2 border-pink-150 flex items-center justify-center w-24 h-24">
          <span className="text-5xl select-none">🌷</span>
          <span className="absolute -top-1 -right-1 text-xl animate-pulse">✨</span>
          <span className="absolute bottom-1 right-2 text-red-500 text-xs">❤️</span>
        </div>
      </div>

      {/* Brand Typography */}
      <h1 className="font-serif italic font-bold tracking-tight text-5xl text-rose-500 mb-2">
        LoveBloom
      </h1>
      <p className="font-sans text-stone-600 max-w-sm text-xs font-bold uppercase tracking-[0.22em] mb-8">
        Turn feelings into beautiful digital memories
      </p>

      {/* Mascot Dialog Area */}
      <div className="bg-white/80 border border-pink-100 px-5 py-3 rounded-2xl shadow-sm text-xs text-rose-800 font-medium max-w-xs animate-pulse flex items-center justify-center gap-2 mb-10">
        <span className="text-sm">🌷</span>
        <span>{LOADING_MESSAGES[msgIndex]}</span>
      </div>

      {/* Loading bar layout */}
      <div className="w-32 h-1 bg-pink-105 bg-pink-100 rounded-full overflow-hidden">
        <div className="h-full bg-rose-400 rounded-full animate-[loading_2.8s_linear_forwards]" style={{
          animationName: 'loading',
          width: '100%',
        }} />
        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>

      {/* Footer Independent branding context */}
      <div className="absolute bottom-6 text-stone-400 font-sans tracking-widest text-[9px] uppercase font-bold">
        Designed with Bloomy &bull; est. 2026
      </div>
    </div>
  );
}
