import { Soundtrack, Movie, DailyLoveNote } from './types';

export const ROMANTIC_QUOTES = [
  { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou" },
  { text: "My heart is and always will be yours.", author: "Jane Austen" },
  { text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.", author: "Leo Christopher" },
  { text: "If I know what love is, it is because of you.", author: "Hermann Hesse" },
  { text: "We loved with a love that was more than love.", author: "Edgar Allan Poe" },
  { text: "I want to be your favorite hello and your hardest goodbye.", author: "Unknown" },
  { text: "Loved you yesterday, love you still, always have, always will.", author: "Unknown" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" }
];

export const PRESEEDED_GIFS = [
  { id: 'gif1', title: 'Fluffy Bear Hugs', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3YweWk1cWRlbnM0c3FkNm93MHJrMGZkYWppNnc0aGcxN25hdTZ2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vz58J8shPXf7jDt4SW/giphy.gif', tags: ['hug', 'cute', 'cuddle'] },
  { id: 'gif2', title: 'Sweet Forehead Kiss', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHgzcWdheGNkcmttdGlxbTNzNnl6NXp2M2RzM21iaXBmOHMxbDZ4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xALRf1vMecbXST/giphy.gif', tags: ['kiss', 'sweet', 'love'] },
  { id: 'gif3', title: 'Peeking Heart Surprise', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3MExiaTh2cmYyam5zODF6bWhxazVkZGtoZDFxNW90eTBia3A3MGM4cmYmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJnN0PXM/l4pTaffWpkwZlK5W0/giphy.gif', tags: ['heart', 'love', 'happy'] },
  { id: 'gif4', title: 'Clinging Kitty Hug', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXE0MTcwbndrNXp1ejJtZTRhbXpveXBnZ3h0dGE1NzBxMW53MzE4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k9Jw0MW9TV6Dbewyx2/giphy.gif', tags: ['cute', 'cat', 'cuddle'] },
  { id: 'gif5', title: 'Heart Shower Balloon', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzhncTNldmcyNWxpdWhzdjdrMHdyaXU0amRnbXN1dzl5ZGtkYndmbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y34mR8YB68310hpvkV/giphy.gif', tags: ['heart', 'rose', 'love'] },
  { id: 'gif6', title: 'Cozy Tea Under Blankets', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDVyMnk1MmNoYTVnZmRmeXZxN3FrbHZpaTJrZHpnamt6ZjAwamZ1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R8H9T91dID0h8a98N3/giphy.gif', tags: ['cozy', 'winter', 'cuddle'] },
  { id: 'gif7', title: 'Cheek Squish Kiss', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3MExmMXo5dGdtMDF3ZG9lcm5wdW94M215eTY5bGlrNXpsZjVvM2lzZ2gmc3Q9cw/X8Tdf08f62nsc/giphy.gif', tags: ['kiss', 'funny', 'cute'] },
  { id: 'gif8', title: 'Sparkling Rose Drop', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9zbWZreHFpYjMybW5hbXdwN3k3OTBmeDN5dHB4aWphemloMHU3cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EF9sh596p9Q3u/giphy.gif', tags: ['flower', 'love', 'sparkle'] }
];

export const PRESEEDED_SONGS: Soundtrack[] = [
  {
    id: 's1',
    title: 'Warm Coffee & You',
    artist: 'Cozy Lofi Duo',
    duration: '2:45',
    albumArt: '☕',
    category: 'lofi'
  },
  {
    id: 's2',
    title: 'Midnight Stardust Waltz',
    artist: 'Whispering Strings',
    duration: '3:12',
    albumArt: '✨',
    category: 'romantic'
  },
  {
    id: 's3',
    title: 'Rainy Afternoon Hugs',
    artist: 'Melody Piano Trio',
    duration: '2:58',
    albumArt: '🌧️',
    category: 'cozy'
  },
  {
    id: 's4',
    title: 'Love Letters on Pastel Paper',
    artist: 'Acoustic Heartbeats',
    duration: '3:30',
    albumArt: '💌',
    category: 'romantic'
  },
  {
    id: 's5',
    title: 'Claire de Lune (Sweet Remix)',
    artist: 'Claude Lofi',
    duration: '4:15',
    albumArt: '🌙',
    category: 'classic'
  },
  {
    id: 's6',
    title: 'Picnic Under the Cherry Tree',
    artist: 'Sunbeam Whistlers',
    duration: '2:24',
    albumArt: '🌸',
    category: 'cozy'
  }
];

export const PRESEEDED_MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'About Time',
    year: '2013',
    rating: 'PG-13',
    genre: 'Romance / Drama / Fantasy',
    description: 'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out to have unexpected consequences.',
    imageUrl: '⏳',
    recommendationQuote: "A beautiful lesson on appreciating every single ordinary day together.",
    category: 'classic'
  },
  {
    id: 'm2',
    title: 'Your Name (Kimi no Na wa)',
    year: '2016',
    rating: 'PG',
    genre: 'Anime / Fantasy / Romance',
    description: 'Two strangers find themselves linked in a bizarre way. When a connection is formed, will distance be the only thing to keep them apart?',
    imageUrl: '☄️',
    recommendationQuote: "Stunning visuals and an emotional cosmic connection that will make you squeeze hands.",
    category: 'anime'
  },
  {
    id: 'm3',
    title: 'Pride & Prejudice',
    year: '2005',
    rating: 'PG',
    genre: 'Period Romance / Drama',
    description: 'Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.',
    imageUrl: '🏛️',
    recommendationQuote: "The ultimate classic romance. Pure rain-soaked declarations and glances.",
    category: 'classic'
  },
  {
    id: 'm4',
    title: 'La La Land',
    year: '2016',
    rating: 'PG-13',
    genre: 'Musical / Romance',
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    imageUrl: '💃',
    recommendationQuote: "Gorgeous colors, jazz tunes, and bittersweet dedication to following your dreams.",
    category: 'sad-sweet'
  },
  {
    id: 'm5',
    title: '500 Days of Summer',
    year: '2009',
    rating: 'PG-13',
    genre: 'Indie Comedy / Romance',
    description: 'An offbeat romantic comedy about a woman who doesn\'t believe true love exists, and the young man who falls for her.',
    imageUrl: '🍂',
    recommendationQuote: "A fun, realistic look at love, expectations, and sweet memories.",
    category: 'comedy'
  },
  {
    id: 'm6',
    title: 'Howl\'s Moving Castle',
    year: '2004',
    rating: 'PG',
    genre: 'Anime / Fantasy / Romance',
    description: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.',
    imageUrl: '🏰',
    recommendationQuote: "Sophie and Howl teach us how loving someone brings out the courage to save them.",
    category: 'anime'
  }
];

export const INITIAL_DAILY_NOTES: DailyLoveNote[] = [
  { day: 'Day 1', note: 'You are my favorite notification in a world full of messages. 📱💖', author: 'Your Partner', isUnlocked: true },
  { day: 'Day 2', note: 'I love you more than hot cocoa with mini marshmallows on a winter evening. ☕✨', author: 'Your Partner', isUnlocked: true },
  { day: 'Day 3', note: 'Your laugh is my absolute favorite playlist on repeat. 🎶🌸', author: 'Your Partner', isUnlocked: true },
  { day: 'Day 4', note: 'Every day spent with you is another gorgeous page in my favorite fairytale book. 📖🏼', author: 'Your Partner', isUnlocked: false },
  { day: 'Day 5', note: 'If we were stars, I would always find a way to align into a constellation next to you. 🌌⭐', author: 'Your Partner', isUnlocked: false },
  { day: 'Day 6', note: 'Thank you for being the calm in my busy storm and the warmth in my cold moments. 🏠🏼', author: 'Your Partner', isUnlocked: false },
  { day: 'Day 7', note: 'My love for you stands higher than the clouds and deeper than any secret ocean. 🌊☁️', author: 'Your Partner', isUnlocked: false }
];

export const MOODS = [
  { emoji: '🥰', name: 'Super Loved' },
  { emoji: '🥺', name: 'Miss You' },
  { emoji: '😴', name: 'Cozy/Sleepy' },
  { emoji: '🍕', name: 'Hungry for Date' },
  { emoji: '🌸', name: 'Happy & Soft' },
  { emoji: '☕', name: 'Calm & Warm' }
];

export const FLOWERS_POOL = [
  { id: 'f1', name: 'Sweetheart Red Rose', color: 'bg-red-500', emoji: '🌹', meaning: 'Eternal Love & Passion' },
  { id: 'f2', name: 'Soft Peach Tulip', color: 'bg-orange-300', emoji: '🌷', meaning: 'Deep Care & Happiness' },
  { id: 'f3', name: 'Gilded Sunflower', color: 'bg-yellow-400', emoji: '🌻', meaning: 'Adoration, Loyalty & Radiance' },
  { id: 'f4', name: 'Cute Daisy', color: 'bg-amber-100', emoji: '🌼', meaning: 'Innocence, Simplicity & Joy' },
  { id: 'f5', name: 'Dreamy Lavender', color: 'bg-purple-300', emoji: '🪻', meaning: 'Serenity, Grace & Devotion' },
  { id: 'f6', name: 'Crimson Hibiscus', color: 'bg-pink-400', emoji: '🌺', meaning: 'Delicate Beauty & Connection' }
];

export const WRAPPINGS = [
  { id: 'w1', name: 'Cozy Brown Kraft Paper', pattern: 'bg-amber-200 border-amber-300 text-amber-900', preview: '🟫' },
  { id: 'w2', name: 'Sweet Pink Bubblewrap', pattern: 'bg-pink-100 border-pink-200 text-pink-700', preview: '🩰' },
  { id: 'w3', name: 'Dreamy Pastel Lavender Mesh', pattern: 'bg-purple-100 border-purple-200 text-purple-700', preview: '🪻' },
  { id: 'w4', name: 'Minimalist Frosty Ribbon Paper', pattern: 'bg-slate-50 border-slate-200 text-slate-800', preview: '🏳️' }
];

export const RIBBONS = [
  { id: 'r1', name: 'Gilded Gold Velvet Ribbon', color: 'bg-amber-400', emoji: '🎗️' },
  { id: 'r2', name: 'Crimson Satin Bow', color: 'bg-red-500', emoji: '🎀' },
  { id: 'r3', name: 'Sweet Lilac Satin Bow', color: 'bg-purple-400', emoji: '🎀' },
  { id: 'r4', name: 'Sky Blue Organza Bow', color: 'bg-sky-400', emoji: '🎀' }
];

export const WALLPAPER_BACKGROUNDS = [
  { id: 'bg1', name: 'Cotton Candy Sunset', style: 'linear-gradient(135deg, #fbcfe8 0%, #fee2e2 50%, #fef3c7 100%)', textLight: false },
  { id: 'bg2', name: 'Midnight Starlight', style: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', textLight: true },
  { id: 'bg3', name: 'Matcha Picnic', style: 'linear-gradient(135deg, #dcfce7 0%, #ecfdf5 100%)', textLight: false },
  { id: 'bg4', name: 'Dreamy Lilac Haze', style: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 50%, #fee2e2 100%)', textLight: false },
  { id: 'bg5', name: 'Warm Cozy Hearth', style: 'linear-gradient(135deg, #ffedd5 0%, #fff7ed 100%)', textLight: false }
];

export const STICKERS_POOL = [
  '❤️', '💖', '✨', '🧸', '🌸', '🐾', '🍿', '🌹', '🥞', '🥐', '🍡', '🍦', '🩰', '🏰', '🎈', '💌', '🌟', '🧁'
];

export const SCRAPBOOK_BACKGROUND_TEMPLATES = [
  { id: 'sb-p1', name: 'Vintage Lace Pastel', bgClass: 'bg-pink-50 border-pink-100' },
  { id: 'sb-p2', name: 'Lofi Starry Midnight', bgClass: 'bg-indigo-950 border-indigo-900 text-white' },
  { id: 'sb-p3', name: 'Sunny Picnic Checked', bgClass: 'bg-radial-gradient from-amber-50 to-orange-100' },
  { id: 'sb-p4', name: 'Cream Letterpress', bgClass: 'bg-stone-100 border-stone-200' }
];
