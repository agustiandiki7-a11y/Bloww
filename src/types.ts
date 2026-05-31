export interface CoupleProfile {
  userName: string;
  partnerName: string;
  avatarUrl: string;
  partnerAvatarUrl: string;
  anniversaryDate: string; // YYYY-MM-DD
  themeKey: 'pastel' | 'pink' | 'lavender' | 'mint' | 'dark';
  loveClicks: number;
  language?: 'en' | 'id' | 'fr' | 'es' | 'ja' | 'ko' | 'de';
}

export interface ScrapbookObject {
  id: string;
  type: 'photo' | 'sticker' | 'text';
  content: string; // Image src or sticker emoji or text content
  x: number; // relative percentage 0-100
  y: number; // relative percentage 0-100
  scale: number;
  rotation: number; // degrees
}

export interface ScrapbookPageData {
  id: string;
  title: string;
  background: string; // Tailwind bg class
  objects: ScrapbookObject[];
}

export interface GifGift {
  id: string;
  title: string;
  url: string;
  scheduledDate?: string;
  sentBy: 'user' | 'partner';
  message: string;
  timestamp: string;
}

export interface FlowerType {
  id: string;
  name: string;
  color: string;
  emoji: string;
  meaning: string;
}

export interface BouquetDesign {
  flowers: { [key: string]: number }; // ID -> Count
  wrapping: string; // Kraft, Ribbon, Elegant Lace
  ribbonColor: string;
  giftCard: string;
}

export interface Soundtrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src?: string;
  albumArt: string;
  category: 'romantic' | 'cozy' | 'lofi' | 'classic';
}

export interface Movie {
  id: string;
  title: string;
  year: string;
  rating: string;
  genre: string;
  description: string;
  imageUrl: string;
  recommendationQuote: string;
  category: 'classic' | 'comedy' | 'anime' | 'sad-sweet';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'partner';
  text: string;
  timestamp: string;
  reaction?: string;
}

export interface DailyLoveNote {
  day: string;
  note: string;
  author: string;
  isUnlocked: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'gift' | 'scrapbook' | 'anniversary' | 'chat';
}
