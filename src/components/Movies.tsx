import React, { useState, useEffect } from 'react';
import { Film, Search, Bookmark, Heart, Flame, Sparkles, Check } from 'lucide-react';
import { Movie, AppNotification } from '../types';
import { PRESEEDED_MOVIES } from '../data';

interface MoviesProps {
  notifications: AppNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<AppNotification[]>>;
}

export default function Movies({ notifications, setNotifications }: MoviesProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [movieSearch, setMovieSearch] = useState('');
  const [showToast, setShowToast] = useState<string | null>(null);

  // Load watchlist
  useEffect(() => {
    const saved = localStorage.getItem('amour_couple_watchlist');
    if (saved) {
      setWatchlistIds(JSON.parse(saved));
    }
  }, []);

  const toggleWatchlist = (movieId: string, title: string) => {
    let next: string[];
    const isAdding = !watchlistIds.includes(movieId);
    
    if (isAdding) {
      next = [...watchlistIds, movieId];
      setShowToast(`"${title}" added to evening watchlist! 🎬`);
    } else {
      next = watchlistIds.filter(id => id !== movieId);
      setShowToast(`"${title}" removed from watchlist.`);
    }
    
    setWatchlistIds(next);
    localStorage.setItem('amour_couple_watchlist', JSON.stringify(next));

    // Send a mock notification
    if (isAdding) {
      const newNotif: AppNotification = {
        id: `movie-${Date.now()}`,
        title: "Watchlist Updated",
        message: `Your partner bookmarked "${title}" for your next movie date!`,
        time: "Just now",
        read: false,
        type: 'anniversary'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    setTimeout(() => {
      setShowToast(null);
    }, 2800);
  };

  const filteredMovies = PRESEEDED_MOVIES.filter((mov) => {
    const matchesSearch = mov.title.toLowerCase().includes(movieSearch.toLowerCase()) || 
                          mov.genre.toLowerCase().includes(movieSearch.toLowerCase());
    const matchesCategory = activeCategory ? mov.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="movies-tab" className="space-y-6 max-w-5xl mx-auto pb-10">
      
      {/* Toast alert box */}
      {showToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-stone-900 border border-stone-850 text-white font-semibold text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-fade-in animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header banner */}
      <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
            <Film className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-800">Couple Movie Suggestions</h2>
            <p className="text-xs text-stone-500 font-medium">Curated romantic lists and dual bookmarks for cozy couch nights</p>
          </div>
        </div>

        <div className="flex bg-stone-100 p-1 rounded-xl gap-1 text-[10px] uppercase font-bold text-stone-500 tracking-wider">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1 rounded-lg border text-[10px] select-none cursor-pointer transition uppercase ${
              activeCategory === null
                ? 'bg-pink-500 text-white border-pink-600 shadow-sm'
                : 'bg-white border-stone-250 hover:bg-stone-50'
            }`}
          >
            All Genres
          </button>
          {[
            { id: 'classic', label: 'Vintage/Epic' },
            { id: 'anime', label: 'Anime Love' },
            { id: 'comedy', label: 'Romantic Comedy' },
            { id: 'sad-sweet', label: 'Bittersweet' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-lg border text-[10px] select-none cursor-pointer transition uppercase ${
                  activeCategory === cat.id
                  ? 'bg-pink-500 text-white border-pink-600 shadow-sm'
                  : 'bg-white border-stone-250 hover:bg-stone-50'
              }`}
            >
              {cat.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Movie Card Lists */}
        <div className="md:col-span-8 space-y-5">
          
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter movies by title keywords or category tags..."
              value={movieSearch}
              onChange={(e) => setMovieSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/80 rounded-2xl text-stone-850 focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs shadow-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredMovies.map((mov) => {
              const inWatchlist = watchlistIds.includes(mov.id);
              return (
                <div
                  key={mov.id}
                  className="bg-white/80 rounded-3xl p-5 border border-stone-200/60 shadow-md flex flex-col sm:flex-row gap-5 items-stretch relative overflow-hidden text-left hover:border-pink-300 transition duration-200 group"
                >
                  
                  {/* Decorative flower in background */}
                  <span className="absolute -bottom-3 -right-3 text-2xl opacity-10 group-hover:scale-125 transition duration-300">🌸</span>

                  {/* Thumbnail Cover mock */}
                  <div className="w-full sm:w-28 h-36 bg-gradient-to-tr from-pink-100 to-amber-100 rounded-2xl shrink-0 flex flex-col items-center justify-center border shadow-inner text-4xl select-none relative">
                    {mov.imageUrl}
                    
                    {/* Tiny watch status indicators */}
                    <span className="absolute top-1.5 left-1.5 text-[8px] bg-white border border-stone-200 px-1.5 py-0.5 rounded-md font-bold uppercase text-stone-500">
                      {mov.year}
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start select-none">
                        <div>
                          <h3 className="text-base font-extrabold text-stone-850 flex items-center gap-1.5">
                            {mov.title}
                          </h3>
                          <span className="text-[10px] text-pink-650 font-bold bg-pink-50/50 px-2 py-0.5 rounded-md border border-pink-100 mt-1 inline-block">
                            {mov.genre} &bull; Rating: {mov.rating}
                          </span>
                        </div>

                        {/* Watchlist Bookmark toggle button */}
                        <button
                          onClick={() => toggleWatchlist(mov.id, mov.title)}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            inWatchlist
                              ? 'bg-pink-100 text-pink-600 border border-pink-200 shadow-inner'
                              : 'bg-white hover:bg-stone-50 border border-stone-200 text-stone-500'
                          }`}
                          title={inWatchlist ? "Remove from List" : "Bookmark Movie"}
                        >
                          <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-pink-500 text-pink-500' : ''}`} />
                        </button>
                      </div>

                      <p className="text-[11.5px] font-medium text-stone-500 mt-2.5 leading-relaxed pr-2">
                        {mov.description}
                      </p>
                    </div>

                    {/* Recommendation Quote Quote box inside the movie card */}
                    <div className="mt-4 p-3 bg-stone-50 border border-stone-200/65 rounded-2xl flex items-center gap-2.5 shadow-inner">
                      <div className="text-xl shrink-0">💬</div>
                      <p className="text-[10.5px] italic text-stone-605 font-medium leading-relaxed font-serif">
                        "{mov.recommendationQuote}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Quick Watchlist tray */}
        <div id="watchlist-tray" className="md:col-span-4 space-y-6">
          
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm space-y-3.5">
            <h3 className="text-sm font-bold text-stone-800 flex items-center justify-between pb-1.5 border-b select-none">
              <span>Cozy Evening Watchlist</span>
              <span className="text-xxs font-mono bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full font-bold">
                {watchlistIds.length} queued
              </span>
            </h3>

            <div className="space-y-2.5">
              {watchlistIds.length === 0 ? (
                <div className="text-center py-6 text-stone-400 opacity-60">
                  <span className="text-3xl block leading-none mb-1.5">🍿</span>
                  <p className="text-xxs font-bold uppercase tracking-wider">Queue is empty</p>
                  <p className="text-[10px] text-stone-550 mt-1 max-w-[170px] mx-auto italic">Bookmark cinematic titles on the left to organize your weekend couch session schedules.</p>
                </div>
              ) : (
                watchlistIds.map((id) => {
                  const mInfo = PRESEEDED_MOVIES.find((m) => m.id === id);
                  if (!mInfo) return null;
                  return (
                    <div
                      key={id}
                      className="p-3 bg-white border border-stone-200/60 rounded-2xl flex items-center justify-between gap-2.5 shadow-sm scrollbar-none"
                    >
                      <div className="flex gap-2 items-center min-w-0">
                        <span className="text-2xl shrink-0">{mInfo.imageUrl}</span>
                        <div className="text-left min-w-0">
                          <strong className="text-xs font-bold text-stone-800 block truncate leading-none mb-1">
                            {mInfo.title}
                          </strong>
                          <span className="text-[10px] text-stone-400 block font-semibold leading-none truncate">
                            {mInfo.genre.split(' / ')[0]}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleWatchlist(id, mInfo.title)}
                        className="p-1 px-2.5 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-lg text-xxs font-bold cursor-pointer"
                        title="Remove Bookmark"
                      >
                        Check
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick advice note box */}
          <div className="bg-amber-50/50 border border-amber-250 rounded-2xl p-4 text-xs font-semibold text-stone-700 flex flex-col gap-2.5">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-900 border-b border-amber-200/55 pb-1 select-none">
              <span className="text-sm">💡</span>
              Perfect Date Recipe
            </h4>
            <p className="text-[10.5px] space-y-1 text-stone-600 leading-normal font-medium">
              Prepare butter popcorn, light cozy vanilla-scented candles, sync your audio levels with our Cassette Player soundtrack, and toggle these watchlists on dual devices simultaneously! 🍿🕯️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
