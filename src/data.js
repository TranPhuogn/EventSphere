// ─── DATA ────────────────────────────────────────────────────────────────────

export const COLORS = {
  emerald: "#00C853",
  emeraldDark: "#00A040",
  emeraldDim: "#00C85322",
  bg: "#0A0F0D",
  surface: "#111916",
  card: "#151E18",
  border: "#1E2E22",
  text: "#E8F5EC",
  muted: "#7A9A82",
  accent: "#B9FF6A",
};

export const EVENTS = {
  concerts: [
    { id: "c1", title: "SƠNТÙNG M-TP LIVE CONCERT 2025", artist: "Sơn Tùng M-TP", date: "Sat, 15 Mar 2025", time: "19:30", location: "Mỹ Đình National Stadium, Hà Nội", price: "800,000đ", tier: "Standard / VIP / SVIP", genre: "Pop", image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80", featured: true },
    { id: "c2", title: "EDM STORM FESTIVAL", artist: "DJ Snake & Friends", date: "Sun, 22 Mar 2025", time: "20:00", location: "Landmark 81, Hồ Chí Minh", price: "1,200,000đ", tier: "General / VIP", genre: "EDM", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80", featured: true },
    { id: "c3", title: "INDIE NIGHTS VOL. 7", artist: "Various Artists", date: "Fri, 28 Mar 2025", time: "18:00", location: "Hanoi Rock City", price: "250,000đ", tier: "General", genre: "Rock", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80", featured: false },
    { id: "c4", title: "MỸ TÂM ACOUSTIC NIGHT", artist: "Mỹ Tâm", date: "Sat, 5 Apr 2025", time: "20:00", location: "Grand Palace, Đà Nẵng", price: "600,000đ", tier: "Standard / VIP", genre: "Pop", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80", featured: false },
    { id: "c5", title: "JAZZ UNDER THE STARS", artist: "Trần Mạnh Tuấn Quartet", date: "Sun, 13 Apr 2025", time: "19:00", location: "Opera House, Hồ Chí Minh", price: "450,000đ", tier: "General / Premium", genre: "Jazz", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80", featured: false },
    { id: "c6", title: "ROCK IN SAIGON 2025", artist: "Microwave Band + Ngũ Cung", date: "Sat, 19 Apr 2025", time: "18:30", location: "Ký Con Rooftop, Hồ Chí Minh", price: "300,000đ", tier: "General", genre: "Rock", image: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=600&q=80", featured: false },
  ],
  arts: [
    { id: "a1", title: "THE PHANTOM OF THE OPERA", type: "Musical", date: "Fri–Sun, Mar 14–16", time: "19:30", venue: "Nhà Hát Lớn Hà Nội", location: "Hà Nội", price: "500,000đ", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80", featured: true },
    { id: "a2", title: "TRUYỆN KIỀU – VỞ KỊCH", type: "Traditional Theatre", date: "Sat, 22 Mar 2025", time: "20:00", venue: "Nhà Hát Tuổi Trẻ", location: "Hà Nội", price: "200,000đ", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", featured: false },
    { id: "a3", title: "MODERN DANCE: FRAGMENTS", type: "Dance", date: "Sun, 30 Mar 2025", time: "18:30", venue: "IDECAF Theatre", location: "Hồ Chí Minh", price: "350,000đ", image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&q=80", featured: false },
    { id: "a4", title: "HAMLET – SHAKESPEARE REIMAGINED", type: "Drama", date: "Fri, 11 Apr 2025", time: "19:00", venue: "L'Espace", location: "Hà Nội", price: "400,000đ", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80", featured: true },
    { id: "a5", title: "AO SHOW – LÀNG PHỐ", type: "Circus Arts", date: "Daily", time: "18:00 & 20:30", venue: "Saigon Opera House", location: "Hồ Chí Minh", price: "600,000đ", image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80", featured: false },
    { id: "a6", title: "WATER PUPPET SHOW", type: "Traditional", date: "Weekends", time: "17:00", venue: "Thăng Long Water Puppet Theatre", location: "Hà Nội", price: "150,000đ", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", featured: false },
  ],
  sports: [
    { id: "s1", title: "VLEAGUE: HCMC FC vs. HA NỘI FC", sport: "Football", date: "Sat, 15 Mar 2025", time: "19:00", location: "Thống Nhất Stadium, Hồ Chí Minh", price: "120,000đ", teams: ["HCMC FC", "Hà Nội FC"], image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80", featured: true, countdown: true },
    { id: "s2", title: "VIETNAM OPEN TENNIS 2025", sport: "Tennis", date: "Mon–Sun, Mar 17–23", time: "09:00", location: "Cần Thơ Tennis Club", price: "80,000đ", teams: ["International Players"], image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80", featured: false },
    { id: "s3", title: "SAIGON HEAT vs. THANG LONG WARRIORS", sport: "Basketball", date: "Sun, 23 Mar 2025", time: "18:00", location: "TDTT Phú Thọ, Hồ Chí Minh", price: "100,000đ", teams: ["Saigon Heat", "Thang Long Warriors"], image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80", featured: true },
    { id: "s4", title: "HANOI MARATHON 2025", sport: "Running", date: "Sun, 6 Apr 2025", time: "05:30", location: "Hoàn Kiếm Lake, Hà Nội", price: "350,000đ", teams: ["Open Registration"], image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=600&q=80", featured: false },
    { id: "s5", title: "VBA ALL-STAR GAME 2025", sport: "Basketball", date: "Sat, 12 Apr 2025", time: "19:00", location: "Nhà Thi Đấu Hoàng Mai, Hà Nội", price: "200,000đ", teams: ["East All-Stars", "West All-Stars"], image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80", featured: false },
  ],
  experiences: [
    { id: "e1", title: "MEKONG DELTA SUNSET CRUISE", duration: "6 hours", slots: 8, date: "Daily", location: "Cần Thơ", price: "850,000đ", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80", featured: true },
    { id: "e2", title: "HA LONG BAY OVERNIGHT KAYAK", duration: "2 days", slots: 3, date: "Weekends", location: "Hạ Long, Quảng Ninh", price: "2,500,000đ", image: "https://images.unsplash.com/photo-1573789267827-ee31edc02f97?w=600&q=80", featured: true },
    { id: "e3", title: "SAIGON BY NIGHT VESPA TOUR", duration: "3 hours", slots: 12, date: "Daily 18:00", location: "Hồ Chí Minh", price: "450,000đ", image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?w=600&q=80", featured: false },
    { id: "e4", title: "HỘI AN LANTERN MAKING CLASS", duration: "2 hours", slots: 6, date: "Daily 14:00", location: "Hội An, Quảng Nam", price: "300,000đ", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80", featured: false },
    { id: "e5", title: "PHÚ QUỐC SNORKELING EXPEDITION", duration: "4 hours", slots: 2, date: "Daily 08:00", location: "Phú Quốc, Kiên Giang", price: "650,000đ", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", featured: false },
  ],
  workshops: [
    { id: "w1", title: "REACT ADVANCED PATTERNS 2025", instructor: "Nguyễn Văn Khoa", level: "Advanced", duration: "8 hours", seats: 15, date: "Sat, 22 Mar 2025", location: "Toong Coworking, Hồ Chí Minh", price: "1,200,000đ", image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80", featured: true },
    { id: "w2", title: "WATERCOLOUR FOR BEGINNERS", instructor: "Lê Thị Hoa", level: "Beginner", duration: "3 hours", seats: 8, date: "Sun, 23 Mar 2025", location: "Art Space, Hà Nội", price: "350,000đ", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80", featured: false },
    { id: "w3", title: "VIETNAMESE COOKING MASTERCLASS", instructor: "Chef Minh Đức", level: "All Levels", duration: "4 hours", seats: 10, date: "Sat, 29 Mar 2025", location: "Hoa Tuc Kitchen, Hồ Chí Minh", price: "750,000đ", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80", featured: true },
    { id: "w4", title: "DIGITAL MARKETING BOOTCAMP", instructor: "Trần Huy Hoàng", level: "Intermediate", duration: "16 hours", seats: 20, date: "Sat–Sun, Apr 5–6", location: "Online / Zoom", price: "1,800,000đ", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80", featured: false },
    { id: "w5", title: "COFFEE TASTING & BREWING", instructor: "Ngọc Anh (Q Grader)", level: "Beginner", duration: "2 hours", seats: 5, date: "Sun, 6 Apr 2025", location: "The Workshop Coffee, Hồ Chí Minh", price: "280,000đ", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80", featured: false },
  ],
};

export const ALL_EVENTS = [
  ...EVENTS.concerts.map(e => ({ ...e, category: "concerts" })),
  ...EVENTS.arts.map(e => ({ ...e, category: "arts" })),
  ...EVENTS.sports.map(e => ({ ...e, category: "sports" })),
  ...EVENTS.experiences.map(e => ({ ...e, category: "experiences" })),
  ...EVENTS.workshops.map(e => ({ ...e, category: "workshops" })),
];

export const HERO_SLIDES = [
  { id: 1, event: EVENTS.concerts[0], bg: "linear-gradient(135deg, #0A1A0F 0%, #003315 50%, #001A0A 100%)" },
  { id: 2, event: EVENTS.sports[0], bg: "linear-gradient(135deg, #0A0F1A 0%, #001530 50%, #000A1A 100%)" },
  { id: 3, event: EVENTS.arts[0], bg: "linear-gradient(135deg, #1A0A10 0%, #300015 50%, #1A000A 100%)" },
];
