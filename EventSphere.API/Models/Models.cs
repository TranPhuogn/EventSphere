namespace EventSphere.API.Models
{
    public class Event
    {
        public string Id { get; set; } = "";
        public string Title { get; set; } = "";
        public string Category { get; set; } = "";
        public string? Artist { get; set; }
        public string? Type { get; set; }
        public string? Sport { get; set; }
        public string? Instructor { get; set; }
        public string? Level { get; set; }
        public string Date { get; set; } = "";
        public string? Time { get; set; }
        public string? Location { get; set; }
        public string? Venue { get; set; }
        public string Price { get; set; } = "";
        public string? Tier { get; set; }
        public string? Genre { get; set; }
        public string? Duration { get; set; }
        public int? Slots { get; set; }
        public int? Seats { get; set; }
        public string Image { get; set; } = "";
        public bool Featured { get; set; }
        public bool Countdown { get; set; }
        public List<string>? Teams { get; set; }
    }

    public class BookingRequest
    {
        public string EventId { get; set; } = "";
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
        public string TierName { get; set; } = "Standard";
        public int Qty { get; set; } = 1;
        public string PaymentMethod { get; set; } = "momo";
    }

    public class BookingResponse
    {
        public string BookingCode { get; set; } = "";
        public string EventId { get; set; } = "";
        public string EventTitle { get; set; } = "";
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string TierName { get; set; } = "";
        public int Qty { get; set; }
        public long Total { get; set; }
        public string Status { get; set; } = "Confirmed";
        public DateTime CreatedAt { get; set; }
    }
}
