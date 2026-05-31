import { useState, useEffect } from 'react';
import {
  Heart,
  BookOpen,
  Smartphone,
  Gift,
  Music as MusicIcon,
  Film,
  Crown,
  MessageCircle,
  Settings as SettingsIcon,
  Bell,
  Sparkles,
  Volume2,
  Play,
  Pause,
  LogOut,
  Moon,
  Sun,
  LayoutGrid,
  MapPin
} from 'lucide-react';

// Subcomponents import
import Splash from './components/Splash';
import LandingPage from './components/LandingPage';
import HeartsBackground from './components/HeartsBackground';
import Dashboard from './components/Dashboard';
import Scrapbook from './components/Scrapbook';
import WallpaperBuilder from './components/WallpaperBuilder';
import BouquetBuilder from './components/BouquetBuilder';
import Gifts from './components/Gifts';
import MusicPlayer from './components/MusicPlayer';
import Subscription from './components/Subscription';
import Movies from './components/Movies';
import Chat from './components/Chat';
import Settings from './components/Settings';
import RadarMap from './components/RadarMap';

import { CoupleProfile, DailyLoveNote, AppNotification, Soundtrack, GifGift } from './types';
import { INITIAL_DAILY_NOTES, PRESEEDED_SONGS, PRESEEDED_GIFS } from './data';
import { TRANSLATIONS } from './lib/translations';

export default function App() {
  // Navigation & Splash States
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Custom Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Profile session states
  const [profile, setProfile] = useState<CoupleProfile>({
    userName: 'Avery',
    partnerName: 'Rosie',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    anniversaryDate: '2024-02-14',
    themeKey: 'pastel',
    loveClicks: 520,
    language: 'id',
  });

  // Premium License tier state
  const [isPremium, setIsPremium] = useState(true);

  // Music state (ambiently active)
  const [playlist, setPlaylist] = useState<Soundtrack[]>(PRESEEDED_SONGS);
  const [currentTrack, setCurrentTrack] = useState<Soundtrack>(PRESEEDED_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Shared couple memories lists
  const [notifications, setNotifications] = useState<AppNotification[]>([
    { id: 'n1', title: 'Gift scheduled', message: 'Rosie scheduled a surprise balloon gift!', time: '1 hour ago', read: false, type: 'gift' },
    { id: 'n2', title: 'Scrapbook update', message: 'A new collage page was created!', time: 'Yesterday', read: true, type: 'scrapbook' },
  ]);
  const [loveNotes, setLoveNotes] = useState<DailyLoveNote[]>(INITIAL_DAILY_NOTES);
  const [sentGIFGifts, setSentGIFGifts] = useState<GifGift[]>([]);

  // Local Storage loaders
  useEffect(() => {
    // Check auto authentication if profile exists in local cache
    const savedProf = localStorage.getItem('amour_saved_profile');
    if (savedProf) {
      setProfile(JSON.parse(savedProf));
      setIsAuthed(true);
    }
    
    const savedPremium = localStorage.getItem('amour_is_premium');
    if (savedPremium) {
      setIsPremium(savedPremium === 'true');
    }

    const savedGifts = localStorage.getItem('amour_sent_gifts');
    if (savedGifts) {
      setSentGIFGifts(JSON.parse(savedGifts));
    }
  }, []);

  const handleAuthSuccess = (newProfile: CoupleProfile) => {
    setProfile(newProfile);
    setIsAuthed(true);
    localStorage.setItem('amour_saved_profile', JSON.stringify(newProfile));
  };

  const handleLogout = () => {
    setIsAuthed(false);
    localStorage.removeItem('amour_saved_profile');
    setIsPlaying(false);
  };

  // Maps theme keys to nice background stylesheets
  const getThemeBackgroundStyles = () => {
    if (profile.themeKey === 'pink') {
      return {
        background: 'linear-gradient(135deg, #FFF9F9 0%, #FFEBEF 40%, #FFDFE5 100%)',
        textColor: 'text-rose-700',
        cardBg: 'bg-white border border-rose-100/80 shadow-sm rounded-3xl',
      };
    }
    if (profile.themeKey === 'lavender') {
      return {
        background: 'linear-gradient(135deg, #FCF7FA 0%, #F5ECF2 50%, #EFE1EC 100%)',
        textColor: 'text-purple-800',
        cardBg: 'bg-white border border-rose-100/60 shadow-sm rounded-3xl',
      };
    }
    if (profile.themeKey === 'mint') {
      return {
        background: 'linear-gradient(135deg, #F8FDF9 0%, #EFF8F2 65%, #E3F2E8 100%)',
        textColor: 'text-emerald-900',
        cardBg: 'bg-white border border-emerald-100/70 shadow-sm rounded-3xl',
      };
    }
    if (profile.themeKey === 'dark' || isDarkMode) {
      return {
        background: 'linear-gradient(135deg, #1E1214 0%, #2D1B1E 100%)',
        textColor: 'text-rose-100',
        cardBg: 'bg-stone-900/40 border border-rose-950/60 shadow-inner rounded-3xl',
      };
    }
    // Default Pastel/Cream Editorial
    return {
      background: 'linear-gradient(135deg, #FFFBFB 0%, #FFF9F9 50%, #FFF0F1 100%)',
      textColor: 'text-rose-900',
      cardBg: 'bg-white border border-rose-100 shadow-sm rounded-3xl',
    };
  };

  const themeStyle = getThemeBackgroundStyles();

  // Dynamic Translation Getter
  const currentLang = profile.language || 'id';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['id'];

  // Navigation Items
  const navItems = [
    { id: 'dashboard', label: t.tabDashboard, icon: Heart, badge: null },
    { id: 'radar', label: t.tabRadar || 'Radar Cinta Pasangan', icon: MapPin, badge: 'Live' },
    { id: 'scrapbook', label: t.tabScrapbook, icon: BookOpen, badge: null },
    { id: 'wallpaper', label: t.tabWallpaper, icon: Smartphone, badge: null },
    { id: 'bouquet', label: t.tabBouquet, icon: Sparkles, badge: null },
    { id: 'gifts', label: t.tabGifts || 'GIF Gifts', icon: Gift, badge: null },
    { id: 'music', label: t.tabMusic, icon: MusicIcon, badge: null },
    { id: 'movies', label: t.tabMovies, icon: Film, badge: null },
    { id: 'chat', label: t.tabChat, icon: MessageCircle, badge: null },
    { id: 'subscription', label: t.tabSubscription, icon: Crown, badge: isPremium ? 'Pro' : null },
    { id: 'settings', label: t.tabSettings, icon: SettingsIcon, badge: null },
  ];

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  if (!isAuthed) {
    return (
      <LandingPage onLoginSuccess={handleAuthSuccess} />
    );
  }

  return (
    <div
      id="amour-app-workspace"
      style={{ background: themeStyle.background }}
      className={`min-h-screen flex flex-col relative font-sans transition-all duration-300 ${
        profile.themeKey === 'dark' || isDarkMode ? 'dark text-white' : 'text-stone-800'
      }`}
    >
      {/* Background Hearts Particle Overlay */}
      <HeartsBackground />

      {/* Primary Horizontal Branding Bar */}
      <header className="border-b border-rose-100 bg-white/50 backdrop-blur-md px-8 py-5 flex items-center justify-between relative z-35 select-none shrink-0 font-sans">
        <div>
          <h1 className="font-serif italic text-2xl md:text-3xl text-rose-500 flex items-center gap-2">
            <span className="text-3xl animate-pulse">🌷</span>
            <span>{profile.userName} &amp; {profile.partnerName}</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-rose-450 font-bold mt-1 text-rose-400">{t.tagline}</p>
        </div>

        {/* Quick parameters indicators */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-rose-600 text-xs font-bold bg-rose-50/50 border border-rose-100 rounded-full px-4 py-1.5 font-serif italic">
            <span>{t.connectedAs}</span>
          </div>

          {/* Theme Skin Toggle Indicators */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 bg-white hover:bg-rose-50 border border-rose-100 rounded-full text-rose-500 shrink-0 transition shadow-sm"
            title="Toggle contrast"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-rose-400" /> : <Moon className="w-4 h-4 text-rose-500" />}
          </button>
        </div>
      </header>

      {/* Main Column Body Organizer */}
      <div className="flex-grow flex flex-col md:flex-row relative z-20 overflow-hidden w-full max-w-7xl mx-auto">
        
        {/* Navigation Sidebar Drawer */}
        <aside className="hidden md:flex w-full md:w-64 border-r border-rose-100 bg-white/70 backdrop-blur-md p-4 shrink-0 flex-col justify-between select-none relative z-30 md:max-h-[calc(100vh-70px)] overflow-y-auto">
          <div className="space-y-1.5">
            <span className="text-[9px] font-extrabold text-rose-300 uppercase tracking-[0.2em] pl-2.5 mb-2.5 block text-left font-sans">
              {t.connectedAs.toUpperCase()}
            </span>

            <nav className="space-y-1 block text-left">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition cursor-pointer select-none ${
                      isActive
                        ? 'bg-rose-400 text-white font-serif italic text-sm shadow-md shadow-rose-200/50'
                        : 'text-[#4A4A4A] hover:bg-rose-50/50 hover:text-rose-500 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-450 text-rose-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[8px] font-mono font-extrabold uppercase rounded px-1.5 py-0.5 ${isActive ? 'bg-rose-700 text-white' : 'bg-rose-100 text-rose-800 border border-rose-200 font-bold'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick status bar inside footer drawer */}
          <div className="mt-8 pt-4 border-t border-dashed border-rose-100 flex items-center justify-between flex-wrap gap-2 text-xxs font-semibold text-[#4A4A4A] text-left">
            <div>
              <span className="block text-[8px] font-bold text-rose-300 uppercase tracking-widest mb-0.5">{t.anniversaryLabel}:</span>
              <span className="text-rose-500 font-bold font-mono">{profile.anniversaryDate}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="p-1 px-3 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-100 text-rose-600 transition flex items-center gap-1 font-serif italic text-[10.5px]"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span>{t.logoutBtn}</span>
            </button>
          </div>
        </aside>

        {/* Primary Workspace Scroll Canvas Container */}
        <main className="flex-grow p-4 md:p-6 pb-24 md:pb-6 overflow-y-auto relative md:max-h-[calc(100vh-70px)]">
          {activeTab === 'dashboard' && (
            <Dashboard
              profile={profile}
              setProfile={setProfile}
              onNavigateToPage={setActiveTab}
              notifications={notifications}
              setNotifications={setNotifications}
              loveNotes={loveNotes}
              setLoveNotes={setLoveNotes}
            />
          )}

          {activeTab === 'scrapbook' && (
            <Scrapbook />
          )}

          {activeTab === 'wallpaper' && (
            <WallpaperBuilder />
          )}

          {activeTab === 'bouquet' && (
            <BouquetBuilder />
          )}

          {activeTab === 'gifts' && (
            <Gifts
              sentGifts={sentGIFGifts}
              setSentGifts={setSentGIFGifts}
            />
          )}

          {activeTab === 'music' && (
            <MusicPlayer
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              playlist={playlist}
              setPlaylist={setPlaylist}
            />
          )}

          {activeTab === 'movies' && (
            <Movies
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}

          {activeTab === 'chat' && (
            <Chat />
          )}

          {activeTab === 'radar' && (
            <RadarMap profile={profile} />
          )}

          {activeTab === 'subscription' && (
            <Subscription
              isPremium={isPremium}
              setIsPremium={setIsPremium}
            />
          )}

          {activeTab === 'settings' && (
            <Settings
              profile={profile}
              setProfile={setProfile}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>

      {/* Floating Mini Background Ambient Casette Sound Player Drawer */}
      {isPlaying && activeTab !== 'music' && (
        <div
          onClick={() => setActiveTab('music')}
          className="fixed bottom-6 right-6 z-45 bg-[#4c1d24] border border-rose-905 hover:border-rose-400 rounded-2xl p-2.5 pb-3 max-w-[200px] shadow-xl flex flex-col gap-1.5 cursor-pointer hover:scale-105 active:scale-[1.01] transition duration-200 text-left select-none animate-bounce"
        >
          <div className="flex gap-2 items-center">
            {/* Spinning mini disk */}
            <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200 text-base flex items-center justify-center animate-spin shrink-0 shadow" style={{ animationDuration: '4s' }}>
              {currentTrack.albumArt}
            </div>

            <div className="min-w-0">
              <strong className="text-[11px] font-bold text-white block truncate w-32 leading-tight font-serif italic">
                {currentTrack.title}
              </strong>
              <span className="text-[9px] text-rose-300 font-semibold block leading-none truncate w-32">
                {currentTrack.artist}
              </span>
            </div>
          </div>

          {/* Miniature Sound wave indicators */}
          <div className="flex justify-between items-center px-1">
            <span className="text-[8px] font-bold text-rose-400 uppercase tracking-widest font-sans">Ambient Play</span>
            <div className="flex gap-0.5 items-end h-3 shrink-0">
              <span className="w-0.5 bg-rose-400 animate-pulse h-2.5" style={{ animationDuration: '400ms' }} />
              <span className="w-0.5 bg-rose-300 animate-pulse h-1.5" style={{ animationDuration: '600ms' }} />
              <span className="w-0.5 bg-rose-200 animate-pulse h-3" style={{ animationDuration: '500ms' }} />
              <span className="w-0.5 bg-rose-100 animate-pulse h-2" style={{ animationDuration: '700ms' }} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Bottom Navigation Strip indicators */}
      <div className="md:hidden border-t border-rose-100 bg-white/80 backdrop-blur px-3 py-1.5 flex items-center justify-around select-none shrink-0 static bottom-0 z-40 relative">
        {[
          { id: 'dashboard', label: t.tabDashboard.split(' ')[0], icon: Heart },
          { id: 'radar', label: (t.tabRadar || 'Radar').split(' ')[0], icon: MapPin },
          { id: 'scrapbook', label: t.tabScrapbook.split(' ')[0], icon: BookOpen },
          { id: 'wallpaper', label: t.tabWallpaper.split(' ')[0], icon: Smartphone },
          { id: 'chat', label: t.tabChat.split(' ')[0], icon: MessageCircle },
        ].map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
                isActive ? 'text-rose-500 scale-105 font-bold font-serif italic' : 'text-[#4A4A4A]'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span className="text-[9px] tracking-tight mt-0.5 leading-none">{item.label}</span>
            </button>
          );
        })}
        {/* Toggle more triggers */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[#4A4A4A] ${
            activeTab === 'settings' ? 'text-rose-500 font-bold font-serif italic' : ''
          }`}
        >
          <LayoutGrid className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-tight mt-0.5 leading-none">{t.tabSettings.split(' ')[0]}</span>
        </button>
      </div>
    </div>
  );
}
