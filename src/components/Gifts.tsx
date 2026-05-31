import React, { useState, useEffect } from 'react';
import { Gift, Search, Bookmark, Calendar, Send, HelpCircle, Check, Star, Trash, Bell } from 'lucide-react';
import { GifGift } from '../types';
import { PRESEEDED_GIFS } from '../data';

interface GiftsProps {
  sentGifts: GifGift[];
  setSentGifts: React.Dispatch<React.SetStateAction<GifGift[]>>;
}

export default function Gifts({ sentGifts, setSentGifts }: GiftsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  
  // Sending Modal details
  const [selectedGif, setSelectedGif] = useState<typeof PRESEEDED_GIFS[0] | null>(null);
  const [sendingMessage, setSendingMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [showGiftSuccess, setShowGiftSuccess] = useState(false);

  // Load favorite IDs
  useEffect(() => {
    const favs = localStorage.getItem('amour_favorite_gifs');
    if (favs) {
      setFavoriteIds(JSON.parse(favs));
    }
  }, []);

  const toggleFavorite = (gifId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let next: string[];
    if (favoriteIds.includes(gifId)) {
      next = favoriteIds.filter(id => id !== gifId);
    } else {
      next = [...favoriteIds, gifId];
    }
    setFavoriteIds(next);
    localStorage.setItem('amour_favorite_gifs', JSON.stringify(next));
  };

  const handleSendGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGif) return;

    const newGift: GifGift = {
      id: `gift-${Date.now()}`,
      title: selectedGif.title,
      url: selectedGif.url,
      sentBy: 'user',
      message: sendingMessage || 'Sending you a giant bundle of warm thoughts!',
      scheduledDate: isScheduled ? scheduleDate : undefined,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    const nextGifts = [newGift, ...sentGifts];
    setSentGifts(nextGifts);
    localStorage.setItem('amour_sent_gifts', JSON.stringify(nextGifts));

    setSelectedGif(null);
    setSendingMessage('');
    setScheduleDate('');
    setIsScheduled(false);

    setShowGiftSuccess(true);
    setTimeout(() => {
      setShowGiftSuccess(false);
    }, 3800);
  };

  const deleteSentGift = (giftId: string) => {
    const next = sentGifts.filter(g => g.id !== giftId);
    setSentGifts(next);
    localStorage.setItem('amour_sent_gifts', JSON.stringify(next));
  };

  // Filter logic
  const filteredGifs = PRESEEDED_GIFS.filter(gif => {
    const matchesSearch = gif.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? gif.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(PRESEEDED_GIFS.flatMap(g => g.tags)));

  return (
    <div id="gifts-tab" className="space-y-6 max-w-5xl mx-auto pb-10">
      
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
            <Gift className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-800">GIF Gift Delivery Terminal</h2>
            <p className="text-xs text-stone-500 font-medium">Float adorable hand-scheduled GIF surprises directly to your partner's logs</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl scrollbar-none max-w-full overflow-x-auto text-xxs font-bold text-stone-500 uppercase tracking-widest pl-2">
          <span>Explore TAGS:</span>
          <button
            onClick={() => setActiveTag(null)}
            className={`px-2.5 py-1 rounded-lg border text-[10px] select-none cursor-pointer transition ${
              activeTag === null ? 'bg-pink-500 text-white border-pink-600' : 'bg-white border-stone-200 text-stone-650 hover:bg-stone-50'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-2 py-1 rounded-lg border text-[10px] select-none cursor-pointer transition ${
                activeTag === tag ? 'bg-pink-500 text-white border-pink-600' : 'bg-white border-stone-200 text-stone-650 hover:bg-stone-50'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: GIF list explorer */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search romantic GIF library (e.g. hug, kiss, cat)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/80 rounded-2xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredGifs.map((gif) => {
              const isFav = favoriteIds.includes(gif.id);
              return (
                <div
                  key={gif.id}
                  onClick={() => setSelectedGif(gif)}
                  className="bg-white/80 rounded-3xl overflow-hidden border border-stone-200/60 shadow-md group hover:border-pink-300 transition-all hover:scale-[1.01] flex flex-col justify-between cursor-pointer"
                >
                  
                  {/* Aspect Wrapper containing GIF image */}
                  <div className="relative aspect-video bg-pink-50 overflow-hidden flex items-center justify-center">
                    <img
                      src={gif.url}
                      alt={gif.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Star trigger overlay */}
                    <button
                      onClick={(e) => toggleFavorite(gif.id, e)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-white/80 hover:bg-white backdrop-blur shadow-sm text-stone-500 hover:text-yellow-505 transition active:scale-90"
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-yellow-400 text-yellow-500' : 'text-stone-400'}`} />
                    </button>
                  </div>

                  {/* GIF metadata description box */}
                  <div className="p-3 text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-pink-600 block mb-0.5">
                      GIF GIFT
                    </span>
                    <h4 className="text-xs font-bold text-stone-800 line-clamp-1 truncate select-all">{gif.title}</h4>
                    
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {gif.tags.map(t => (
                        <span key={t} className="text-[9px] font-semibold text-stone-450 bg-stone-100 rounded-md px-1.5 py-0.5">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: scheduled/history/favorites and delivery boxes */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Deliveries list */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm">
            <h3 className="text-sm font-bold text-stone-800 flex items-center justify-between mb-3 pb-1 border-b">
              <span>Delivery Sent Records</span>
              <span className="text-xxs font-mono bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">{sentGifts.length} items</span>
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {sentGifts.length === 0 ? (
                <div className="text-center py-6 text-stone-400 opacity-60">
                  <span className="text-4xl block leading-none mb-1.5">🎈</span>
                  <p className="text-xxs font-bold uppercase tracking-wider">No gifts flown yet</p>
                  <p className="text-[10px] text-stone-550 mt-1 max-w-[180px] mx-auto italic">Select a lovely GIF from the explorer array and type a direct card message to send.</p>
                </div>
              ) : (
                sentGifts.map((gift) => (
                  <div key={gift.id} className="p-3 bg-white border border-stone-200/60 rounded-2xl hover:border-pink-200 transition shadow-sm relative text-left">
                    <div className="flex gap-2 items-start">
                      <div className="w-12 h-12 bg-pink-100 rounded-xl overflow-hidden shadow-inner shrink-0 border">
                        <img src={gift.url} alt={gift.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-stone-800 truncate">{gift.title}</h4>
                        {gift.scheduledDate ? (
                          <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-md font-semibold mt-1 inline-flex items-center gap-0.5">
                            <Calendar className="w-3 h-3" /> Scheduled delivery: {gift.scheduledDate}
                          </span>
                        ) : (
                          <span className="text-[9px] text-stone-400 block font-semibold leading-none mt-1">Delivered instantly on {gift.timestamp}</span>
                        )}
                        <p className="text-[10.5px] italic text-stone-500 mt-1.5 leading-snug font-medium">"{gift.message}"</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteSentGift(gift.id)}
                      className="absolute top-2 right-2 p-1 hover:bg-stone-100 rounded-md text-stone-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick instructions widget */}
          <div className="bg-amber-50/50 border border-amber-250 rounded-2xl p-4 text-xs font-semibold text-stone-700 flex flex-col gap-2.5">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-900 border-b border-amber-200/55 pb-1">
              <span className="text-sm">💡</span>
              Scheduled Delivery Rules
            </h4>
            <p className="text-[10.5px] space-y-1 text-stone-600 leading-normal font-medium">
              You can plan surprise gifts for birthdays, dating anniversary landmarks, or romantic calendar slots. If a gift is scheduled for the future, its preview remains locked for your partner until the date triggers on their local platform clock!
            </p>
          </div>
        </div>
      </div>

      {/* Sending popup template modal */}
      {selectedGif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-stone-800">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-stone-100 shadow-2xl relative text-left">
            <h3 className="text-lg font-bold text-stone-850 flex items-center gap-2 mb-2">
              <Send className="w-4.5 h-4.5 text-pink-500 fill-pink-100 animate-pulse" />
              Flown Gift Envelope
            </h3>

            {/* Quick Preview GIF inside sending box */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-stone-150 relative mb-4">
              <img src={selectedGif.url} alt={selectedGif.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-2.5 left-2.5 bg-black/50 text-white text-[9px] font-bold py-1 px-2.5 rounded-full uppercase">
                {selectedGif.title}
              </div>
            </div>

            <form onSubmit={handleSendGift} className="space-y-4">
              <div>
                <label className="block text-xxs font-bold text-stone-450 uppercase tracking-widest mb-1 pl-1">Sweet dedication card and instructions</label>
                <textarea
                  required
                  placeholder="e.g. Thinking of your gorgeous face today and wanted to float this surprise cat hug! ❤️"
                  value={sendingMessage}
                  onChange={(e) => setSendingMessage(e.target.value)}
                  maxLength={160}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs text-stone-800 resize-none h-18 shadow-inner"
                />
              </div>

              {/* Schedule togglers */}
              <div className="p-3 bg-stone-50 border border-stone-200/70 rounded-2xl flex flex-col space-y-2.5">
                <label className="flex items-center gap-2 text-xs font-bold text-stone-700 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isScheduled}
                    onChange={(e) => setIsScheduled(e.target.checked)}
                    className="w-4 h-4 rounded text-pink-500 border-stone-300 cursor-pointer focus:ring-pink-400"
                  />
                  Schedule Surprize Delivery
                </label>

                {isScheduled && (
                  <div className="animate-fade-in">
                    <label className="block text-xxs font-semibold text-stone-400 uppercase tracking-wider mb-1 pl-1">Release Date Time:</label>
                    <input
                      type="date"
                      required
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-700"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedGif(null)}
                  className="px-4 py-2 hover:bg-stone-55 text-stone-500 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white font-extrabold rounded-xl text-xs cursor-pointer shadow-md flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isScheduled ? 'Lock Future Send' : 'Launch Balloon Gift'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gift Delivery balloon flight success screen */}
      {showGiftSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-center animate-pulse">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-stone-105 shadow-2xl relative text-stone-850">
            <span className="text-5xl block animate-bounce mb-3">🎈</span>
            <h4 className="font-bold text-stone-850 text-base">Spark Gift has flown!</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed max-w-xs mx-auto">
              We parsed your virtual card envelope, packed your animated GIF payload securely inside, and floated the signal balloon over to your companion's notifications portal instantly.
            </p>

            <button
              onClick={() => setShowGiftSuccess(false)}
              className="mt-5 w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
            >
              Fabulous!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
