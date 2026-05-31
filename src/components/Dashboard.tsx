import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, Quote, Bell, Check, Compass, Flame, BookOpen, Smartphone, Gift, Music, Film, MessageCircle, Settings, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CoupleProfile, DailyLoveNote, AppNotification } from '../types';
import { ROMANTIC_QUOTES, INITIAL_DAILY_NOTES, MOODS } from '../data';
import { TRANSLATIONS } from '../lib/translations';

interface Spark {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  emoji: string;
  duration: number;
  rotateStart: number;
  rotateEnd: number;
}

interface DashboardProps {
  profile: CoupleProfile;
  setProfile: React.Dispatch<React.SetStateAction<CoupleProfile>>;
  onNavigateToPage: (page: string) => void;
  notifications: AppNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<AppNotification[]>>;
  loveNotes: DailyLoveNote[];
  setLoveNotes: React.Dispatch<React.SetStateAction<DailyLoveNote[]>>;
}

export default function Dashboard({
  profile,
  setProfile,
  onNavigateToPage,
  notifications,
  setNotifications,
  loveNotes,
  setLoveNotes
}: DashboardProps) {
  const currentLang = profile.language || 'id';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['id'];

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [timePassed, setTimePassed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedMood, setSelectedMood] = useState('🥰');
  const [partnerActiveMood, setPartnerActiveMood] = useState('🌸');
  const [noteToRead, setNoteToRead] = useState<DailyLoveNote | null>(null);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);

  // Quote Carousel auto rotations
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Anniversary count-up timer
  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(profile.anniversaryDate);
      const now = new Date();
      const diffMs = Math.abs(now.getTime() - anniversary.getTime());
      
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 65)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimePassed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [profile.anniversaryDate]);

  const handleLoveClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    setProfile((prev) => ({
      ...prev,
      loveClicks: prev.loveClicks + 1,
    }));

    // Find the ideal center position to launch the explosion
    let spawnX = window.innerWidth / 2;
    let spawnY = window.innerHeight * 0.75;
    if (e) {
      if (e.clientX && e.clientY) {
        spawnX = e.clientX;
        spawnY = e.clientY;
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        spawnX = rect.left + rect.width / 2;
        spawnY = rect.top + rect.height / 2;
      }
    }

    const emojis = ['❤️', '💖', '💕', '💗', '💓', '🌷', '🥰', '✨'];
    const newSparks = Array.from({ length: 18 }).map((_, i) => {
      // Create a nice upward radial fountain dispersion
      const angle = (Math.PI * 1.1) + (Math.random() * Math.PI * 0.8); // angles pointing mostly upwards / outward
      const distance = 80 + Math.random() * 220; // explosive radius displacement
      
      const endX = spawnX + Math.cos(angle) * distance;
      const endY = spawnY + Math.sin(angle) * distance - (100 + Math.random() * 200); // pull upwards further
      const size = 0.6 + Math.random() * 1.4;

      return {
        id: `spark-${Date.now()}-${i}-${Math.random()}`,
        startX: spawnX,
        startY: spawnY,
        endX,
        endY,
        size,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        duration: 0.8 + Math.random() * 1.2,
        rotateStart: Math.random() * 60 - 30,
        rotateEnd: Math.random() * 540 - 270,
      };
    });

    setSparks(prev => [...prev, ...newSparks]);
    
    // Push sweet notification randomly
    if (Math.random() > 0.6) {
      const messages = [
        "Your partner just sent a warm thoughts spark!",
        "Double heart clicks occurred in your shared garden!",
        "Rosie's screen flashed red for a second!",
        "Connection velocity increased by 10%!"
      ];
      const newNotif: AppNotification = {
        id: `click-${Date.now()}`,
        title: "Love Spark Burst!",
        message: messages[Math.floor(Math.random() * messages.length)],
        time: "Just now",
        read: false,
        type: 'anniversary'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const handleUnlockNote = (idx: number) => {
    const updated = [...loveNotes];
    updated[idx].isUnlocked = true;
    setLoveNotes(updated);
    setNoteToRead(updated[idx]);
    setActiveNoteIdx(idx);

    // Notification
    const newNotif: AppNotification = {
      id: `note-${Date.now()}`,
      title: "Note Unlocked",
      message: `You unlocked the ${updated[idx].day} sweet message letter!`,
      time: "Just now",
      read: false,
      type: 'chat'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div id="dashboard-tab" className="space-y-6 max-w-4xl mx-auto pb-10">
      
      {/* Top Banner / Cute greeting */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center md:justify-between gap-6">
        {/* Decorative corner flower */}
        <span className="absolute -top-3 -left-3 text-xl opacity-30">🌸</span>
        <span className="absolute -bottom-3 -right-3 text-xl opacity-30">🌸</span>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left z-10 w-full md:w-auto">
          {/* Couple Avatars Orbit */}
          <div className="flex items-center -space-x-4 relative">
            <div className="w-16 h-16 rounded-full border-2 border-rose-100 overflow-hidden shadow-sm hover:scale-105 transition-all">
              <img src={profile.avatarUrl} alt={profile.userName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            
            <div className="bg-rose-450 p-2 rounded-full text-white flex items-center justify-center shadow-md shadow-rose-200 z-10 scale-90">
              <Heart className="w-4 h-4 fill-white text-white" />
            </div>

            <div className="w-16 h-16 rounded-full border-2 border-rose-100 overflow-hidden shadow-sm hover:scale-105 transition-all">
              <img src={profile.partnerAvatarUrl} alt={profile.partnerName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif italic text-rose-950 tracking-tight flex items-center justify-center sm:justify-start gap-1.5 leading-none">
              {t.greetingDuo}
              <Sparkles className="w-5 h-5 text-rose-400 animate-pulse" />
            </h2>
            <div className="flex flex-col sm:flex-row items-center sm:gap-2 mt-1.5 gap-1">
              <span className="text-xs text-rose-700 font-medium bg-rose-50/50 border border-rose-100/40 rounded-full px-3 py-1.5 inline-block">
                {t.connectedAs}: <strong className="font-serif italic text-rose-900">{profile.userName}</strong> &amp; 
                <strong className="font-serif italic text-rose-900"> {profile.partnerName}</strong>
              </span>
            </div>
            {/* Bloomy Mascot Welcome dialog block */}
            <div className="mt-2.5 bg-[#FFF6E9]/75 border border-amber-100/50 rounded-2xl px-3.5 py-2 text-[10.5px] font-semibold text-rose-850 flex items-center gap-2 shadow-xs max-w-sm text-left">
              <span className="text-lg animate-bounce shrink-0 select-none">🌷</span>
              <p><strong>{t.bloomyTitle}:</strong> "{t.welcomeBloomy}"</p>
            </div>
          </div>
        </div>

        {/* Quick Notification Bell Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationPanel(!showNotificationPanel)}
            className="p-3 bg-white hover:bg-rose-50 border border-rose-100 rounded-2xl text-rose-900 transition shadow-sm relative flex items-center gap-2 font-bold text-xs"
          >
            <Bell className="w-4 h-4 text-rose-400" />
            <span className="font-serif italic">{t.recentStories}</span>
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="w-4 h-4 bg-rose-400 rounded-full text-[9px] text-white flex items-center justify-center font-bold animate-ping absolute -top-1 -right-0.5" />
            )}
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="w-4 h-4 bg-rose-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold absolute -top-1 -right-0.5" style={{ pointerEvents: 'none' }}>
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {/* Quick Notification Panel Popover */}
          {showNotificationPanel && (
            <div className="absolute right-0 mt-2.5 w-72 bg-white/95 backdrop-blur-md border border-rose-100 shadow-xl rounded-2xl p-4 z-50 text-[#4A4A4A] text-xs animate-fade-in">
              <div className="flex justify-between items-center mb-2.5 border-b border-rose-50 pb-1.5">
                <span className="font-serif italic font-bold text-rose-950 flex items-center gap-1">
                  <span>🌷</span>
                  <span>{t.recentStories}</span>
                </span>
                <button onClick={markAllNotificationsRead} className="text-xxs font-bold text-rose-500 hover:underline">
                  {currentLang === 'id' ? 'Tandai Dibaca' : currentLang === 'fr' ? 'Tout lu' : currentLang === 'es' ? 'Marcar leído' : currentLang === 'ja' ? '既読にする' : currentLang === 'ko' ? '모두 읽음' : currentLang === 'de' ? 'Gelesen' : 'Mark Read'}
                </button>
              </div>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 text-left">
                {notifications.length === 0 ? (
                  <div className="text-center py-5 text-stone-550 select-none">
                    <span className="text-2xl block mb-1 animate-bounce">🌷</span>
                    <p className="text-[11px] text-rose-800 font-bold mb-0.5">{t.bloomyTitle}: {t.allQuietInGarden}</p>
                  </div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`p-2 rounded-xl transition ${n.read ? 'bg-rose-50/20 text-[#4A4A4A]/60' : 'bg-rose-50/70 text-[#4A4A4A] font-medium border border-rose-100/30'}`}>
                      <div className="flex justify-between font-bold text-rose-900 text-xxs">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-rose-400 font-normal">{n.time}</span>
                      </div>
                      <p className="text-[#4A4A4A]/80 italic text-[10px] mt-0.5">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Love Timer Card */}
      <div className="bg-gradient-to-br from-rose-500 via-rose-400 to-[#F5D6C6] rounded-3xl p-8 text-white shadow-sm relative overflow-hidden text-center border border-rose-100/20 select-none">
        
        {/* Soft background decor nodes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] inline-flex items-center gap-1.5 mb-4 shadow-sm border border-white/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>{currentLang === 'id' ? 'Peringatan Hari Jadian' : 'Anniversary Milestone'}</span>
          </div>

          <h3 className="text-xl font-serif italic opacity-95 tracking-wide">
            {t.daysTogether}
          </h3>

          {/* Clock timer numbers */}
          <div className="grid grid-cols-4 gap-3 max-w-sm w-full my-6 font-mono">
            {[
              { val: timePassed.days, label: currentLang === 'id' ? 'Hari' : currentLang === 'fr' ? 'Jours' : currentLang === 'es' ? 'Días' : currentLang === 'ja' ? '日' : currentLang === 'ko' ? '일' : currentLang === 'de' ? 'Tage' : 'Days' },
              { val: timePassed.hours, label: currentLang === 'id' ? 'Jam' : currentLang === 'fr' ? 'Heures' : currentLang === 'es' ? 'Horas' : currentLang === 'ja' ? '時間' : currentLang === 'ko' ? '시간' : currentLang === 'de' ? 'Stunden' : 'Hours' },
              { val: timePassed.minutes, label: currentLang === 'id' ? 'Menit' : currentLang === 'fr' ? 'Min' : currentLang === 'es' ? 'Min' : currentLang === 'ja' ? '分' : currentLang === 'ko' ? '분' : currentLang === 'de' ? 'Min' : 'Min' },
              { val: timePassed.seconds, label: currentLang === 'id' ? 'Detik' : currentLang === 'fr' ? 'Sec' : currentLang === 'es' ? 'Seg' : currentLang === 'ja' ? '秒' : currentLang === 'ko' ? '초' : currentLang === 'de' ? 'Sek' : 'Sec' }
            ].map((timerItem) => (
              <div key={timerItem.label} className="bg-white/10 backdrop-blur-sm rounded-2xl py-3 px-1 border border-white/15 shadow-inner">
                <span className="block text-2xl sm:text-3xl font-semibold tracking-tight font-sans">
                  {String(timerItem.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-white/95 uppercase tracking-widest mt-1.5 block">
                  {timerItem.label}
                </span>
              </div>
            ))}
          </div>

          {/* Click to add Love metric */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <button
              id="love-button"
              onClick={handleLoveClick}
              className="py-3.5 px-8 bg-white hover:bg-rose-50/90 text-rose-600 font-bold rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center gap-2 border border-rose-100 cursor-pointer font-serif italic"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
              <span>{t.sendSparkBurst} ({profile.loveClicks})</span>
            </button>
            <p className="text-[10px] opacity-90 font-serif italic flex items-center justify-center gap-1 mt-1">
              <Flame className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              {currentLang === 'id' 
                ? `Setiap klik memancarkan ledakan cinta ke layar ${profile.partnerName}` 
                : `Every click beams instant hearts to ${profile.partnerName}'s workspace`}
            </p>
          </div>
        </div>
      </div>

      {/* Row of Mood Updater + Love Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Interactive Couple Mood Updater */}
        <div id="mood-widget" className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif italic font-bold text-rose-950 flex items-center justify-between mb-1.5">
              <span>{currentLang === 'id' ? 'Status Resonansi Pasangan' : currentLang === 'fr' ? 'Statut de Résonance du Couple' : currentLang === 'es' ? 'Estado de Resonancia' : currentLang === 'ja' ? '共鳴ステータス' : currentLang === 'ko' ? '커플 공명 상태' : currentLang === 'de' ? 'Kopplungsstatus' : 'Couple Resonance Status'}</span>
              <span className="text-rose-450 text-[10px] font-semibold bg-rose-50/50 border border-rose-100/40 px-2.5 py-0.5 rounded-full font-sans uppercase tracking-wider">{currentLang === 'id' ? 'Bersama' : currentLang === 'fr' ? 'Partagé' : currentLang === 'es' ? 'Compartido' : 'Shared'}</span>
            </h3>
            <p className="text-xs text-[#4A4A4A]/80 mb-4 font-sans leading-relaxed">
              {currentLang === 'id' 
                ? 'Siarkan keadaan emosi Anda saat ini. Pasangan Anda akan langsung melihat bagaimana perasaan Anda.' 
                : currentLang === 'fr'
                ? 'Partagez votre état émotionnel actuel. Votre partenaire le verra immédiatement.'
                : currentLang === 'es'
                ? 'Transmite tu estado emocional actual. Tu pareja lo verá al instante.'
                : 'Broadcast your direct emotional state. Your partner instantly views how you feel.'}
            </p>

            <div className="grid grid-cols-6 gap-2 mb-4">
              {MOODS.map((md) => (
                <button
                  key={md.name}
                  type="button"
                  onClick={() => {
                    setSelectedMood(md.emoji);
                    // simulated response
                    if (Math.random() > 0.5) {
                      setPartnerActiveMood(MOODS[Math.floor(Math.random() * MOODS.length)].emoji);
                    }
                  }}
                  className={`py-2 rounded-2xl border flex flex-col items-center justify-center text-xl transition-all cursor-pointer ${
                    selectedMood === md.emoji
                      ? 'bg-rose-50/70 border-rose-300 scale-105 shadow-inner'
                      : 'bg-white border-rose-100 hover:bg-rose-50/30'
                  }`}
                  title={md.name}
                >
                  <span>{md.emoji}</span>
                  <span className="text-[9px] text-[#4A4A4A] font-semibold mt-1 tracking-tight truncate max-w-full px-0.5">
                    {md.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick mood display comparison */}
          <div className="p-3 bg-rose-50/30 border border-rose-100/50 rounded-2xl flex items-center justify-between text-xs font-semibold text-rose-900">
            <div className="flex items-center gap-1.5">
              <span className="text-lg bg-white p-1 rounded-lg border border-rose-100 shadow-sm">{selectedMood}</span>
              <span className="font-serif italic font-bold">{currentLang === 'id' ? 'Anda (Aktif)' : currentLang === 'fr' ? 'Vous (Actif)' : currentLang === 'es' ? 'Tú (Activo)' : 'You (Active)'}</span>
            </div>
            
            <div className="w-5 h-px bg-rose-200 border-dashed" />
            
            <div className="flex items-center gap-1.5">
              <span className="text-lg bg-white p-1 rounded-lg border border-rose-100 shadow-sm">{partnerActiveMood}</span>
              <span className="font-serif italic font-bold">{profile.partnerName}</span>
            </div>
          </div>
        </div>

        {/* Romantic quotes slider card */}
        <div id="quote-widget" className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-serif italic font-bold text-rose-955 text-rose-950 flex items-center gap-2">
              <Quote className="w-4 h-4 text-rose-455 text-rose-400" />
              <span>{currentLang === 'id' ? 'Kutipan Romantis' : currentLang === 'fr' ? 'Collection de Citations' : currentLang === 'es' ? 'Colección de Citas' : 'Quotes Collection'}</span>
            </h3>
            <span className="text-[10px] font-bold text-rose-400 font-sans tracking-wide">
              {currentLang === 'id' ? 'Kutipan' : 'Quote'} {quoteIndex + 1}/{ROMANTIC_QUOTES.length}
            </span>
          </div>

          <div className="flex-grow flex flex-col justify-center py-2 relative">
            <p className="text-[#4A4A4A] font-serif italic text-base tracking-wide leading-relaxed pl-4 border-l-2 border-rose-200">
              "{ROMANTIC_QUOTES[quoteIndex].text}"
            </p>
            <span className="block text-right text-xs text-rose-400 font-bold mt-3 font-sans uppercase tracking-[0.1em]">
              &mdash; {ROMANTIC_QUOTES[quoteIndex].author}
            </span>
          </div>

          {/* Carousel slide controls */}
          <div className="flex gap-1.5 justify-end mt-2">
            <button
              onClick={() => setQuoteIndex((prev) => (prev - 1 + ROMANTIC_QUOTES.length) % ROMANTIC_QUOTES.length)}
              className="p-2 px-3 bg-white hover:bg-rose-50 border border-rose-150 rounded-xl transition text-rose-800 text-xs font-semibold cursor-pointer"
            >
              &larr; {currentLang === 'id' ? 'Kembali' : 'Prev'}
            </button>
            <button
              onClick={() => setQuoteIndex((prev) => (prev + 1) % ROMANTIC_QUOTES.length)}
              className="p-2 px-3 bg-white hover:bg-rose-50 border border-rose-150 rounded-xl transition text-rose-800 text-xs font-semibold cursor-pointer"
            >
              {currentLang === 'id' ? 'Lanjut' : 'Next'} &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Playgrounds & Activities Hub */}
      <div id="activities-hub" className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm">
        <h3 className="text-base font-serif italic font-bold text-rose-950 flex items-center justify-between mb-1.5">
          <span>{t.quickActions}</span>
          <span className="text-rose-450 text-rose-400 text-[10px] font-semibold bg-rose-50/50 border border-rose-100/40 px-2.5 py-0.5 rounded-full font-sans uppercase tracking-wider">{currentLang === 'id' ? 'Aktivitas' : 'Explore'}</span>
        </h3>
        <p className="text-xs text-[#4A4A4A]/80 mb-5 font-sans">
          {currentLang === 'id' ? 'Ketuk fitur interaktif di bawah untuk berekreasi bersama pasangan.' : 'Tap on any playground below to coordinate or change channels instantly.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {[
            { id: 'scrapbook', label: t.tabScrapbook, desc: currentLang === 'id' ? 'Kolase & memori manis bersama' : 'Precious shared collages & memories', icon: BookOpen, color: 'bg-amber-50/60 text-amber-800 border-amber-100/40 hover:bg-amber-100/50' },
            { id: 'wallpaper', label: t.tabWallpaper, desc: currentLang === 'id' ? 'Desain wallpaper ponsel couple' : 'Design mobile wallpaper backgrounds', icon: Smartphone, color: 'bg-blue-50/60 text-blue-800 border-blue-100/40 hover:bg-blue-100/50' },
            { id: 'bouquet', label: t.tabBouquet, desc: currentLang === 'id' ? 'Rangkai buket bunga romantis' : 'Weave digital flower bouquets', icon: Sparkles, color: 'bg-emerald-50/60 text-emerald-800 border-emerald-100/40 hover:bg-emerald-100/50' },
            { id: 'gifts', label: t.tabGifts || 'Surprise Gifts', desc: currentLang === 'id' ? 'Kirim kado animasi manis berkilau' : 'Fling virtual animations instantly', icon: Gift, color: 'bg-rose-50/60 text-rose-800 border-rose-100/40 hover:bg-rose-100/50' },
            { id: 'music', label: t.tabMusic, desc: currentLang === 'id' ? 'Mainkan musik pita kaset santai' : 'Play cozy local tape soundtrack', icon: Music, color: 'bg-purple-50/60 text-purple-800 border-purple-100/40 hover:bg-purple-100/50' },
            { id: 'movies', label: t.tabMovies, desc: currentLang === 'id' ? 'Daftar tontonan bioskop berdua' : 'Mark down watchlist dates & films', icon: Film, color: 'bg-slate-50/60 text-slate-800 border-slate-100/40 hover:bg-slate-100/50' },
            { id: 'chat', label: t.tabChat, desc: currentLang === 'id' ? 'Bilik obrolan intim berdua' : 'Chat area to keep things private', icon: MessageCircle, color: 'bg-pink-50/60 text-pink-800 border-pink-100/40 hover:bg-pink-100/50' },
            { id: 'subscription', label: t.tabSubscription, desc: currentLang === 'id' ? 'Keuntungan premium eksklusif' : 'Browse our exclusive Pro tier benefits', icon: Crown, color: 'bg-yellow-50/60 text-yellow-800 border-yellow-200/50 hover:bg-yellow-100/50' },
            { id: 'settings', label: t.tabSettings, icon: Settings, desc: currentLang === 'id' ? 'Tema kulit, bahasa & jadian' : 'Themes, language & couple anniversary', color: 'bg-stone-50/60 text-stone-800 border-stone-200/40 hover:bg-stone-100/50' }
          ].map((playground) => {
            const IconComponent = playground.icon;
            return (
              <button
                key={playground.id}
                onClick={() => onNavigateToPage(playground.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all active:scale-[0.98] duration-200 flex flex-col justify-between h-[105px] cursor-pointer shadow-xs relative group ${playground.color}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1.5 bg-white/90 rounded-xl shadow-xs shrink-0 border border-white">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 hidden sm:inline-block transition duration-200 uppercase font-bold tracking-wider">&rarr; Open</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight font-serif italic">{playground.label}</h4>
                  <p className="text-[9px] opacity-80 mt-0.5 line-clamp-1 leading-snug">{playground.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Love Notes Unlocker Grid */}
      <div id="notes-grid-widget" className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm">
        <h3 className="text-base font-serif italic font-bold text-rose-950 mb-1.5 flex items-center gap-1.5">
          <span>{t.dailyLoveNotes}</span>
          <span className="text-rose-455 text-rose-400 text-[10px] font-semibold bg-rose-50/50 border border-rose-100/40 px-2.5 py-0.5 rounded-full font-sans uppercase tracking-wider">{currentLang === 'id' ? 'Buka Kunci' : 'Unlockable'}</span>
        </h3>
        <p className="text-xs text-[#4A4A4A]/80 mb-4 font-sans">
          {currentLang === 'id' ? 'Buka kapsul surat cinta baru setiap hari bersama. Beberapa sudah dapat dibaca, sebagian lagi masih tersegel.' : 'Open a new box each day together. Some are waiting, some are scheduled locked.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {loveNotes.map((note, idx) => (
            <button
              key={note.day}
              type="button"
              onClick={() => {
                if (note.isUnlocked) {
                  setNoteToRead(note);
                  setActiveNoteIdx(idx);
                } else {
                  handleUnlockNote(idx);
                }
              }}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-between text-center transition-all cursor-pointer select-none ${
                note.isUnlocked
                  ? 'bg-gradient-to-b from-white to-rose-50/20 border-rose-200 text-rose-950 font-bold hover:scale-[1.02] shadow-sm'
                  : 'bg-rose-50/30 border-rose-100/50 text-rose-300 hover:bg-rose-50/70'
              }`}
            >
              <span className="text-[10px] font-sans tracking-wide uppercase font-extrabold">{note.day}</span>
              <div className="my-2.5 text-2xl">
                {note.isUnlocked ? '✉️' : '🔒'}
              </div>
              <span className="text-[9px] font-serif italic tracking-tight leading-none text-rose-700 font-semibold">
                {note.isUnlocked 
                  ? (currentLang === 'id' ? 'Baca Surat' : 'Read Letter') 
                  : (currentLang === 'id' ? 'Buka Kunci' : 'Unlock Now')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal to Read Note */}
      {noteToRead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-rose-100 shadow-xl relative text-[#4A4A4A]">
            <div className="text-center">
              <div className="text-3xl text-rose-400 mb-2">💌</div>
              <h3 className="text-lg font-serif italic font-bold text-rose-955 text-rose-950 mb-1">{noteToRead.day} {currentLang === 'id' ? 'Catatan Manis' : 'Sweet Note'}</h3>
              <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest mb-4">{currentLang === 'id' ? 'Kapsul surat cinta dari belahan jiwamu' : 'Letter from your darling'}</p>
              
              <div className="p-5 bg-rose-50/30 border border-dashed border-rose-200 rounded-2xl text-rose-900 font-serif italic text-base tracking-wide leading-relaxed my-3 shadow-sm">
                "{noteToRead.note}"
              </div>
              
              <span className="block text-xs font-serif font-bold text-rose-800 select-none mt-2">
                &mdash; {currentLang === 'id' ? 'Selamanya Milikmu' : 'Yours Everlastingly'}, {profile.partnerName}
              </span>
              
              <button
                type="button"
                onClick={() => setNoteToRead(null)}
                className="mt-5 w-full py-2.5 bg-rose-50 hover:bg-rose-100/70 text-rose-800 rounded-xl font-bold text-xs transition border border-rose-100 cursor-pointer"
              >
                {currentLang === 'id' ? 'Tutup Surat Utama' : 'Tuck Message Away'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Spark Burst Hearts Overlay */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{
              opacity: 0,
              scale: 0.1,
              x: spark.startX,
              y: spark.startY,
              rotate: spark.rotateStart
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.1, spark.size, spark.size, 0],
              x: [spark.startX, spark.endX],
              y: [spark.startY, spark.endY],
              rotate: spark.rotateEnd
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: spark.duration,
              ease: [0.18, 0.89, 0.32, 1.28], // overshoot spring simulation
              times: [0, 0.1, 0.75, 1]
            }}
            className="fixed z-50 pointer-events-none select-none text-3xl"
            style={{
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)',
            }}
            onAnimationComplete={() => {
              setSparks((prev) => prev.filter((s) => s.id !== spark.id));
            }}
          >
            {spark.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
