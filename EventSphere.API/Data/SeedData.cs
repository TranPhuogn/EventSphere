using EventSphere.API.Models;

namespace EventSphere.API.Data
{
    public static class SeedData
    {
        public static List<Event> GetConcerts() => new()
        {
            new() { Id = "c1", Title = "SƠNТÙNG M-TP LIVE CONCERT 2025", Category = "concerts", Artist = "Sơn Tùng M-TP", Date = "Sat, 15 Mar 2025", Time = "19:30", Location = "Mỹ Đình National Stadium, Hà Nội", Price = "800,000đ", Tier = "Standard / VIP / SVIP", Genre = "Pop", Image = "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80", Featured = true },
            new() { Id = "c2", Title = "EDM STORM FESTIVAL", Category = "concerts", Artist = "DJ Snake & Friends", Date = "Sun, 22 Mar 2025", Time = "20:00", Location = "Landmark 81, Hồ Chí Minh", Price = "1,200,000đ", Tier = "General / VIP", Genre = "EDM", Image = "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80", Featured = true },
            new() { Id = "c3", Title = "INDIE NIGHTS VOL. 7", Category = "concerts", Artist = "Various Artists", Date = "Fri, 28 Mar 2025", Time = "18:00", Location = "Hanoi Rock City", Price = "250,000đ", Tier = "General", Genre = "Rock", Image = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80", Featured = false },
            new() { Id = "c4", Title = "MỸ TÂM ACOUSTIC NIGHT", Category = "concerts", Artist = "Mỹ Tâm", Date = "Sat, 5 Apr 2025", Time = "20:00", Location = "Grand Palace, Đà Nẵng", Price = "600,000đ", Tier = "Standard / VIP", Genre = "Pop", Image = "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80", Featured = false },
            new() { Id = "c5", Title = "JAZZ UNDER THE STARS", Category = "concerts", Artist = "Trần Mạnh Tuấn Quartet", Date = "Sun, 13 Apr 2025", Time = "19:00", Location = "Opera House, Hồ Chí Minh", Price = "450,000đ", Tier = "General / Premium", Genre = "Jazz", Image = "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80", Featured = false },
            new() { Id = "c6", Title = "ROCK IN SAIGON 2025", Category = "concerts", Artist = "Microwave Band + Ngũ Cung", Date = "Sat, 19 Apr 2025", Time = "18:30", Location = "Ký Con Rooftop, Hồ Chí Minh", Price = "300,000đ", Tier = "General", Genre = "Rock", Image = "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=600&q=80", Featured = false },
        };

        public static List<Event> GetArts() => new()
        {
            new() { Id = "a1", Title = "THE PHANTOM OF THE OPERA", Category = "arts", Type = "Musical", Date = "Fri–Sun, Mar 14–16", Time = "19:30", Venue = "Nhà Hát Lớn Hà Nội", Location = "Hà Nội", Price = "500,000đ", Image = "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80", Featured = true },
            new() { Id = "a2", Title = "TRUYỆN KIỀU – VỞ KỊCH", Category = "arts", Type = "Traditional Theatre", Date = "Sat, 22 Mar 2025", Time = "20:00", Venue = "Nhà Hát Tuổi Trẻ", Location = "Hà Nội", Price = "200,000đ", Image = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", Featured = false },
            new() { Id = "a3", Title = "MODERN DANCE: FRAGMENTS", Category = "arts", Type = "Dance", Date = "Sun, 30 Mar 2025", Time = "18:30", Venue = "IDECAF Theatre", Location = "Hồ Chí Minh", Price = "350,000đ", Image = "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&q=80", Featured = false },
            new() { Id = "a4", Title = "HAMLET – SHAKESPEARE REIMAGINED", Category = "arts", Type = "Drama", Date = "Fri, 11 Apr 2025", Time = "19:00", Venue = "L'Espace", Location = "Hà Nội", Price = "400,000đ", Image = "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80", Featured = true },
            new() { Id = "a5", Title = "AO SHOW – LÀNG PHỐ", Category = "arts", Type = "Circus Arts", Date = "Daily", Time = "18:00 & 20:30", Venue = "Saigon Opera House", Location = "Hồ Chí Minh", Price = "600,000đ", Image = "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80", Featured = false },
            new() { Id = "a6", Title = "WATER PUPPET SHOW", Category = "arts", Type = "Traditional", Date = "Weekends", Time = "17:00", Venue = "Thăng Long Water Puppet Theatre", Location = "Hà Nội", Price = "150,000đ", Image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", Featured = false },
        };

        public static List<Event> GetSports() => new()
        {
            new() { Id = "s1", Title = "VLEAGUE: HCMC FC vs. HA NỘI FC", Category = "sports", Sport = "Football", Date = "Sat, 15 Mar 2025", Time = "19:00", Location = "Thống Nhất Stadium, Hồ Chí Minh", Price = "120,000đ", Teams = new() { "HCMC FC", "Hà Nội FC" }, Image = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80", Featured = true, Countdown = true },
            new() { Id = "s2", Title = "VIETNAM OPEN TENNIS 2025", Category = "sports", Sport = "Tennis", Date = "Mon–Sun, Mar 17–23", Time = "09:00", Location = "Cần Thơ Tennis Club", Price = "80,000đ", Teams = new() { "International Players" }, Image = "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80", Featured = false },
            new() { Id = "s3", Title = "SAIGON HEAT vs. THANG LONG WARRIORS", Category = "sports", Sport = "Basketball", Date = "Sun, 23 Mar 2025", Time = "18:00", Location = "TDTT Phú Thọ, Hồ Chí Minh", Price = "100,000đ", Teams = new() { "Saigon Heat", "Thang Long Warriors" }, Image = "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80", Featured = true },
            new() { Id = "s4", Title = "HANOI MARATHON 2025", Category = "sports", Sport = "Running", Date = "Sun, 6 Apr 2025", Time = "05:30", Location = "Hoàn Kiếm Lake, Hà Nội", Price = "350,000đ", Teams = new() { "Open Registration" }, Image = "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=600&q=80", Featured = false },
            new() { Id = "s5", Title = "VBA ALL-STAR GAME 2025", Category = "sports", Sport = "Basketball", Date = "Sat, 12 Apr 2025", Time = "19:00", Location = "Nhà Thi Đấu Hoàng Mai, Hà Nội", Price = "200,000đ", Teams = new() { "East All-Stars", "West All-Stars" }, Image = "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80", Featured = false },
        };

        public static List<Event> GetExperiences() => new()
        {
            new() { Id = "e1", Title = "MEKONG DELTA SUNSET CRUISE", Category = "experiences", Duration = "6 hours", Slots = 8, Date = "Daily", Location = "Cần Thơ", Price = "850,000đ", Image = "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80", Featured = true },
            new() { Id = "e2", Title = "HA LONG BAY OVERNIGHT KAYAK", Category = "experiences", Duration = "2 days", Slots = 3, Date = "Weekends", Location = "Hạ Long, Quảng Ninh", Price = "2,500,000đ", Image = "https://images.unsplash.com/photo-1573789267827-ee31edc02f97?w=600&q=80", Featured = true },
            new() { Id = "e3", Title = "SAIGON BY NIGHT VESPA TOUR", Category = "experiences", Duration = "3 hours", Slots = 12, Date = "Daily 18:00", Location = "Hồ Chí Minh", Price = "450,000đ", Image = "https://images.unsplash.com/photo-1551218372-a8789b81b253?w=600&q=80", Featured = false },
            new() { Id = "e4", Title = "HỘI AN LANTERN MAKING CLASS", Category = "experiences", Duration = "2 hours", Slots = 6, Date = "Daily 14:00", Location = "Hội An, Quảng Nam", Price = "300,000đ", Image = "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80", Featured = false },
            new() { Id = "e5", Title = "PHÚ QUỐC SNORKELING EXPEDITION", Category = "experiences", Duration = "4 hours", Slots = 2, Date = "Daily 08:00", Location = "Phú Quốc, Kiên Giang", Price = "650,000đ", Image = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", Featured = false },
        };

        public static List<Event> GetWorkshops() => new()
        {
            new() { Id = "w1", Title = "REACT ADVANCED PATTERNS 2025", Category = "workshops", Instructor = "Nguyễn Văn Khoa", Level = "Advanced", Duration = "8 hours", Seats = 15, Date = "Sat, 22 Mar 2025", Location = "Toong Coworking, Hồ Chí Minh", Price = "1,200,000đ", Image = "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80", Featured = true },
            new() { Id = "w2", Title = "WATERCOLOUR FOR BEGINNERS", Category = "workshops", Instructor = "Lê Thị Hoa", Level = "Beginner", Duration = "3 hours", Seats = 8, Date = "Sun, 23 Mar 2025", Location = "Art Space, Hà Nội", Price = "350,000đ", Image = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80", Featured = false },
            new() { Id = "w3", Title = "VIETNAMESE COOKING MASTERCLASS", Category = "workshops", Instructor = "Chef Minh Đức", Level = "All Levels", Duration = "4 hours", Seats = 10, Date = "Sat, 29 Mar 2025", Location = "Hoa Tuc Kitchen, Hồ Chí Minh", Price = "750,000đ", Image = "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80", Featured = true },
            new() { Id = "w4", Title = "DIGITAL MARKETING BOOTCAMP", Category = "workshops", Instructor = "Trần Huy Hoàng", Level = "Intermediate", Duration = "16 hours", Seats = 20, Date = "Sat–Sun, Apr 5–6", Location = "Online / Zoom", Price = "1,800,000đ", Image = "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80", Featured = false },
            new() { Id = "w5", Title = "COFFEE TASTING & BREWING", Category = "workshops", Instructor = "Ngọc Anh (Q Grader)", Level = "Beginner", Duration = "2 hours", Seats = 5, Date = "Sun, 6 Apr 2025", Location = "The Workshop Coffee, Hồ Chí Minh", Price = "280,000đ", Image = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80", Featured = false },
        };

        public static List<Event> GetAllEvents()
        {
            var all = new List<Event>();
            all.AddRange(GetConcerts());
            all.AddRange(GetArts());
            all.AddRange(GetSports());
            all.AddRange(GetExperiences());
            all.AddRange(GetWorkshops());
            return all;
        }
    }
}
