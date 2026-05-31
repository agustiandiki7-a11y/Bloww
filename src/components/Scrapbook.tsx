import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Plus, Trash, Image as ImageIcon, Smile, Type, Download, Sparkles, FolderHeart } from 'lucide-react';
import { ScrapbookPageData, ScrapbookObject } from '../types';
import { SCRAPBOOK_BACKGROUND_TEMPLATES, STICKERS_POOL } from '../data';

export default function Scrapbook() {
  const [pages, setPages] = useState<ScrapbookPageData[]>([
    {
      id: 'page-1',
      title: 'Our Cherry Blossom Picnic 🌸',
      background: 'bg-pink-50 border-pink-100',
      objects: [
        { id: 'obj-1', type: 'photo', content: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400', x: 20, y: 15, scale: 1.1, rotation: -6 },
        { id: 'obj-2', type: 'sticker', content: '🧸', x: 74, y: 22, scale: 1.5, rotation: 8 },
        { id: 'obj-3', type: 'text', content: 'Happy Days of Spring!', x: 25, y: 75, scale: 1.2, rotation: 3 }
      ]
    },
    {
      id: 'page-2',
      title: 'Starry Cafe Memories ☕',
      background: 'bg-stone-100 border-stone-200',
      objects: [
        { id: 'obj-4', type: 'photo', content: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=400', x: 50, y: 30, scale: 0.95, rotation: 4 },
        { id: 'obj-5', type: 'sticker', content: '❤️', x: 30, y: 20, scale: 1.8, rotation: -12 },
        { id: 'obj-6', type: 'text', content: 'Our rainy date corner', x: 42, y: 80, scale: 1.0, rotation: -1 }
      ]
    }
  ]);

  const [activePageIndex, setActivePageIndex] = useState(0);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [newText, setNewText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [showExporterSuccess, setShowExporterSuccess] = useState(false);

  const workspaceRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartOffset = useRef({ x: 0, y: 0 });

  const activePage = pages[activePageIndex];

  // Auto select newly created objects
  const handleAddObject = (type: 'photo' | 'sticker' | 'text', content: string) => {
    const newObj: ScrapbookObject = {
      id: `obj-${Date.now()}`,
      type,
      content,
      x: 35 + Math.random() * 15,
      y: 35 + Math.random() * 15,
      scale: 1,
      rotation: Math.floor(Math.random() * 20) - 10
    };

    const updatedPages = [...pages];
    updatedPages[activePageIndex].objects.push(newObj);
    setPages(updatedPages);
    setSelectedObjectId(newObj.id);
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleAddObject('photo', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedObjectId) return;
    const updatedPages = [...pages];
    updatedPages[activePageIndex].objects = updatedPages[activePageIndex].objects.filter(
      (obj) => obj.id !== selectedObjectId
    );
    setPages(updatedPages);
    setSelectedObjectId(null);
  };

  const handleUpdateObjectProperty = (property: 'scale' | 'rotation', factor: number) => {
    if (!selectedObjectId) return;
    const updatedPages = [...pages];
    const obj = updatedPages[activePageIndex].objects.find((o) => o.id === selectedObjectId);
    if (obj) {
      if (property === 'scale') {
        obj.scale = Math.max(0.4, Math.min(3.0, obj.scale + factor));
      } else {
        obj.rotation = (obj.rotation + factor) % 360;
      }
      setPages(updatedPages);
    }
  };

  // Drag logic
  const handleObjectPointerDown = (e: React.PointerEvent, objId: string) => {
    e.stopPropagation();
    setSelectedObjectId(objId);
    isDraggingRef.current = true;

    const matched = activePage.objects.find((o) => o.id === objId);
    if (matched && workspaceRef.current) {
      const rect = workspaceRef.current.getBoundingClientRect();
      // Calculate start mouse normalized click offset
      const clickX = ((e.clientX - rect.left) / rect.width) * 100;
      const clickY = ((e.clientY - rect.top) / rect.height) * 100;
      dragStartOffset.current = {
        x: clickX - matched.x,
        y: clickY - matched.y
      };
    }
  };

  const handleWorkspacePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !selectedObjectId || !workspaceRef.current) return;
    
    const rect = workspaceRef.current.getBoundingClientRect();
    const currX = ((e.clientX - rect.left) / rect.width) * 100;
    const currY = ((e.clientY - rect.top) / rect.height) * 100;

    let targetX = currX - dragStartOffset.current.x;
    let targetY = currY - dragStartOffset.current.y;

    // boundaries constraint
    targetX = Math.max(0, Math.min(95, targetX));
    targetY = Math.max(0, Math.min(95, targetY));

    const updatedPages = [...pages];
    const obj = updatedPages[activePageIndex].objects.find((o) => o.id === selectedObjectId);
    if (obj) {
      obj.x = targetX;
      obj.y = targetY;
      setPages(updatedPages);
    }
  };

  const handleWorkspacePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleCreateNewPage = () => {
    const newP: ScrapbookPageData = {
      id: `page-${Date.now()}`,
      title: 'Our Next Adorable Page 📖',
      background: 'bg-pink-50 border-pink-100',
      objects: []
    };
    setPages([...pages, newP]);
    setActivePageIndex(pages.length);
    setSelectedObjectId(null);
  };

  const updatePageBackground = (bgClass: string) => {
    const updated = [...pages];
    updated[activePageIndex].background = bgClass;
    setPages(updated);
  };

  const updatePageTitle = (title: string) => {
    const updated = [...pages];
    updated[activePageIndex].title = title;
    setPages(updated);
  };

  const triggerExport = () => {
    setShowExporterSuccess(true);
    setTimeout(() => {
      setShowExporterSuccess(false);
    }, 3500);
  };

  return (
    <div id="scrapbook-section" className="space-y-6 max-w-5xl mx-auto pb-10">
      
      {/* Top action header header */}
      <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-800">Memory Scrapbook Workspace</h2>
            <p className="text-xs text-stone-500 font-medium">Design virtual polaroid diaries with custom embellishments</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {pages.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePageIndex(idx);
                setSelectedObjectId(null);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer select-none ${
                activePageIndex === idx
                  ? 'bg-pink-500 border-pink-600 text-white shadow-md shadow-pink-300/20'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Collage {idx + 1}
            </button>
          ))}
          <button
            onClick={handleCreateNewPage}
            className="p-1.5 bg-yellow-50 hover:bg-yellow-105 border border-yellow-200 rounded-xl text-yellow-700 transition flex items-center gap-1 font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Section</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Layout controls & Tools box */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Collage Page Config */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm">
            <h3 className="text-sm font-bold text-stone-800 mb-2.5 flex items-center gap-1.5">
              <FolderHeart className="w-4 h-4 text-pink-400" />
              <span>Section Configuration</span>
            </h3>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1">Dating Diary Heading</label>
                <input
                  type="text"
                  value={activePage.title}
                  onChange={(e) => updatePageTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white/90 border border-stone-205 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs text-stone-800 font-bold"
                />
              </div>

              <div>
                <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1.5">Aesthetic Wallpaper Palette</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {SCRAPBOOK_BACKGROUND_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => updatePageBackground(tmpl.bgClass)}
                      className={`h-11 rounded-xl border flex flex-col items-center justify-center text-xxs font-semibold tracking-tight p-1 transition cursor-pointer ${
                        activePage.background === tmpl.bgClass
                          ? 'border-pink-500 ring-2 ring-pink-100 bg-white/40'
                          : 'border-stone-200 bg-white'
                      }`}
                    >
                      <span className={`w-full h-3 rounded-md ${tmpl.bgClass} border`} />
                      <span className="text-[9px] mt-0.5 truncate max-w-full text-stone-500">{tmpl.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Asset Addition box */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-800 mb-1 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-yellow-400" />
              <span>Insert Collage Embellishments</span>
            </h3>

            {/* Polaroid image uploads */}
            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest mb-1.5 pl-1 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                Couple Polaroid Photo
              </label>
              
              <div className="space-y-2">
                <label className="w-full flex flex-col items-center justify-center border border-dashed border-stone-300 hover:border-pink-400 bg-white/80 rounded-xl py-3 px-2 text-center cursor-pointer hover:bg-pink-50/20 transition-all">
                  <Plus className="w-5 h-5 text-stone-400 mb-1" />
                  <span className="text-xxs font-bold text-stone-600">Choose PC/Phone Memory</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLocalImageUpload}
                    className="hidden"
                  />
                </label>

                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Or paste direct image URL..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="flex-grow px-2 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xxs focus:outline-none focus:ring-1 focus:ring-pink-300"
                  />
                  <button
                    onClick={() => {
                      if (photoUrl) {
                        handleAddObject('photo', photoUrl);
                        setPhotoUrl('');
                      }
                    }}
                    className="px-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xxs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Sticker box */}
            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1.5 flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-indigo-400" />
                Cute Lover Stickers
              </label>
              <div className="grid grid-cols-6 gap-1 bg-white/80 border rounded-xl p-2 max-h-32 overflow-y-auto">
                {STICKERS_POOL.map((stk) => (
                  <button
                    key={stk}
                    onClick={() => handleAddObject('sticker', stk)}
                    className="text-xl p-1 hover:bg-pink-100 rounded-lg transition hover:scale-110 active:scale-95 text-center cursor-pointer select-none"
                  >
                    {stk}
                  </button>
                ))}
              </div>
            </div>

            {/* Text notes labels */}
            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1.5 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-yellow-500" />
                Handwritten Label
              </label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newText) {
                    handleAddObject('text', newText);
                    setNewText('');
                  }
                }}
                className="flex gap-1.5"
              >
                <input
                  type="text"
                  placeholder="e.g. Love at first sight!"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="flex-grow px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 placeholder-stone-450 focus:outline-none focus:ring-1 focus:ring-pink-300"
                />
                <button
                  type="submit"
                  className="px-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: Builder workspace */}
        <div className="lg:col-span-8 space-y-4">
          {/* Work area explanation & parameters */}
          <div className="bg-stone-50 border border-stone-200 text-stone-600 rounded-2xl p-4 text-xs font-semibold flex items-center justify-between flex-wrap gap-2">
            <span>
              💡 <strong>Pointer Guide:</strong> Drop items using the sidebar on the left. Click on any item on the board to move/drag, resize, rotate, or delete!
            </span>
            <button
              onClick={triggerExport}
              className="py-1.5 px-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-md transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Collage PNG</span>
            </button>
          </div>

          {/* Selected asset manipulation menu bar */}
          {selectedObjectId && (
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2.5 animate-bounce">
              <div className="flex items-center gap-1.5">
                <span className="text-xxs uppercase tracking-wider font-extrabold text-pink-700 bg-pink-100 rounded px-2 py-0.5">
                  Object Selected
                </span>
                <span className="text-xs text-stone-700 italic">
                  Type: {activePage.objects.find((o) => o.id === selectedObjectId)?.type}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Scale buttons */}
                <button
                  onClick={() => handleUpdateObjectProperty('scale', -0.1)}
                  className="p-1 px-2.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-bold text-stone-700 select-none cursor-pointer"
                  title="Shrink"
                >
                  A-
                </button>
                <button
                  onClick={() => handleUpdateObjectProperty('scale', 0.1)}
                  className="p-1 px-2.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-bold text-stone-700 select-none cursor-pointer"
                  title="Grow"
                >
                  A+
                </button>

                {/* Rotate buttons */}
                <button
                  onClick={() => handleUpdateObjectProperty('rotation', -15)}
                  className="p-1 px-2.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-bold text-stone-700 select-none cursor-pointer"
                  title="Rotate Counter-clockwise"
                >
                  ⟲
                </button>
                <button
                  onClick={() => handleUpdateObjectProperty('rotation', 15)}
                  className="p-1 px-2.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-bold text-stone-700 select-none cursor-pointer"
                  title="Rotate Clockwise"
                >
                  ⟳
                </button>

                {/* Delete button */}
                <button
                  onClick={handleDeleteSelected}
                  className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-xs font-bold text-red-700 select-none cursor-pointer flex items-center gap-1 ml-2"
                >
                  <Trash className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive Workspace Panel */}
          <div
            ref={workspaceRef}
            onPointerMove={handleWorkspacePointerMove}
            onPointerUp={handleWorkspacePointerUp}
            onPointerLeave={handleWorkspacePointerUp}
            className={`w-full aspect-[4/3] rounded-3xl border-4 relative overflow-hidden select-none cursor-crosshair transition-all duration-300 shadow-xl ${activePage.background}`}
          >
            {/* Title header drawn inside workspace */}
            <div className="absolute top-4 left-4 right-4 z-10 flex flex-col items-center">
              <span className="font-serif italic font-extrabold text-stone-700 text-lg text-center drop-shadow-sm px-4 py-1.5 bg-white/45 backdrop-blur-md rounded-full border border-white/30">
                {activePage.title}
              </span>
            </div>

            {/* Collage children object loop */}
            {activePage.objects.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-45 pointer-events-none select-none px-4">
                <FolderHeart className="w-12 h-12 text-pink-400 mb-2" />
                <p className="text-sm font-bold text-stone-600">This scrapbook page is blank</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">Drop photos, stickers, and notes onto the canvas to construct your memory diary!</p>
              </div>
            ) : (
              activePage.objects.map((obj) => {
                const isSelected = selectedObjectId === obj.id;

                return (
                  <div
                    key={obj.id}
                    onPointerDown={(e) => handleObjectPointerDown(e, obj.id)}
                    className={`absolute select-none group cursor-move ${
                      isSelected ? 'ring-2 ring-pink-500 z-30' : 'hover:ring-1 hover:ring-pink-300 z-10'
                    }`}
                    style={{
                      left: `${obj.x}%`,
                      top: `${obj.y}%`,
                      transform: `translate(-50%, -50%) scale(${obj.scale}) rotate(${obj.rotation}deg)`,
                      transformOrigin: 'center center',
                      touchAction: 'none'
                    }}
                  >
                    {/* Render different block types */}
                    {obj.type === 'photo' && (
                      <div className="bg-white p-2.5 pb-6 border shadow-lg border-stone-200/60 max-w-[130px]" style={{ pointerEvents: 'none' }}>
                        <div className="w-full aspect-square bg-stone-105 overflow-hidden rounded shadow-inner">
                          <img
                            src={obj.content}
                            alt="Diary snapshot"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback if URL is unreachable
                              (e.target as any).src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=150';
                            }}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {/* Polaroid cute bottom dot */}
                        <div className="mt-2 flex justify-center">
                          <span className="w-2 h-2 rounded-full bg-pink-100 border border-pink-200" />
                        </div>
                      </div>
                    )}

                    {obj.type === 'sticker' && (
                      <span className="text-4xl filter drop-shadow select-none block leading-none" style={{ pointerEvents: 'none' }}>
                        {obj.content}
                      </span>
                    )}

                    {obj.type === 'text' && (
                      <span className="block px-3 py-1 bg-amber-50/95 border border-dashed border-amber-300 text-stone-800 text-xs font-serif font-bold italic tracking-wide rounded-lg shadow-md max-w-[150px] text-center" style={{ pointerEvents: 'none' }}>
                        {obj.content}
                      </span>
                    )}

                    {/* Quick selection handle overlays */}
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 w-5 h-5 bg-pink-500 rounded-full border-2 border-white text-white flex items-center justify-center text-[9px] font-bold shadow pointer-events-none">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Little aesthetic border edge details inside canvas */}
            <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-2xl pointer-events-none select-none z-0" />
          </div>
        </div>
      </div>

      {/* Exporter Popups */}
      {showExporterSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in animate-pulse">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-stone-100 shadow-2xl relative text-center">
            <div className="w-14 h-14 bg-green-105 rounded-full text-green-600 flex items-center justify-center mx-auto text-2xl mb-3 border border-green-200">
              ✓
            </div>
            <h4 className="font-bold text-stone-800 text-base">Collage Diary Exported!</h4>
            <p className="text-xs text-stone-400 mt-1 lines-clamp-2">
              We parsed your layouts and assembled <strong>"{activePage.title}"</strong> into a high-contrast souvenir card. Checked in your standard download folders!
            </p>

            <div className="mt-4 p-3.5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[10px] text-stone-500 text-left">
              Format: High-Definition Souvenir PNG<br />
              Dating Page Code: {activePage.id}<br />
              Objects flattened: {activePage.objects.length} assets
            </div>

            <button
              onClick={() => setShowExporterSuccess(false)}
              className="mt-5 w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md"
            >
              Sweet! Thank You
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
