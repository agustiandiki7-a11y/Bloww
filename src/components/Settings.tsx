import React, { useState } from 'react';
import { Settings as SettingsIcon, Heart, Calendar, User, Palette, Sparkles, RefreshCw, AlertTriangle, ShieldAlert, Globe } from 'lucide-react';
import { CoupleProfile } from '../types';
import { LANGUAGES_INFO, TRANSLATIONS, LanguageCode } from '../lib/translations';

interface SettingsProps {
  profile: CoupleProfile;
  setProfile: React.Dispatch<React.SetStateAction<CoupleProfile>>;
  onLogout: () => void;
}

export default function Settings({ profile, setProfile, onLogout }: SettingsProps) {
  const currentLang = profile.language || 'id';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['id'];

  const [editedUser, setEditedUser] = useState(profile.userName);
  const [editedPartner, setEditedPartner] = useState(profile.partnerName);
  const [editedDate, setEditedDate] = useState(profile.anniversaryDate);
  const [password, setPassword] = useState('••••••••');
  
  // Toggles details
  const [playSounds, setPlaySounds] = useState(true);
  const [allowSparks, setAllowSparks] = useState(true);
  const [showConfigSuccess, setShowConfigSuccess] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...profile,
      userName: editedUser || profile.userName,
      partnerName: editedPartner || profile.partnerName,
      anniversaryDate: editedDate || profile.anniversaryDate,
    };
    setProfile(updated);
    localStorage.setItem('amour_saved_profile', JSON.stringify(updated));

    setShowConfigSuccess(true);
    setTimeout(() => {
      setShowConfigSuccess(false);
    }, 2800);
  };

  const handleThemeShift = (themeKey: 'pastel' | 'pink' | 'lavender' | 'mint' | 'dark') => {
    const updated = {
      ...profile,
      themeKey
    };
    setProfile(updated);
    localStorage.setItem('amour_saved_profile', JSON.stringify(updated));
  };

  const wipeAllDataAndReset = () => {
    const confirm = window.confirm(
      "Are you absolutely sure you want to flush LoveBloom shared space? This will discard all scrapbooks, custom wallpapers, bouquets arranged, notifications logs, and couple setups!"
    );
    if (confirm) {
      localStorage.clear();
      onLogout();
      // Reload page to start fresh splash screen
      window.location.reload();
    }
  };

  return (
    <div id="settings-tab" className="space-y-6 max-w-2xl mx-auto pb-10 text-stone-800">
      
      {/* Upper header */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-5 border border-white/50 shadow-sm flex items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
            <SettingsIcon className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-stone-800 font-serif italic">{t.settingsTitle}</h2>
            <p className="text-xs text-stone-500 font-medium">{t.settingsSub}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-650 border border-red-100 rounded-xl text-xxs font-extrabold uppercase tracking-wider transition cursor-pointer"
        >
          {t.logoutBtn}
        </button>
      </div>

      {showConfigSuccess && (
        <div className="bg-emerald-50 text-emerald-700 text-xs p-3.5 rounded-2xl mb-4 border border-emerald-100 flex items-center gap-2 font-bold animate-bounce text-left">
          🌸 {t.allQuietInGarden ? "Configurations applied securely! Recalibration complete." : "Applied!"}
        </div>
      )}

      {/* Language Selection Card */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold text-rose-450 uppercase tracking-widest border-b border-rose-100/50 pb-2 flex items-center gap-1.5 select-none text-left">
          <Globe className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>{t.languageSelectLabel}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {LANGUAGES_INFO.map((lang) => {
            const matches = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  const updated = {
                    ...profile,
                    language: lang.code
                  };
                  setProfile(updated);
                  localStorage.setItem('amour_saved_profile', JSON.stringify(updated));
                }}
                className={`py-2 px-3 rounded-xl border flex items-center gap-2.5 transition cursor-pointer select-none text-left ${
                  matches
                    ? 'border-pink-500 ring-2 ring-pink-100 bg-pink-50/30'
                    : 'border-stone-150 bg-white/50 hover:bg-pink-50/10'
                }`}
              >
                <span className="text-xl leading-none shrink-0">{lang.flag}</span>
                <div className="min-w-0">
                  <span className={`text-xs block leading-tight truncate ${matches ? 'font-bold text-pink-700' : 'font-medium text-stone-700'}`}>{lang.local}</span>
                  <span className="text-[9px] text-stone-400 block font-sans tracking-wide truncate leading-none mt-0.5">{lang.name.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        
        {/* Core details card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-rose-450 uppercase tracking-widest border-b border-rose-100/50 pb-2 flex items-center gap-1.5 select-none text-left">
            <User className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.companionConfig}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1.5 text-left">{t.yourNickname}</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={editedUser}
                  onChange={(e) => setEditedUser(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-white/80 border border-stone-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs text-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1.5 text-left">{t.partnerNickname}</label>
              <div className="relative">
                <Heart className="w-4 h-4 text-pink-450 absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-500" />
                <input
                  type="text"
                  value={editedPartner}
                  onChange={(e) => setEditedPartner(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-white/80 border border-stone-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs text-stone-800"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xxs font-bold text-stone-400 uppercase tracking-widest pl-1 mb-1.5 text-left">{t.anniversaryLabel}</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="edit-anniversary"
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white/80 border border-stone-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs text-stone-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold rounded-xl text-xs shadow hover:scale-[1.01] transition active:scale-95 cursor-pointer"
          >
            {t.applySyncBtn}
          </button>
        </div>

        {/* Theme select list */}
        <div id="theme-shifting-section" className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-rose-450 uppercase tracking-widest border-b border-rose-100/50 pb-2 flex items-center gap-1.5 select-none text-left">
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.exoticSkins}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { key: 'pastel', name: 'Almond Cream', preview: 'bg-amber-100 text-amber-900 border-amber-350' },
              { key: 'pink', name: 'Blush Blossom', preview: 'bg-pink-100 text-pink-900 border-pink-350' },
              { key: 'lavender', name: 'Lilac Dusk', preview: 'bg-purple-100 text-purple-900 border-purple-350' },
              { key: 'mint', name: 'Peppermint', preview: 'bg-emerald-100 text-emerald-950 border-emerald-350' },
              { key: 'dark', name: 'Constellation', preview: 'bg-stone-900 text-white border-stone-750' }
            ].map((th) => (
              <button
                key={th.key}
                type="button"
                onClick={() => handleThemeShift(th.key as any)}
                className={`py-3 rounded-2xl border flex flex-col items-center justify-center p-2.5 text-center transition cursor-pointer select-none font-sans text-xxs font-bold ${
                  profile.themeKey === th.key
                    ? 'border-pink-500 ring-2 ring-pink-100 bg-white shadow'
                    : 'border-stone-150 bg-white hover:bg-stone-50'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border mb-1.5 ${th.preview}`} />
                <span className="text-stone-700 font-bold truncate max-w-full leading-none">{th.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Miscellaneous switches */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-rose-450 uppercase tracking-widest border-b border-rose-100/50 pb-2 select-none text-left flex items-center gap-1.5">
            <span>🔔</span>
            <span>{t.systemAlerts}</span>
          </h3>

          <div className="space-y-3.5 text-xs text-stone-750 font-medium select-none text-left">
            <label className="flex items-center justify-between cursor-pointer py-1 border-b border-stone-100">
              <span className="pr-4">{t.playSoundsLabel}</span>
              <input
                type="checkbox"
                checked={playSounds}
                onChange={(e) => setPlaySounds(e.target.checked)}
                className="w-4 h-4 rounded text-pink-500 border-stone-350 focus:ring-pink-400 cursor-pointer shrink-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1">
              <span className="pr-4">{t.allowSparksLabel}</span>
              <input
                type="checkbox"
                checked={allowSparks}
                onChange={(e) => setAllowSparks(e.target.checked)}
                className="w-4 h-4 rounded text-pink-500 border-stone-350 focus:ring-pink-400 cursor-pointer shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Database wipes / Dangerous area */}
        <div className="bg-rose-50/40 backdrop-blur rounded-3xl p-6 border border-rose-200/55 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-rose-700 uppercase tracking-widest border-b border-rose-200/55 pb-2 flex items-center gap-1.5 select-none text-left">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500 animate-pulse" />
            <span>{t.wipeDataHeadline}</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
            <p className="text-[11px] text-stone-605 leading-normal max-w-sm font-medium">
              {t.wipeWarning}
            </p>
            <button
              type="button"
              onClick={wipeAllDataAndReset}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xxs uppercase tracking-wider shrink-0 transition active:scale-95 cursor-pointer shadow-sm"
            >
              {t.wipeBtn}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
