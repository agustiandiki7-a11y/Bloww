import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Sliders, Check, Trash, Eye, Save } from 'lucide-react';
import { FlowerType } from '../types';
import { FLOWERS_POOL, WRAPPINGS, RIBBONS } from '../data';

interface SavedBouquet {
  id: string;
  flowers: { [key: string]: number };
  wrappingId: string;
  ribbonId: string;
  cardMessage: string;
  timestamp: string;
}

export default function BouquetBuilder() {
  const [selectedFlowers, setSelectedFlowers] = useState<{ [key: string]: number }>({
    'f1': 3, // Red roses initially
    'f2': 2, // Peach tulips initially
  });
  const [wrappingId, setWrappingId] = useState('w1');
  const [ribbonId, setRibbonId] = useState('r2');
  const [cardMessage, setCardMessage] = useState('To my honey, the sweetest blossom of my life. 🌸');
  const [savedBouquets, setSavedBouquets] = useState<SavedBouquet[]>([]);
  const [showBouquetSuccess, setShowBouquetSuccess] = useState(false);

  // Load bouquet history
  useEffect(() => {
    const historical = localStorage.getItem('amour_saved_bouquets');
    if (historical) {
      setSavedBouquets(JSON.parse(historical));
    }
  }, []);

  const changeFlowerCount = (flowerId: string, increment: number) => {
    setSelectedFlowers((prev) => {
      const current = prev[flowerId] || 0;
      const target = Math.max(0, Math.min(12, current + increment));
      const next = { ...prev };
      if (target === 0) {
        delete next[flowerId];
      } else {
        next[flowerId] = target;
      }
      return next;
    });
  };

  const getActiveWrapping = () => WRAPPINGS.find((w) => w.id === wrappingId) || WRAPPINGS[0];
  const getActiveRibbon = () => RIBBONS.find((r) => r.id === ribbonId) || RIBBONS[0];

  const totalFlowersCount = (Object.values(selectedFlowers) as number[]).reduce((a: number, b: number) => a + b, 0);

  const handleSaveBouquet = () => {
    if (totalFlowersCount === 0) return;
    
    const newBouquet: SavedBouquet = {
      id: `bq-${Date.now()}`,
      flowers: { ...selectedFlowers },
      wrappingId,
      ribbonId,
      cardMessage,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    const nextList = [newBouquet, ...savedBouquets];
    setSavedBouquets(nextList);
    localStorage.setItem('amour_saved_bouquets', JSON.stringify(nextList));
    
    setShowBouquetSuccess(true);
    setTimeout(() => {
      setShowBouquetSuccess(false);
    }, 3800);
  };

  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextList = savedBouquets.filter((bq) => bq.id !== id);
    setSavedBouquets(nextList);
    localStorage.setItem('amour_saved_bouquets', JSON.stringify(nextList));
  };

  const handleLoadSaved = (bq: SavedBouquet) => {
    setSelectedFlowers(bq.flowers);
    setWrappingId(bq.wrappingId);
    setRibbonId(bq.ribbonId);
    setCardMessage(bq.cardMessage);
  };

  return (
    <div id="bouquet-builder-tab" className="space-y-6 max-w-5xl mx-auto pb-10">
      
      {/* Top Banner header */}
      <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl animate-pulse">
            <span>💐</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-800">Flower Bouquet Constructor</h2>
            <p className="text-xs text-stone-500 font-medium">Combine fresh roses, sunflowers, & tulips tied in sweet velvet bows</p>
          </div>
        </div>

        <button
          onClick={handleSaveBouquet}
          disabled={totalFlowersCount === 0}
          className="py-2.5 px-5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 text-white font-extrabold rounded-2xl shadow-lg border-b-2 border-pink-700/20 disabled:opacity-40 select-none cursor-pointer text-xs flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Bouquet Box</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Arrangement configuration panel */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Flower Species counter */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm">
            <h3 className="text-sm font-bold text-stone-800 mb-3.5 flex items-center gap-1.5">
              <span>Fresh Flower Species</span>
              <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">Total: {totalFlowersCount}</span>
            </h3>

            <div className="space-y-2.5">
              {FLOWERS_POOL.map((flw) => {
                const count = selectedFlowers[flw.id] || 0;
                return (
                  <div key={flw.id} className="p-3 bg-white/90 rounded-2xl border border-stone-200/60 flex items-center justify-between gap-3 shadow-inner hover:border-pink-200 transition">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl leading-none">{flw.emoji}</span>
                      <div className="text-left leading-tight">
                        <strong className="text-xs font-extrabold text-stone-800 block">{flw.name}</strong>
                        <span className="text-[10px] text-stone-450 italic font-semibold">{flw.meaning}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeFlowerCount(flw.id, -1)}
                        className="w-[44px] h-[44px] bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-xl flex items-center justify-center text-base cursor-pointer transition select-none"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-mono text-stone-800">
                        {count}
                      </span>
                      <button
                        onClick={() => changeFlowerCount(flw.id, 1)}
                        className="w-[44px] h-[44px] bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold rounded-xl flex items-center justify-center text-base cursor-pointer transition select-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Paper and Bows section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm space-y-4">
            {/* Wraps */}
            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-1 mb-2">Paper Wrapping Motif</h4>
              <div className="grid grid-cols-4 gap-1.5">
                {WRAPPINGS.map((wr) => (
                  <button
                    key={wr.id}
                    onClick={() => setWrappingId(wr.id)}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center text-xxs font-bold text-stone-700 transition cursor-pointer select-none ${
                      wrappingId === wr.id
                        ? 'border-pink-500 bg-pink-50 shadow-sm'
                        : 'border-stone-150 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-lg leading-none">{wr.preview}</span>
                    <span className="text-[9px] text-stone-500 leading-none mt-1 text-center truncate w-full">{wr.name.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bows */}
            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-1 mb-2">Velvet Ribbon Bow Knot</h4>
              <div className="grid grid-cols-4 gap-1.5">
                {RIBBONS.map((rb) => (
                  <button
                    key={rb.id}
                    onClick={() => setRibbonId(rb.id)}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center text-xxs font-bold text-stone-700 transition cursor-pointer select-none ${
                        ribbonId === rb.id
                        ? 'border-pink-500 bg-pink-50 shadow-sm'
                        : 'border-stone-150 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-lg leading-none">{rb.emoji}</span>
                    <span className="text-[9px] text-stone-500 leading-none mt-1 text-center truncate w-full">{rb.name.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom love letter message to attach */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-1 mb-2">Mini Gift Card Message</h4>
            <textarea
              value={cardMessage}
              onChange={(e) => setCardMessage(e.target.value)}
              placeholder="Write a sweet dedications..."
              maxLength={120}
              rows={3}
              className="w-full px-3 py-2 bg-white/90 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs text-stone-700 resize-none shadow-inner"
            />
            <span className="text-[9px] text-stone-400 font-bold block text-right mt-1">
              Characters remaining: {120 - cardMessage.length}
            </span>
          </div>

        </div>

        {/* Right Side: Virtual Bouquet Render and History Box */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Bouquet Render Wrapper */}
          <div className="bg-gradient-to-tr from-amber-50 to-orange-105 rounded-3xl p-8 border border-white/50 shadow-xl relative min-h-[420px] flex flex-col items-center justify-end overflow-hidden select-none">
            
            {/* Dynamic floating sparkles in backdrop */}
            <div className="absolute top-6 left-6 text-2xl animate-pulse text-yellow-300">✨</div>
            <div className="absolute top-12 right-12 text-xl animate-bounce text-yellow-400 delay-500">✨</div>
            <div className="absolute bottom-1/3 left-10 text-2xl animate-bounce text-pink-300 delay-1000">🌸</div>

            {/* Bouquet construction preview */}
            <div className="flex-grow flex flex-col items-center justify-center w-full min-h-[220px] relative mt-10">
              
              {totalFlowersCount === 0 ? (
                <div className="text-center opacity-45 pointer-events-none p-6">
                  <span className="text-5xl block animate-bounce">🏺</span>
                  <p className="text-xs font-bold text-stone-605 mt-2">Vase is empty</p>
                  <p className="text-[10px] text-stone-500 italic mt-0.5">Click flower quantities on the left side to arrange floral structures!</p>
                </div>
              ) : (
                <div className="relative flex flex-col items-center justify-center">
                  
                  {/* Outer flower bundle structure container */}
                  <div className="grid grid-cols-4 gap-2 px-6 max-w-xs z-10 animate-fade-in relative">
                    {Object.entries(selectedFlowers).map(([fKey, count]) => {
                      const flInfo = FLOWERS_POOL.find((f) => f.id === fKey);
                      if (!flInfo) return null;
                      const countNum = Number(count) || 0;
                      return Array.from({ length: countNum }).map((_, instanceIdx) => (
                        <div
                          key={`${fKey}-${instanceIdx}`}
                          className="text-4xl text-center select-none block hover:scale-125 transition-transform cursor-pointer filter drop-shadow animate-pulse"
                          title={flInfo.name}
                          style={{
                            transform: `rotate(${((instanceIdx * 23 + 12) % 40) - 20}deg) scale(${0.9 + (instanceIdx % 3) * 0.1})`,
                            animationDelay: `${instanceIdx * 150}ms`
                          }}
                        >
                          {flInfo.emoji}
                        </div>
                      ));
                    })}
                  </div>

                  {/* Wrapper cover wrapping sheet */}
                  <div
                    className={`mt-4 w-44 h-24 rounded-b-[60px] rounded-t-[20px] flex items-center justify-center border-2 border-dashed relative z-20 shadow-md ${getActiveWrapping().pattern}`}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/80 border border-stone-200/60 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase shadow-sm tracking-wider">
                      {getActiveWrapping().name.split(' ')[1]} Pack
                    </div>

                    {/* Tied Bow Ribbon element */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
                      <span className="text-3.5xl select-none block leading-none filter drop-shadow-md animate-bounce">
                        {getActiveRibbon().emoji}
                      </span>
                      <span className="text-[8px] font-extrabold text-stone-900 bg-white px-2 py-0.5 rounded-md border text-center shadow-sm uppercase tracking-wide">
                        {getActiveRibbon().name.split(' ')[0]} Bow
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Attached love gift card rendering */}
            {totalFlowersCount > 0 && (
              <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-stone-200 mt-6 z-25 shadow-lg relative max-w-sm">
                {/* Vintage ribbon clip */}
                <div className="absolute -top-2 left-4 w-5 h-4 bg-orange-200 rounded border border-orange-300" />
                
                <h4 className="text-[9px] font-bold text-stone-400 uppercase tracking-widest pl-1">Mini Greetings Envelope:</h4>
                <p className="font-serif italic text-stone-700 text-xs mt-1 text-center font-medium leading-relaxed">
                  "{cardMessage || 'Happy Valentine'}"
                </p>
                <span className="block text-[8px] font-bold text-stone-400 uppercase text-right mt-1.5 select-none font-sans">
                  &mdash; Sealed on Our Orbit Space
                </span>
              </div>
            )}
          </div>

          {/* Historical Saved Bouquets List */}
          {savedBouquets.length > 0 && (
            <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 pb-1 border-b">
                Arrangements Album History ({savedBouquets.length})
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                {savedBouquets.map((bq) => {
                  const bqTotal = (Object.values(bq.flowers) as number[]).reduce((a: number, b: number) => a + b, 0);
                  const bqWrap = WRAPPINGS.find(w => w.id === bq.wrappingId) || WRAPPINGS[0];
                  
                  return (
                    <div
                      key={bq.id}
                      onClick={() => handleLoadSaved(bq)}
                      className="p-3 bg-white hover:bg-stone-50 border border-stone-200/60 rounded-2xl flex items-center justify-between text-left cursor-pointer transition shadow-sm hover:border-pink-300 gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg">💐</span>
                          <strong className="text-xxs font-extrabold text-stone-800 uppercase tracking-wider block">
                            Box arrangement
                          </strong>
                        </div>
                        <span className="text-[10px] text-stone-450 block truncate italic mt-0.5 font-sans leading-none">
                          {bqTotal} blooms ({bqWrap.name.split(' ')[1]} Wrap)
                        </span>
                        <span className="text-[9px] text-stone-400 block mt-1 font-mono font-medium">{bq.timestamp}</span>
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={(e) => handleDeleteSaved(bq.id, e)}
                          className="p-1 px-1.5 bg-red-50 hover:bg-red-105 text-red-600 rounded-lg text-xxs font-bold cursor-pointer border border-red-100"
                          title="Discard Arrangement"
                        >
                          Discard
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bouquet Saved Box success modal */}
      {showBouquetSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-center animate-pulse">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-stone-105 shadow-2xl relative text-stone-800">
            <span className="text-5xl block animate-bounce mb-3">💐</span>
            <h4 className="font-bold text-stone-800 text-base">Florist arrangement complete!</h4>
            <p className="text-xs text-stone-400 lines-clamp-2 mt-1">
              We carefully assembled your lovely selection details and tucked the bouquet in its pristine cardboard presentation box box! Saved securely in your shared album history.
            </p>

            <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-xl text-left font-mono text-[9px] text-stone-500 space-y-1">
              Paper Wrap: {getActiveWrapping().name}<br />
              Tether Bow Ribbon: {getActiveRibbon().name}<br />
              Total stems count: {totalFlowersCount} fresh blooms
            </div>

            <button
              onClick={() => setShowBouquetSuccess(false)}
              className="mt-5 w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
            >
              How Lovely!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
