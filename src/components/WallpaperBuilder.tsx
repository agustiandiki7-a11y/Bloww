import React, { useState, useRef, useEffect } from 'react';
import { Palette, Download, Sparkles, Type, Smile, RefreshCw, Smartphone } from 'lucide-react';
import { WALLPAPER_BACKGROUNDS, STICKERS_POOL } from '../data';

interface WallpaperSticker {
  id: string;
  emoji: string;
  x: number; // percentage
  y: number; // percentage
}

export default function WallpaperBuilder() {
  const [selectedBgIdx, setSelectedBgIdx] = useState(0);
  const [templateType, setTemplateType] = useState<'polaroid' | 'chibi' | 'minimalist' | 'floating'>('polaroid');
  const [customText, setCustomText] = useState('Always & Forever');
  const [textScale, setTextScale] = useState(24); // px sizing
  const [stickersList, setStickersList] = useState<WallpaperSticker[]>([
    { id: 'stk-1', emoji: '🧸', x: 25, y: 70 },
    { id: 'stk-2', emoji: '💖', x: 75, y: 20 },
  ]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const activeBg = WALLPAPER_BACKGROUNDS[selectedBgIdx];

  const handleAddSticker = (emoji: string) => {
    const newStk: WallpaperSticker = {
      id: `stk-${Date.now()}`,
      emoji,
      x: 35 + Math.random() * 30,
      y: 35 + Math.random() * 30,
    };
    setStickersList([...stickersList, newStk]);
    setSelectedStickerId(newStk.id);
  };

  const clearStickers = () => {
    setStickersList([]);
    setSelectedStickerId(null);
  };

  // Drag on wallpaper stickers
  const handleStickerPointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    setSelectedStickerId(id);
  };

  const handleWorkspacePointerMove = (e: React.PointerEvent) => {
    if (!selectedStickerId || !workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    const currX = ((e.clientX - rect.left) / rect.width) * 100;
    const currY = ((e.clientY - rect.top) / rect.height) * 100;

    setStickersList(prev => prev.map(s => {
      if (s.id === selectedStickerId) {
        return {
          ...s,
          x: Math.max(5, Math.min(95, currX)),
          y: Math.max(5, Math.min(95, currY))
        };
      }
      return s;
    }));
  };

  const handlePointerUp = () => {
    // Keep sticker selected for deletions, but stop dragging relative tracking
  };

  // Main high-fidelity JPEG canvas canvas generation
  const handleDownloadWallpaper = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // HD scale size: set to 1080x1920 (Standard phone resolution)
    canvas.width = 1080;
    canvas.height = 1920;

    // 1. Draw linear gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (selectedBgIdx === 0) {
      gradient.addColorStop(0, '#fbcfe8'); // pink-200
      gradient.addColorStop(0.5, '#fee2e2'); // red-100
      gradient.addColorStop(1, '#fef3c7'); // amber-100
    } else if (selectedBgIdx === 1) {
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e1b4b');
    } else if (selectedBgIdx === 2) {
      gradient.addColorStop(0, '#dcfce7');
      gradient.addColorStop(1, '#ecfdf5');
    } else if (selectedBgIdx === 3) {
      gradient.addColorStop(0, '#f3e8ff');
      gradient.addColorStop(0.5, '#fae8ff');
      gradient.addColorStop(1, '#fee2e2');
    } else {
      gradient.addColorStop(0, '#ffedd5');
      gradient.addColorStop(1, '#fff7ed');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw template frame or vector guides
    ctx.textAlign = 'center';
    
    if (templateType === 'polaroid') {
      // White polaroid card center
      ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
      const cardW = 760;
      const cardH = 880;
      const cardX = (canvas.width - cardW) / 2;
      const cardY = 460;
      
      // Draw rounded card
      ctx.beginPath();
      ctx.roundRect?.(cardX, cardY, cardW, cardH, 24);
      ctx.fill();
      
      // Photo frame placeholder inside polaroid
      ctx.fillStyle = '#fee2e2';
      ctx.fillRect(cardX + 44, cardY + 44, cardW - 88, cardH - 180);
      
      // Draw heart on frame center
      ctx.font = '80px Arial';
      ctx.fillText('❤️', canvas.width / 2, cardY + cardH / 2 - 40);

      // Cute couple label inside polaroid base
      ctx.fillStyle = '#be185d'; // pink-700
      ctx.font = 'bold 36px Times New Roman, Georgia, serif';
      ctx.fillText('Our Polaroid Snapshot', canvas.width / 2, cardY + cardH - 68);
    } else if (templateType === 'chibi') {
      // Big hearts circles
      ctx.font = '220px Arial';
      ctx.fillText('🧸', canvas.width / 2 - 160, canvas.height / 2 - 40);
      ctx.fillText('🐱', canvas.width / 2 + 160, canvas.height / 2 - 40);
      
      ctx.font = '110px Arial';
      ctx.fillText('💖', canvas.width / 2, canvas.height / 2 - 120);
    } else if (templateType === 'floating') {
      // Stars scattered around corners
      ctx.fillStyle = activeBg.textLight ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)';
      ctx.font = '50px Arial';
      for (let i = 0; i < 15; i++) {
        ctx.fillText('✨', ((i * 123) % canvas.width), ((i * 245) % canvas.height));
      }
    }

    // 3. Draw custom romantic letterings text
    ctx.fillStyle = activeBg.textLight ? '#ffffff' : '#be185d';
    // font size multiplier proportional to 1080 width vs viewport 340 width
    const canvasFontSize = (textScale / 340) * 1080;
    ctx.font = `italic bold ${canvasFontSize}px Georgia, serif, sans-serif`;
    ctx.fillText(customText, canvas.width / 2, canvas.height / 2 + 500);

    // 4. Draw overlay couple stickers
    ctx.font = '90px Arial';
    stickersList.forEach(s => {
      const pxX = (s.x / 100) * canvas.width;
      const pxY = (s.y / 100) * canvas.height;
      ctx.fillText(s.emoji, pxX, pxY);
    });

    // 5. Trigger download anchor link
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'amour-sweetheart-wallpaper.png';
    link.href = dataUrl;
    link.click();
  };

  const removeSelectedSticker = () => {
    if (!selectedStickerId) return;
    setStickersList(prev => prev.filter(s => s.id !== selectedStickerId));
    setSelectedStickerId(null);
  };

  return (
    <div id="wallpaper-builder-tab" className="space-y-6 max-w-5xl mx-auto pb-10">
      
      {/* Hidden high quality draw canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Header */}
      <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
            <Smartphone className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-800">Couple HD Wallpaper Creator</h2>
            <p className="text-xs text-stone-500 font-medium">Bespoke telephone designs rendered directly to your device gallery</p>
          </div>
        </div>

        <button
          onClick={handleDownloadWallpaper}
          className="py-2.5 px-5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 text-white font-extrabold rounded-2xl shadow-lg border-b-2 border-pink-700/20 active:scale-95 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Save HD Lockscreen (PNG)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Custom controllers */}
        <div className="md:col-span-5 space-y-5">
          
          {/* Gradients selector */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm">
            <h3 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-indigo-400" />
              <span>Background Gradients</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {WALLPAPER_BACKGROUNDS.map((bg, idx) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBgIdx(idx)}
                  className={`p-2.5 rounded-xl border flex flex-col text-left transition relative cursor-pointer font-sans text-xxs font-bold ${
                    selectedBgIdx === idx
                      ? 'border-indigo-500 bg-white shadow-sm'
                      : 'border-stone-150 bg-white hover:bg-stone-50'
                  }`}
                >
                  <span className="w-full h-4 rounded-md border mb-1.5 block" style={{ background: bg.style }} />
                  <span className="text-stone-700 font-bold truncate max-w-full">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Templates selectors */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm">
            <h3 className="text-sm font-bold text-stone-800 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Choose Layout Templates</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'polaroid', label: 'Centered Polaroid Frame', desc: 'A custom nostalgic picture frame' },
                { id: 'chibi', label: 'Dual Mascot Chibis', desc: 'Cute couple animals' },
                { id: 'minimalist', label: 'Sleek Elegant Typography', desc: 'Simple words emphasis' },
                { id: 'floating', label: 'Magic Floating Dust', desc: 'Denser sparkles background' }
              ].map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setTemplateType(tmpl.id as any)}
                  className={`p-3 rounded-xl border flex flex-col justify-between text-left transition cursor-pointer select-none ${
                    templateType === tmpl.id
                      ? 'border-pink-500 bg-pink-50 text-pink-800'
                      : 'border-stone-150 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="font-bold text-xs leading-tight block">{tmpl.label}</span>
                  <span className="text-[9px] text-stone-400 font-semibold mt-1 leading-normal block">{tmpl.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slogans custom label */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-pink-400" />
              <span>Letterings Configuration</span>
            </h3>

            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1">Our Cozy Quote</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={40}
                className="w-full px-3 py-2 bg-white/95 border border-stone-200 rounded-xl text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs"
              />
            </div>

            <div>
              <div className="flex justify-between items-center pl-1 mb-1">
                <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest text-left">Text Font size</label>
                <span className="text-xxs font-mono text-stone-500 font-bold">{textScale} px</span>
              </div>
              <input
                type="range"
                min={12}
                max={42}
                value={textScale}
                onChange={(e) => setTextScale(Number(e.target.value))}
                className="w-full accent-pink-500 h-2 bg-stone-100 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Emoji additions */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span>Wallpaper Accent Stickers</span>
              </h3>
              <button
                type="button"
                onClick={clearStickers}
                className="text-xxs text-red-500 font-bold hover:underline"
              >
                Clear Stickers
              </button>
            </div>
            
            <div className="grid grid-cols-6 gap-1 bg-white/70 border rounded-xl p-2 max-h-32 overflow-y-auto">
              {STICKERS_POOL.map((stk) => (
                <button
                  key={stk}
                  onClick={() => handleAddSticker(stk)}
                  className="text-xl p-1 hover:bg-pink-100 rounded-lg transition hover:scale-[1.15] text-center cursor-pointer select-none leading-none"
                >
                  {stk}
                </button>
              ))}
            </div>

            {selectedStickerId && (
              <div className="flex justify-between items-center bg-red-50 border border-red-100 text-red-705 p-2 rounded-xl text-xs font-semibold animate-pulse mt-2.5">
                <span>Sticker selected: ready to move</span>
                <button
                  onClick={removeSelectedSticker}
                  className="px-2 py-0.5 bg-red-650 text-white rounded text-xxs hover:bg-red-700"
                >
                  Delete Sticker
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Virtual phone mockup preview */}
        <div className="md:col-span-7 flex justify-center">
          <div className="w-[300px] h-[580px] bg-stone-900 rounded-[38px] p-2.5 shadow-2xl relative select-none border border-stone-850">
            {/* Camera speaker notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <div className="w-12 h-1 bg-neutral-900 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            </div>

            {/* Inner Phone Screen */}
            <div
              ref={workspaceRef}
              onPointerMove={handleWorkspacePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full h-full rounded-[28px] overflow-hidden relative select-none cursor-pointer flex flex-col justify-between p-6"
              style={{ background: activeBg.style }}
            >
              
              {/* Phone Status bar */}
              <div className={`flex justify-between text-[10px] font-bold z-30 leading-none ${activeBg.textLight ? 'text-white/80' : 'text-stone-800/80'}`}>
                <span>09:26</span>
                <div className="flex items-center gap-1 text-[8px] font-bold">
                  <span>5G</span>
                  <span>🔋 100%</span>
                </div>
              </div>

              {/* Template specifics rendered in style */}
              <div className="flex-grow flex items-center justify-center relative w-full pt-10">
                
                {/* Template graphics inside preview phone */}
                {templateType === 'polaroid' && (
                  <div className="bg-white/90 p-2.5 pb-4 border shadow-md border-stone-150/40 w-44 rounded-xl relative select-none flex flex-col z-10 pointer-events-none">
                    <div className="w-full aspect-square bg-pink-100 rounded-lg flex items-center justify-center relative shadow-inner overflow-hidden">
                      <span className="text-3xl animate-bounce">❤️</span>
                    </div>
                    {/* Caption */}
                    <span className="text-[8px] font-bold text-pink-700 italic block text-center mt-2 font-serif">
                      Polaroid Photo Frame
                    </span>
                  </div>
                )}

                {templateType === 'chibi' && (
                  <div className="flex items-center gap-2 text-4xl select-none animate-pulse pointer-events-none z-10">
                    <span>🧸</span>
                    <span className="text-xl">❤️</span>
                    <span>🐱</span>
                  </div>
                )}

                {templateType === 'floating' && (
                  <div className="absolute inset-0 select-none opacity-20 text-xs flex flex-wrap gap-4 p-4 pointer-events-none z-0">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className="animate-pulse">✨</span>
                    ))}
                  </div>
                )}

                {/* Draw floating user stickers */}
                {stickersList.map((s) => {
                  const isSelected = selectedStickerId === s.id;
                  return (
                    <span
                      key={s.id}
                      onPointerDown={(e) => handleStickerPointerDown(e, s.id)}
                      className={`absolute text-2xl select-none cursor-move transition-transform active:scale-125 hover:scale-110 z-20 hover:ring-1 hover:ring-pink-300 rounded p-0.5 ${
                        isSelected ? 'ring-2 ring-pink-500 scale-110' : ''
                      }`}
                      style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        transform: 'translate(-50%, -50%)',
                        touchAction: 'none'
                      }}
                    >
                      {s.emoji}
                    </span>
                  );
                })}
              </div>

              {/* Bottom centered words custom slogan */}
              <div className="z-10 text-center pb-8">
                <p
                  className={`font-serif italic font-bold tracking-wide select-none drop-shadow-sm truncate leading-tight`}
                  style={{
                    color: activeBg.textLight ? '#ffffff' : '#be185d',
                    fontSize: `${textScale}px`,
                  }}
                  title={customText}
                >
                  {customText || 'Always & Forever'}
                </p>
                <span className={`text-[8px] font-sans tracking-widest block font-bold uppercase mt-1 leading-none ${activeBg.textLight ? 'text-white/50' : 'text-stone-500'}`}>
                  Slide coordinates to change size
                </span>
              </div>

              {/* Home swipe indicator notch bar */}
              <div className={`w-20 h-1 rounded-full mx-auto z-25 absolute bottom-1.5 left-1/2 -translate-x-1/2 ${activeBg.textLight ? 'bg-white/40' : 'bg-stone-500/30'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
