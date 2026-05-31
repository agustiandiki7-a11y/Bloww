export type LanguageCode = 'en' | 'id' | 'fr' | 'es' | 'ja' | 'ko' | 'de';

export interface LanguagePack {
  tabDashboard: string;
  tabScrapbook: string;
  tabWallpaper: string;
  tabBouquet: string;
  tabMusic: string;
  tabMovies: string;
  tabChat: string;
  tabSubscription: string;
  tabSettings: string;
  tabGifts?: string;
  tabRadar?: string;
  
  tagline: string;
  welcomeBloomy: string;
  
  // Dashboard translations
  greetingDuo: string;
  connectedAs: string;
  loveCounter: string;
  anniversaryCountdown: string;
  daysTogether: string;
  daysRemaining: string;
  quickActions: string;
  recentStories: string;
  sendSparkBurst: string;
  dailyLoveNotes: string;
  bloomyTitle: string;
  
  // Custom dialogs & messages
  preparingFlowers: string;
  collectingMemories: string;
  wrappingGifts: string;
  addingRomanticMagic: string;
  allQuietInGarden: string;
  
  // settings page
  settingsTitle: string;
  settingsSub: string;
  languageSelectLabel: string;
  companionConfig: string;
  yourNickname: string;
  partnerNickname: string;
  anniversaryLabel: string;
  exoticSkins: string;
  systemAlerts: string;
  playSoundsLabel: string;
  allowSparksLabel: string;
  wipeDataHeadline: string;
  wipeWarning: string;
  wipeBtn: string;
  logoutBtn: string;
  applySyncBtn: string;
  
  // flower bouquet
  bouquetTitle: string;
  bouquetIntro: string;
  wrappingStyle: string;
  ribbonColor: string;
  noteCardMsg: string;
  addToBouquet: string;
  bouquetPreview: string;

  // wallpaper
  wallpaperTitle: string;
  wallpaperIntro: string;
  customTextLabel: string;
  selectStickers: string;
  exportHd: string;
  phonePreview: string;

  // music
  musicTitle: string;
  musicIntro: string;
  playingLabel: string;

  // movies
  movieTitle: string;
  movieIntro: string;
  movieCategory: string;
}

export const LANGUAGES_INFO = [
  { code: 'en' as LanguageCode, name: 'English (US)', flag: '🇺🇸', local: 'English' },
  { code: 'id' as LanguageCode, name: 'Bahasa Indonesia', flag: '🇮🇩', local: 'Indonesian' },
  { code: 'fr' as LanguageCode, name: 'Français', flag: '🇫🇷', local: 'French' },
  { code: 'es' as LanguageCode, name: 'Español', flag: '🇪🇸', local: 'Spanish' },
  { code: 'ja' as LanguageCode, name: '日本語', flag: '🇯🇵', local: 'Japanese' },
  { code: 'ko' as LanguageCode, name: '한국어', flag: '🇰🇷', local: 'Korean' },
  { code: 'de' as LanguageCode, name: 'Deutsch', flag: '🇩🇪', local: 'German' }
];

export const TRANSLATIONS: Record<LanguageCode, LanguagePack> = {
  en: {
    tabDashboard: "Dashboard",
    tabScrapbook: "Scrapbook Creator",
    tabWallpaper: "Wallpaper Creator",
    tabBouquet: "Bouquet Builder",
    tabMusic: "Romantic Soundtracks",
    tabMovies: "Movie Date Planner",
    tabChat: "Confidential Chat",
    tabSubscription: "LoveBloom Premium",
    tabSettings: "Workspace Settings",
    tabGifts: "Surprise Gifts",
    tabRadar: "Love Radar Map",
    
    tagline: "Turn your feelings into beautiful digital memories.",
    welcomeBloomy: "Welcome back! Let's plant beautiful romantic memories together.",
    
    greetingDuo: "Hello, Beautiful Duo!",
    connectedAs: "Connected in Love",
    loveCounter: "Love State Clicks",
    anniversaryCountdown: "Next Anniversary Countdown",
    daysTogether: "Days of Devotion Together",
    daysRemaining: "days remaining until sweet celebrations",
    quickActions: "Quick Romantic Actions",
    recentStories: "Recent Memory Sparks",
    sendSparkBurst: "Spark Instant Hearts Burst",
    dailyLoveNotes: "Unlocked Daily Love Notes",
    bloomyTitle: "Bloomy",
    
    preparingFlowers: "Preparing flowers 🌷",
    collectingMemories: "Collecting sweet memories 💕",
    wrappingGifts: "Wrapping surprise gifts 🎁",
    addingRomanticMagic: "Adding romantic magic ✨",
    allQuietInGarden: "All quiet in our love garden. Press 'Spark Instant Hearts' to send fireworks!",
    
    settingsTitle: "Lover Space Settings",
    settingsSub: "Fine-tune anniversary dates, custom profiles, and select languages",
    languageSelectLabel: "System Interface Language",
    companionConfig: "Companion Profile Settings",
    yourNickname: "Your Personal Nickname",
    partnerNickname: "Your Sweet Partner's Nickname",
    anniversaryLabel: "Anniversary Dating Date",
    exoticSkins: "Exotic Theme Interface Skins",
    systemAlerts: "Cozy Alerts & Signal Settings",
    playSoundsLabel: "Play nostalgic audio alert sounds & background music",
    allowSparksLabel: "Allow instantaneous partner graphic sparks",
    wipeDataHeadline: "Dangerous Clean & Flush Zone",
    wipeWarning: "Flushing deletes all drafts, scrapbooks, and profile dates forever.",
    wipeBtn: "Reset LoveBloom Workspace",
    logoutBtn: "Exit Space",
    applySyncBtn: "Apply Companion Sync Locks",

    bouquetTitle: "Handcrafted Bouquet Builder",
    bouquetIntro: "Assemble premium virtual arrangements of fresh red roses, peaches, tulips, & sunflowers wrapped in elegant customized laces.",
    wrappingStyle: "Custom wrapping paper aesthetic",
    ribbonColor: "Satin Ribbon tie color",
    noteCardMsg: "Tuck in a heartfelt handwritten note",
    addToBouquet: "Synthesize more flora",
    bouquetPreview: "Current bouquet compilation mockup",

    wallpaperTitle: "Adorable Lockscreens Creator",
    wallpaperIntro: "Create custom phone setups pairing sweet background palettes, stickers, and initials for you and your beloved.",
    customTextLabel: "Interactive lockscreen title text",
    selectStickers: "Sticker badges palette",
    exportHd: "Export High Resolution PNG",
    phonePreview: "Simulated Phone Lockscreen preview",

    musicTitle: "Cozy Shared Soundtracks",
    musicIntro: "Connect your Spotify or queue up Lovebloom's premium tape recorder library for elegant ambient lofi music.",
    playingLabel: "Resonating track",

    movieTitle: "Cozy Cinematic Watchlist",
    movieIntro: "Discover sweet handpicked movie recommendations sorted by category with integrated rating counters and mood filters.",
    movieCategory: "Selected cinematic themes"
  },
  id: {
    tabDashboard: "Dasbor Utama",
    tabScrapbook: "Album Kolase Foto",
    tabWallpaper: "Pembuat Wallpaper HP",
    tabBouquet: "Rangkaian Buket Bunga",
    tabMusic: "Lagu Romantis",
    tabMovies: "Rencana Nonton Bareng",
    tabChat: "Pesan Rahasia Pasangan",
    tabSubscription: "LoveBloom Premium",
    tabSettings: "Pengaturan Ruang",
    tabGifts: "Kado Kejutan",
    tabRadar: "Radar Cinta Pasangan",
    
    tagline: "Ubah perasaanmu menjadi memori digital yang indah.",
    welcomeBloomy: "Selamat datang kembali! Yuk tanam bunga memori indah kita bareng Bloomy.",
    
    greetingDuo: "Halo, Pasangan Bahagia!",
    connectedAs: "Terhubung dalam Kasih",
    loveCounter: "Klik Sinyal Love",
    anniversaryCountdown: "Hitung Mundur Anniversary",
    daysTogether: "Hari Setia Bersama",
    daysRemaining: "hari tersisa menuju perayaan manis kita",
    quickActions: "Tindakan Cepat Pasangan",
    recentStories: "Aktivitas Romantis Baru-baru Ini",
    sendSparkBurst: "Kirim Semburan Love Melayang",
    dailyLoveNotes: "Catatan Cinta Harian Unlocked",
    bloomyTitle: "Bloomy",
    
    preparingFlowers: "Menyiapkan bunga-bunga segar 🌷",
    collectingMemories: "Mengumpulkan memori manis 💕",
    wrappingGifts: "Membungkus kado kejutan 🎁",
    addingRomanticMagic: "Menambahkan sihir romantis ✨",
    allQuietInGarden: "Semua sunyi di taman cinta kita. Klik 'Kirim Semburan Love' untuk menyalakan kembang api!",
    
    settingsTitle: "Pengaturan Ruang Cinta",
    settingsSub: "Atur tanggal jadi, nama panggilan, tema warna, dan pilihan bahasa",
    languageSelectLabel: "Bahasa Tampilan Sistem",
    companionConfig: "Informasi Profil Pasangan",
    yourNickname: "Nama Panggilan Kamu",
    partnerNickname: "Nama Panggilan Si Dia",
    anniversaryLabel: "Tanggal Jadian Jantung Hati",
    exoticSkins: "Palet Warna Hiasan Indah",
    systemAlerts: "Pengaturan Bunyi & Notifikasi",
    playSoundsLabel: "Mainkan musik ambient lofi dan bunyi klik tombol",
    allowSparksLabel: "Ijinkan partikel cinta melayang mendarat di layar partner",
    wipeDataHeadline: "Zona Bahaya Bersihkan Data",
    wipeWarning: "Mereset akan menghapus seluruh scrapbooks, buket bunga, dan data profil selamanya.",
    wipeBtn: "Reset Seluruh Ruang Kerja",
    logoutBtn: "Keluar Orbit",
    applySyncBtn: "Simpan Sinkronisasi Profil",

    bouquetTitle: "Rangkaian Buket Bunga Cantik",
    bouquetIntro: "Rangkai bunga virtual premium berupa mawar merah, tulip peach, dan bunga matahari yang dibungkus renda kain mewah.",
    wrappingStyle: "Kertas pembungkus estetis",
    ribbonColor: "Warna pita satin",
    noteCardMsg: "Tulis ucapan tulisan tangan romantis",
    addToBouquet: "Tambah kelopak bunga",
    bouquetPreview: "Pratinjau Buket Rangkaianmu",

    wallpaperTitle: "Pembuat Wallpaper Layar HP",
    wallpaperIntro: "Desain wallpaper lockscreen ponsel lucu berpasangan dengan kombinasi warna pastel, stiker gemas, dan inisial nama.",
    customTextLabel: "Teks label layar ponsel",
    selectStickers: "Pilihan lencana stiker",
    exportHd: "Ekspor Kualitas Tinggi HD PNG",
    phonePreview: "Simulated Pratinjau Layar Handphone",

    musicTitle: "Lagu & Musik Pengiring Sunyi",
    musicIntro: "Mainkan daftar romantis Spotify atau rekam kaset pita instan Lovebloom untuk menemani kalian membaca bersama.",
    playingLabel: "Musik berputar",

    movieTitle: "Daftar Rencana Nonton Bareng",
    movieIntro: "Temukan rekomendasi film terbaik pilihan Bloomy yang sudah dikelompokkan sesuai suasana hati romantis.",
    movieCategory: "Kategori sinema terpilih"
  },
  fr: {
    tabDashboard: "Tableau de Bord",
    tabScrapbook: "Album Scrapbook",
    tabWallpaper: "Créateur Fonds",
    tabBouquet: "Bouquet de Fleurs",
    tabMusic: "Bandes Sonores",
    tabMovies: "Planificateur Cinéma",
    tabChat: "Chat Privé",
    tabSubscription: "LoveBloom Premium",
    tabSettings: "Paramètres",
    
    tagline: "Transformez vos sentiments en de magnifiques souvenirs numériques.",
    welcomeBloomy: "Bon retour! Plantons ensemble de magnifiques souvenirs romantiques.",
    
    greetingDuo: "Bonjour, Magnifique Duo !",
    connectedAs: "Connectés par l'amour",
    loveCounter: "Indicateurs d'affection",
    anniversaryCountdown: "Compte à rebours du prochain anniversaire",
    daysTogether: "Jours de dévotion partagés",
    daysRemaining: "jours restants avant de fêter notre amour",
    quickActions: "Actions Passionnées Rapides",
    recentStories: "Signaux récents",
    sendSparkBurst: "Lancer une explosion de cœurs",
    dailyLoveNotes: "Notes quotidiennes déverrouillées",
    bloomyTitle: "Bloomy",
    
    preparingFlowers: "Préparation des fleurs 🌷",
    collectingMemories: "Collecte des doux souvenirs 💕",
    wrappingGifts: "Emballage des cadeaux surprises 🎁",
    addingRomanticMagic: "Ajout de magie romantique ✨",
    allQuietInGarden: "Tout est calme dans le jardin de l'amour. Appuyez sur le bouton pour animer l'écran !",
    
    settingsTitle: "Paramètres de votre Espace",
    settingsSub: "Ajustez vos dates d'anniversaire, surnoms, thèmes et langues",
    languageSelectLabel: "Langue de l'interface",
    companionConfig: "Configurations de profil",
    yourNickname: "Votre Surnom Personnel",
    partnerNickname: "Surnom de votre Partenaire",
    anniversaryLabel: "Date de votre rencontre",
    exoticSkins: "Styles et couleurs thématiques",
    systemAlerts: "Alertes et Sons du Système",
    playSoundsLabel: "Jouer la musique lofi en arrière-plan et les sons du clic",
    allowSparksLabel: "Autoriser l'affichage instantané des cœurs du partenaire",
    wipeDataHeadline: "Effacer l'historique complet",
    wipeWarning: "Effacer détruira à jamais tous vos scrapbooks, fonds d'écran et profils.",
    wipeBtn: "Réinitialiser tout l'espace",
    logoutBtn: "Quitter l'espace",
    applySyncBtn: "Appliquer la synchronisation",

    bouquetTitle: "Atelier Bouquet Floral",
    bouquetIntro: "Composez de magnifiques bouquets virtuels de roses rouges, tulipes et tournesols drapés de magnifiques rubans.",
    wrappingStyle: "Style d'emballage cadeau",
    ribbonColor: "Couleur du ruban de satin",
    noteCardMsg: "Écrire un mot doux pour accompagner",
    addToBouquet: "Ajouter des fleurs",
    bouquetPreview: "Aperçu en temps réel",

    wallpaperTitle: "Fonds d'écran assortis",
    wallpaperIntro: "Générez d'adorables fonds d'écran de verrouillage avec vos initiales et de jolis stickers pastel.",
    customTextLabel: "Texte personnalisé affiché",
    selectStickers: "Palette de jolis autocollants",
    exportHd: "Exporter en Haute Définition",
    phonePreview: "Aperçu simulé du téléphone",

    musicTitle: "Sons Romantiques & Ambiance",
    musicIntro: "Connectez votre Spotify ou lancez les douces mélodies de notre enregistreur de cassette LoveBloom.",
    playingLabel: "Chanson en cours",

    movieTitle: "Soirées Ciné en Duo",
    movieIntro: "Découvrez de merveilleuses suggestions de films classées par genre pour des soirées inoubliables.",
    movieCategory: "Catégories thématiques"
  },
  es: {
    tabDashboard: "Tablero Principal",
    tabScrapbook: "Creador de Álbum",
    tabWallpaper: "Fondo de Pantalla",
    tabBouquet: "Diseñador de Ramos",
    tabMusic: "Bandas Sonoras",
    tabMovies: "Citas de Película",
    tabChat: "Chat Privado",
    tabSubscription: "LoveBloom Premium",
    tabSettings: "Ajustes del Especio",
    
    tagline: "Convierte tus sentimientos en hermosos recuerdos digitales.",
    welcomeBloomy: "¡Bienvenido de vuelta! Plantemos tiernos recuerdos junto a Bloomy.",
    
    greetingDuo: "¡Hola, Hermoso Dúo!",
    connectedAs: "Conectados con Amor",
    loveCounter: "Toques Cósmicos de Amor",
    anniversaryCountdown: "Cuenta Atrás para el Aniversario",
    daysTogether: "Días de Devoción Juntos",
    daysRemaining: "días restantes para nuestra gran celebración",
    quickActions: "Acciones de Cariño Rápido",
    recentStories: "Destellos de Amor Recientes",
    sendSparkBurst: "Lanzar Ráfaga de Corazones",
    dailyLoveNotes: "Cartas de Amor Diarias Desbloqueadas",
    bloomyTitle: "Bloomy",
    
    preparingFlowers: "Preparando hermosas flores 🌷",
    collectingMemories: "Recolectando dulces recuerdos 💕",
    wrappingGifts: "Envolviendo vuestros regalos 🎁",
    addingRomanticMagic: "Inyectando magia romántica ✨",
    allQuietInGarden: "Todo en silencio en el jardín. ¡Haz clic en enviar destellos para enviar fuegos artificiales!",
    
    settingsTitle: "Ajustes de LoveBloom",
    settingsSub: "Personaliza tus nombres, la fecha de aniversario, la paleta y el idioma",
    languageSelectLabel: "Idioma del Sistema",
    companionConfig: "Configuración de Perfiles",
    yourNickname: "Tu Surnombre Personal",
    partnerNickname: "Surnombre de tu Alma Gemela",
    anniversaryLabel: "Fecha del Aniversario",
    exoticSkins: "Temas y Aspectos Exclusivos",
    systemAlerts: "Ajustes de Notificaciones y Audio",
    playSoundsLabel: "Reproducir música lofi de fondo y efectos al hacer clic",
    allowSparksLabel: "Ver explosiones de corazones de mi pareja en tiempo real",
    wipeDataHeadline: "Zona Peligrosa de Borrado",
    wipeWarning: "Esto borrará de forma irreversible todas vuestras cartas, álbumes y ramos creados.",
    wipeBtn: "Borrar todo el espacio",
    logoutBtn: "Cerrar Sesión",
    applySyncBtn: "Aplicar Cambios de Sincronización",

    bouquetTitle: "Atelier de Flores Virtuales",
    bouquetIntro: "Diseña hermosos arreglos florales con rosas, tulipanes y girasoles acompañados de un mensaje personalizado de amor.",
    wrappingStyle: "Estilo del papel decorativo",
    ribbonColor: "Color de la cinta de raso",
    noteCardMsg: "Escribe una carta de amor sincera",
    addToBouquet: "Añadir más flores",
    bouquetPreview: "Vista de tu ramo diseñado",

    wallpaperTitle: "Creador de Fondos de Pantalla",
    wallpaperIntro: "Diseña divertidos fondos acoplados con vuestros nombres, stickers bonitos y fondos románticos de ensueño.",
    customTextLabel: "Texto personalizado de bloqueo",
    selectStickers: "Estampitas y pegatinas",
    exportHd: "Exportar PNG en Alta Resolución",
    phonePreview: "Vista simulada en teléfono móvil",

    musicTitle: "Colección Musical de Amor",
    musicIntro: "Conecta tu reproductor Spotify o enciende la hermosa cassette ambiental de LoveBloom.",
    playingLabel: "Escuchando ahora",

    movieTitle: "Recomendaciones Cinéfilas",
    movieIntro: "Explora películas románticas categorizadas por ambiente para vuestra próxima noche acogedora de mantas y palomitas.",
    movieCategory: "Estilo cinematográfico"
  },
  ja: {
    tabDashboard: "ダッシュボード",
    tabScrapbook: "スクラップブック",
    tabWallpaper: "壁紙クリエイター",
    tabBouquet: "フラワーブーケ",
    tabMusic: "ロマンチック音楽",
    tabMovies: "映画デート計画",
    tabChat: "二人だけの秘密チャット",
    tabSubscription: "プレミアムメンバー",
    tabSettings: "スペース設定",
    
    tagline: "二人の大切な思い出を、美しいデジタルアートに。",
    welcomeBloomy: "おかえりなさい！ブルーミー🌷と一緒に、甘い思い出をたくさん咲かせましょう。",
    
    greetingDuo: "こんにちは、素敵な二人！",
    connectedAs: "愛でつながっています",
    loveCounter: "ラブ・シグナル数",
    anniversaryCountdown: "記念日までのカウントダウン",
    daysTogether: "共に歩んできた愛の日数",
    daysRemaining: "記念日まであと何日",
    quickActions: "クイック・ロマンス・アクション",
    recentStories: "最近の愛のスパーク",
    sendSparkBurst: "ハートのシャワーを降らせる",
    dailyLoveNotes: "アンロックされた愛のメッセージ",
    bloomyTitle: "ブルーミー",
    
    preparingFlowers: "素敵なお花を用意しています 🌷",
    collectingMemories: "愛の思い出を集めています 💕",
    wrappingGifts: "ギフトを可愛く包んでいます 🎁",
    addingRomanticMagic: "魔法をちょっぴりかけています ✨",
    allQuietInGarden: "お庭は静かです。「ハートを降らせる」ボタンで盛り上げてみましょう！",
    
    settingsTitle: "スペース環境カスタム",
    settingsSub: "記念日の日付、愛称、インターフェースカラー、言語を設定します",
    languageSelectLabel: "システム表示言語",
    companionConfig: "プロフィール愛称設定",
    yourNickname: "あなたのニックネーム",
    partnerNickname: "パートナーのニックネーム",
    anniversaryLabel: "お付き合いを始めた記念日",
    exoticSkins: "特別なカスタムテーマカラー",
    systemAlerts: "サウンド・演出通知設定",
    playSoundsLabel: "クリック音やバックグラウンドLofi音楽をオンにする",
    allowSparksLabel: "パートナーから送信されたハートをリアルタイムに降らせる",
    wipeDataHeadline: "危険なデータ初期化領域",
    wipeWarning: "初期化すると、すべてのブーケ、作成中の壁紙、アルバム、日記データが永久に削除されます。",
    wipeBtn: "すべてのデータを削除する",
    logoutBtn: "スペースを退出する",
    applySyncBtn: "設定を完全に適用する",

    bouquetTitle: "手作りフラワーブーケビルダー",
    bouquetIntro: "真っ赤なバラ、チューリップ、ひまわりなど、お好みの花を可愛らしいリボンとレースで包んでプレゼントしましょう。",
    wrappingStyle: "包装紙のスタイル",
    ribbonColor: "サテンリボンの色",
    noteCardMsg: "お手書き風のラブカードを添えて",
    addToBouquet: "お花を増やす",
    bouquetPreview: "現在のブーケ完成見本",

    wallpaperTitle: "お揃いロック画面クリエイター",
    wallpaperIntro: "パステルカラーの背景に、二人のイニシャルとお気に入りの可愛いステッカーを詰めて並べましょう。",
    customTextLabel: "画面に表示する文字ラベル",
    selectStickers: "可愛いステッカーのパレット",
    exportHd: "高画質HD PNGとして書き出す",
    phonePreview: "スマートフォン上のシミュレート画面",

    musicTitle: "静かな愛のBGMシグナル",
    musicIntro: "Spotifyを接続するか、Lovebloomの内蔵カセットデッキで心地の良いLofi音楽を再生します。",
    playingLabel: "の再生中の曲",

    movieTitle: "デート映画シネマプラン",
    movieIntro: "気分やムードに合わせて、二人の夜にぴったりの珠玉のラブロマンス映画をおすすめします。",
    movieCategory: "選ばれたシネマテーマ"
  },
  ko: {
    tabDashboard: "럽 대시보드",
    tabScrapbook: "스크랩북 다이어리",
    tabWallpaper: "커플 배경화면 제작",
    tabBouquet: "디지털 꽃다발 만들기",
    tabMusic: "감성 로맨틱 음악",
    tabMovies: "영화 데이트 플래너",
    tabChat: "비밀 메시지 공간",
    tabSubscription: "러브블룸 프리미엄",
    tabSettings: "우리만의 스페이스 설정",
    
    tagline: "우리의 설레는 마음들을 아름다운 디지털 손글씨와 추억으로 채워요.",
    welcomeBloomy: "반가워요! 블루미와 함께 아름다운 사랑 가꾸기를 시작해볼까요?",
    
    greetingDuo: "안녕하세요, 두 소울메이트님!",
    connectedAs: "사랑으로 늘 하나된 우리",
    loveCounter: "사랑 신호 클릭 수",
    anniversaryCountdown: "다음 주년 기념일 카운트다운",
    daysTogether: "사랑하며 동고동락한 일수",
    daysRemaining: "기념일까지 남아있는 예쁜 날들",
    quickActions: "달콤 커플 퀵 액션",
    recentStories: "최근 보낸 전파 메시지들",
    sendSparkBurst: "화면에 하트 비 뿌리기",
    dailyLoveNotes: "우리의 일일 사랑 교환 우체통",
    bloomyTitle: "블루미",
    
    preparingFlowers: "싱그러운 꽃들을 다듬는 중 🌷",
    collectingMemories: "달콤한 기억들을 앨범에 모으는 중 💕",
    wrappingGifts: "깜짝 리본 상자를 포장하는 중 🎁",
    addingRomanticMagic: "비밀스러운 사랑 마법을 입히는 중 ✨",
    allQuietInGarden: "정원이 정말 평화롭습니다. 하트 뿌리기 버튼을 눌러보세요!",
    
    settingsTitle: "스페이스 종합 세팅",
    settingsSub: "기념일 날짜, 각자의 애칭, 테마 모드 및 언어 팩을 관리합니다",
    languageSelectLabel: "시스템 다국어 언어",
    companionConfig: "프로필 애칭 설정",
    yourNickname: "나를 부르는 애칭",
    partnerNickname: "상대방을 부르는 애칭",
    anniversaryLabel: "처음 알콩달콩해진 날짜",
    exoticSkins: "커플 전용 테마 스킨",
    systemAlerts: "알림 및 사운드 구성",
    playSoundsLabel: "버튼 조작 사운드 및 잔잔한 미니 음악 배경 재생",
    allowSparksLabel: "파트너가 뿜어내는 실시간 하트 폭죽 활성화",
    wipeDataHeadline: "데이터 초기화 주의 영역",
    wipeWarning: "초기화 시 만들어둔 스크랩북 화면 및 꽃다발 편지가 복구 불가 삭제됩니다.",
    wipeBtn: "우리의 소중한 데이터 초기화",
    logoutBtn: "우체통 로그아웃",
    applySyncBtn: "동기화된 프로필 적용",

    bouquetTitle: "디지털 핸드메이드 부케 빌더",
    bouquetIntro: "새빨간 장미, 화사한 튤립, 해바라기 줄기를 취향에 맞춰 고급 격자 리본지에 포개어 보세요.",
    wrappingStyle: "포장 재질 디자인 스타일",
    ribbonColor: "포인트 실크 리본 컬러",
    noteCardMsg: "진심을 전할 달콤 편지 카드 작성",
    addToBouquet: "꽃송이 피워올리기",
    bouquetPreview: "꽃다발 완성 시뮬레이션",

    wallpaperTitle: "사랑 충만 락스크린 폰배경",
    wallpaperIntro: "달콤한 파스텔톤 배경지 원단 위에 아기자기한 이모티콘 자수와 연인의 이름들을 마음껏 담으세요.",
    customTextLabel: "잠금화면에 띄울 영문 폰트 텍스트",
    selectStickers: "배치용 예쁜 스티커 배지들",
    exportHd: "고화질 무압축 HD 다운로드",
    phonePreview: "내 손바닥 위 폰 시뮬레이터",

    musicTitle: "로맨틱 감성 테이프 사운드",
    musicIntro: "스포티파이 동기화를 체험하거나, 러브블룸의 엄선된 따뜻한 Lofi 오르골 카세트 음질을 청취하세요.",
    playingLabel: "선곡되어 플레이 중인 럽송",

    movieTitle: "우리만의 시네마 초이스",
    movieIntro: "특별하게 엄선된 영화나 일본 애니메이션 로맨스 등 둘이 이불 속에서 볼 작품들을 소개합니다.",
    movieCategory: "분위기별 작품 분류군"
  },
  de: {
    tabDashboard: "Partner-Zentrale",
    tabScrapbook: "Sammelalbum",
    tabWallpaper: "Hintergrund-Designer",
    tabBouquet: "Blumenstrauß-Studio",
    tabMusic: "Romantische Musik",
    tabMovies: "Kino-Date-Planer",
    tabChat: "Privater Liebes-Chat",
    tabSubscription: "LoveBloom Premium",
    tabSettings: "Einstellungen",
    
    tagline: "Verwandle deine Gefühle in wunderschöne digitale Erinnerungen.",
    welcomeBloomy: "Willkommen zurück! Lass uns gemeinsam mit Bloomy🌷 zarte Erinnerungen pflanzen.",
    
    greetingDuo: "Hallo, wundervolles Paar!",
    connectedAs: "In Liebe verbunden",
    loveCounter: "Klicks der Zuneigung",
    anniversaryCountdown: "Nächster Jahrestag Countdown",
    daysTogether: "Gemeinsame Tage der Zuneigung",
    daysRemaining: "Tage verbleibend bis zur Feier",
    quickActions: "Schnelle romantische Aktionen",
    recentStories: "Kürzliche Liebes-Signale",
    sendSparkBurst: "Herzen-Explosion auslösen",
    dailyLoveNotes: "Freigeschaltete Liebesbriefe",
    bloomyTitle: "Bloomy",
    
    preparingFlowers: "Bereite frische Blumen vor 🌷",
    collectingMemories: "Sammle süße Erinnerungen 💕",
    wrappingGifts: "Verpacke Überraschungsgeschenke 🎁",
    addingRomanticMagic: "Füge romantischen Zauber hinzu ✨",
    allQuietInGarden: "Alles ruhig im Liebesgarten. Klicke auf 'Explosion' für ein Feuerwerk der Liebe!",
    
    settingsTitle: "Espace-Einstellungen",
    settingsSub: "Passe Namen, Jahrestag, Farbpaletten und Systemsprache an",
    languageSelectLabel: "Systemsprache einstellen",
    companionConfig: "Profileinstellungen",
    yourNickname: "Dein persönlicher Name",
    partnerNickname: "Spitzname deines Schatzes",
    anniversaryLabel: "Datum des Kennenlernens",
    exoticSkins: "Exklusive Farben & Designs",
    systemAlerts: "Benachrichtigungen & Audio",
    playSoundsLabel: "Lofi-Raumklänge und Ton-Feedback abspielen",
    allowSparksLabel: "Herzen von Partner sofort auf dem Bildschirm anzeigen",
    wipeDataHeadline: "Gefahrenzone: Daten löschen",
    wipeWarning: "Das Löschen entfernt alle Sammelalben, erstellte Tapeten und Blumensträuße dauerhaft.",
    wipeBtn: "Gesamten Speicher löschen",
    logoutBtn: "Verbindung trennen",
    applySyncBtn: "Änderungen anwenden",

    bouquetTitle: "Virtueller Blumenstrauß-Planer",
    bouquetIntro: "Gestalte opulente Sträuße aus roten Rosen,Tulpen & Sonnenblumen, geschmückt mit Schleifen deiner Wahl.",
    wrappingStyle: "Aromatisches Geschenkpapier-Design",
    ribbonColor: "Farbe der Satinschleife",
    noteCardMsg: "Schreibe eine herzerwärmende Notiz",
    addToBouquet: "Mehr Blüten hinzufügen",
    bouquetPreview: "Echtzeit-Vorschau des Straußes",

    wallpaperTitle: "Kreativer Lockscreen-Vorschauer",
    wallpaperIntro: "Hinterlasse dekorative Initialen und niedliche Sticker auf passenden Handy-Hintergründen für euch beide.",
    customTextLabel: "Sperrbildschirm-Textbeschriftung",
    selectStickers: "Satz niedlicher Sticker",
    exportHd: "Hintergrund in HD exportieren",
    phonePreview: "Handy-Display Vorschau",

    musicTitle: "Sanfte Hintergrundrhythmen",
    musicIntro: "Koppele dein reales Spotify oder starte Loveblooms entspannenden Kassettenrekorder für besten Lofi-Sound.",
    playingLabel: "Wird abgespielt",

    movieTitle: "Filmempfehlungen für zwei",
    movieIntro: "Entdecke von Bloomy sorgfältig ausgewählte Liebesgeschichten geordnet nach behaglicher Feierabendstimmung.",
    movieCategory: "Empfohlener Genrestil"
  }
};
