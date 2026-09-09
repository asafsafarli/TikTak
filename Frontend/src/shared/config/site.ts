// Landing üçün statik məzmun. Funksionallıq sonra API-yə bağlanacaq.

export const HERO_SLIDES = [
  {
    id: "bravo-club",
    tone: "green" as const,
    title: "Bravo Club",
    subtitle: "Alış-verişdə yeni həyəcan!",
    period: null,
    cta: "Ətraflı",
    href: "#",
  },
  {
    id: "yeni-il",
    tone: "red" as const,
    title: "Bravo-da Yeni il endirimləri",
    subtitle: null,
    period: "26 dekabr – 8 yanvar",
    cta: "Ətraflı",
    href: "#",
  },
];

export const SPECIAL_OFFERS = [
  {
    id: "qeyri-qida",
    tone: "stone" as const,
    title: "Qeyri-qidaya endirim!",
    period: "12 dekabr – 8 yanvar",
    badge: "MƏHSUL SEÇİMİ",
    href: "#",
  },
  {
    id: "yeni-il-offer",
    tone: "red" as const,
    title: "Bravo-da Yeni il endirimləri",
    period: "26 dekabr 2024 – 8 yanvar 2025",
    badge: null,
    href: "#",
  },
];

export const COMPANY_STATS = [
  { id: "markets", value: "137", label: "Market sayı", icon: "store" as const },
  { id: "regions", value: "11", label: "Region", icon: "map" as const },
  { id: "products", value: "50000+", label: "Məhsul sayı", icon: "cart" as const },
  { id: "staff", value: "5500+", label: "Əməkdaş sayı", icon: "users" as const },
];

export const FOOTER_SECTIONS = [
  {
    title: "Şirkət",
    links: [
      { label: "Xüsusi təkliflər", href: "#" },
      { label: "Haqqımızda", href: "#" },
      { label: "Kartlar", href: "#" },
      { label: "İcarəyə verməyə yeriniz var?", href: "#" },
      { label: "Xəbərlər", href: "#" },
      { label: "Karyera", href: "#" },
    ],
  },
  {
    title: "Digər",
    links: [
      { label: "Onlayn market", href: "#" },
      { label: "Marketlərimiz", href: "#" },
      { label: "Korporativ satış", href: "#" },
      { label: "Müştəri xidmətləri", href: "#" },
    ],
  },
  {
    title: "Hüquq",
    links: [
      { label: "İstifadə şərtləri", href: "#" },
      { label: "İmtina", href: "#" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { id: "facebook", label: "Facebook", href: "#" },
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "youtube", label: "YouTube", href: "#" },
  { id: "linkedin", label: "LinkedIn", href: "#" },
  { id: "telegram", label: "Telegram", href: "#" },
  { id: "tiktok", label: "TikTok", href: "#" },
  { id: "whatsapp", label: "WhatsApp", href: "#" },
];

export const HEADER_NAV = [
  { label: "Hesabım", href: "#", icon: "user" as const },
  { label: "Siyahılarım", href: "#", icon: "favorites" as const },
  { label: "Səbətim", href: "#", icon: "basket" as const },
];
