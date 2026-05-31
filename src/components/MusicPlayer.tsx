import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Search, Heart, Plus, ListMusic, Headphones } from 'lucide-react';
import { Soundtrack } from '../types';
import { PRESEEDED_SONGS } from '../data';

interface MusicPlayerProps {
  currentTrack: Soundtrack;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Soundtrack>>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  playlist: Soundtrack[];
  setPlaylist: React.Dispatch<React.SetStateAction<Soundtrack[]>>;
}

export default function MusicPlayer({
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  playlist,
  setPlaylist
}: MusicPlayerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(38); // percentage mockup
  const [volume, setVolume] = useState(80);
  const [playlistSearch, setPlaylistSearch] = useState('');
  const [spotifyEmbedUrl, setSpotifyEmbedUrl] = useState('https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGka767G'); // Default cute romantic playlist URL
  const [spotifyInput, setSpotifyInput] = useState('');

  // Cassette reel spinning simulation
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 0.3));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNextTrack = () => {
    const activeIdx = playlist.findIndex((s) => s.id === currentTrack.id);
    const nextIdx = (activeIdx + 1) % playlist.length;
    setCurrentTrack(playlist[nextIdx]);
  };

  const handlePrevTrack = () => {
    const activeIdx = playlist.findIndex((s) => s.id === currentTrack.id);
    const prevIdx = (activeIdx - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[prevIdx]);
  };

  const handleAddNewTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistSearch) return;

    const customS: Soundtrack = {
      id: `tr-${Date.now()}`,
      title: playlistSearch,
      artist: 'Partner Request 💌',
      duration: '3:10',
      albumArt: '🎵',
      category: 'romantic'
    };
    
    const updated = [...playlist, customS];
    setPlaylist(updated);
    localStorage.setItem('amour_saved_tracks', JSON.stringify(updated));
    setPlaylistSearch('');
  };

  const handleSpotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyInput) return;
    
    // Convert to embed URL format if normal link
    let embed = spotifyInput;
    if (spotifyInput.includes('spotify.com') && !spotifyInput.includes('/embed/')) {
      embed = spotifyInput.replace('spotify.com/', 'spotify.com/embed/');
    }
    setSpotifyEmbedUrl(embed);
    setSpotifyInput('');
  };

  const filteredSongs = playlist.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? s.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="music-section" className="space-y-6 max-w-5xl mx-auto pb-10">
      
      {/* Upper Title banner */}
      <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-800">Shared Retro Sound Desk</h2>
            <p className="text-xs text-stone-500 font-medium">Coordinate cute lo-fi tracks or embed Spotify couple tracklists</p>
          </div>
        </div>

        <div className="flex bg-stone-100 p-1 rounded-xl gap-1 text-xxs font-bold text-stone-500 uppercase tracking-widest pl-2">
          <span>Genres:</span>
          {['romantic', 'cozy', 'lofi', 'classic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1 rounded-lg border text-[10px] select-none cursor-pointer transition uppercase ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white border-pink-600 shadow-sm'
                  : 'bg-white border-stone-250 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Vintage Cassette deck widget */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-6 border border-white/50 shadow-sm flex flex-col items-center">
            <div className="bg-pink-200/50 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-pink-700 uppercase tracking-widest inline-flex items-center gap-1.5 mb-5 shadow-sm">
              <Headphones className="w-3.5 h-3.5 animate-pulse" />
              <span>Vintage Cassette Deck</span>
            </div>

            {/* Simulated Vintage Cassette Player Card */}
            <div className="w-full aspect-[1.6/1] bg-stone-800 rounded-2xl border-4 border-stone-900 p-4 relative overflow-hidden flex flex-col justify-between shadow-2xl relative select-none">
              
              {/* Cassette label */}
              <div className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 h-14 rounded-md border border-stone-850 p-2 flex flex-col justify-center text-center text-stone-800 relative shadow-inner">
                <span className="text-[11px] font-bold font-sans uppercase tracking-widest">
                  AMOUR SOUND SYSTEM
                </span>
                <span className="text-[10px] font-medium tracking-tight truncate max-w-full font-mono mt-0.5 select-all">
                  "{currentTrack.title}" &bull; {currentTrack.artist}
                </span>

                {/* Screw overlays */}
                <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-zinc-650 rounded-full border border-stone-800" />
                <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-zinc-650 rounded-full border border-stone-800" />
              </div>

              {/* Spindle openings containing gears that rotate when music plays */}
              <div className="flex items-center justify-center gap-12 my-3">
                
                {/* Left gear spindle */}
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-full bg-zinc-900 border-4 border-dashed border-stone-100 flex items-center justify-center ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '6s' }}
                  >
                    <div className="w-5 h-5 rounded-full bg-zinc-950 border-2 border-stone-100 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                    </div>
                  </div>
                </div>

                {/* Right gear spindle */}
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-full bg-zinc-900 border-4 border-dashed border-stone-100 flex items-center justify-center ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '6s' }}
                  >
                    <div className="w-5 h-5 rounded-full bg-zinc-950 border-2 border-stone-100 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Tape slider progress */}
              <div className="w-full bg-stone-900 rounded-full h-1 relative border shadow-inner">
                <div
                  className="bg-pink-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>

              {/* Cassette layout details */}
              <div className="flex justify-between text-[8px] font-mono text-zinc-400 font-bold tracking-widest px-1">
                <span>SIDE A</span>
                <span>DOLBY B/C</span>
                <span>STEREO</span>
              </div>
            </div>

            {/* Scrubber timeline and times */}
            <div className="w-full flex justify-between text-[10px] text-stone-500 font-mono font-bold mt-4 px-1 select-none">
              <span>01:12</span>
              <span>AMOUR DECK IN SYNC</span>
              <span>{currentTrack.duration}</span>
            </div>

            {/* Audio controllers layout button row */}
            <div className="flex items-center gap-3.5 mt-5">
              <button
                onClick={handlePrevTrack}
                className="p-3 bg-white hover:bg-stone-50 border border-stone-150 text-stone-600 rounded-full transition shadow-sm hover:scale-105 active:scale-95 cursor-pointer leading-none"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4 text-stone-700" />
              </button>

              <button
                id="music-play-toggle"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition shadow-md shadow-pink-300/30 hover:scale-105 active:scale-95 cursor-pointer leading-none"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-3 bg-white hover:bg-stone-50 border border-stone-150 text-stone-600 rounded-full transition shadow-sm hover:scale-105 active:scale-95 cursor-pointer leading-none"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4 text-stone-700" />
              </button>
            </div>

            {/* Volume controller */}
            <div className="w-full flex items-center gap-2 mt-5 px-4 font-bold text-stone-500 text-xs text-left">
              <Volume2 className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-100 rounded-lg cursor-pointer accent-pink-500"
              />
              <span className="text-xxs font-mono text-stone-400 font-bold">{volume}%</span>
            </div>

          </div>

          {/* Duet Custom playlist constructor */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
              <ListMusic className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Duet Track Request Box</span>
            </h3>
            
            <form onSubmit={handleAddNewTrack} className="flex gap-1.5 flex-wrap">
              <input
                type="text"
                placeholder="Insert standard romantic track request..."
                value={playlistSearch}
                onChange={(e) => setPlaylistSearch(e.target.value)}
                className="flex-grow px-3 py-2 bg-white/95 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs"
              />
              <button
                type="submit"
                className="px-3.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold rounded-xl text-xs cursor-pointer shadow-md"
              >
                Request
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Spotify Integration embed widget & music explorer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Spotify integration dashboard */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📻</span>
                <h3 className="text-sm font-bold text-stone-800">Spotify Live Couple Frame</h3>
              </div>
              <span className="text-[10px] font-bold text-stone-400 bg-emerald-100/60 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Active Widget
              </span>
            </div>

            {/* Custom Spotify input to embed any target list */}
            <form onSubmit={handleSpotifySubmit} className="flex gap-1.5">
              <input
                type="text"
                placeholder="Paste any Spotify playlist or track URL to load here..."
                value={spotifyInput}
                onChange={(e) => setSpotifyInput(e.target.value)}
                className="flex-grow px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-pink-300"
              />
              <button
                type="submit"
                className="px-3.5 bg-emerald-555 hover:bg-emerald-600 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow cursor-pointer"
              >
                Load
              </button>
            </form>

            {/* Beautiful real iframe Spotify widget container */}
            <div className="w-full aspect-[4/2] min-h-[148px] bg-stone-100 rounded-2xl overflow-hidden border shadow-inner relative flex items-center justify-center">
              <iframe
                title="Spotify Ambient Player"
                src={spotifyEmbedUrl}
                width="100%"
                height="100%"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-none w-full h-full relative z-10"
              />
            </div>
          </div>

          {/* Playlist explorer selection list */}
          <div className="bg-white/60 backdrop-blur-xl rounded-xxl p-5 border border-white/50 shadow-sm space-y-4">
            <div className="flex justify-between items-center items-center">
              <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                <Music className="w-4 h-4 text-pink-400 animate-pulse" />
                <span>Our Shared Soundtrack list</span>
              </h3>
              
              <div className="relative max-w-xs w-28 md:w-44">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter songs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 bg-white border border-stone-200 rounded-xl text-xxs focus:outline-none focus:ring-1 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {filteredSongs.map((song) => {
                const isActive = song.id === currentTrack.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => {
                      setCurrentTrack(song);
                      setIsPlaying(true);
                      setAudioProgress(0);
                    }}
                    className={`p-3 bg-white hover:bg-stone-50 border rounded-2xl flex items-center justify-between text-left cursor-pointer transition shadow-sm ${
                      isActive ? 'border-pink-500 ring-2 ring-pink-105 bg-pink-50/20' : 'border-stone-200/65'
                    }`}
                  >
                    <div className="flex gap-2.5 items-center min-w-0">
                      <div className="w-9 h-9 bg-pink-100 rounded-xl flex items-center justify-center text-lg shadow-inner shrink-0 border">
                        {song.albumArt}
                      </div>
                      <div className="min-w-0">
                        <strong className="text-xs font-bold text-stone-850 block truncate leading-none mb-1">
                          {song.title}
                        </strong>
                        <span className="text-[10px] text-stone-400 font-semibold block leading-none truncate">
                          {song.artist}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 ml-2">
                      <span className="text-xxs font-mono text-stone-400 font-bold">{song.duration}</span>
                      {isActive && isPlaying && (
                        <div className="flex gap-0.5 items-end h-3 shrink-0">
                          <span className="w-0.5 bg-pink-500 animate-pulse" style={{ height: '100%', animationDuration: '400ms' }} />
                          <span className="w-0.5 bg-pink-555 bg-pink-400 animate-pulse" style={{ height: '60%', animationDuration: '600ms' }} />
                          <span className="w-0.5 bg-pink-300 animate-pulse" style={{ height: '80%', animationDuration: '500ms' }} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
