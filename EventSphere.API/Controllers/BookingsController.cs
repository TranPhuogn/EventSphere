using Microsoft.AspNetCore.Mvc;
using EventSphere.API.Data;
using EventSphere.API.Models;

namespace EventSphere.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private static readonly List<BookingResponse> _bookings = new();

        private static readonly Dictionary<string, long> TierPrices = new()
        {
            { "Standard", 500000 },
            { "VIP", 1200000 },
            { "SVIP", 2500000 }
        };

        [HttpPost]
        public ActionResult<BookingResponse> CreateBooking([FromBody] BookingRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Phone))
            {
                return BadRequest(new { message = "Name, email and phone are required." });
            }

            var evt = SeedData.GetAllEvents().FirstOrDefault(e => e.Id == request.EventId);
            if (evt == null)
                return NotFound(new { message = "Event not found." });

            var tierPrice = TierPrices.GetValueOrDefault(request.TierName, 500000);
            var total = tierPrice * request.Qty;
            var code = "ES-" + Guid.NewGuid().ToString("N")[..8].ToUpper();

            var booking = new BookingResponse
            {
                BookingCode = code,
                EventId = evt.Id,
                EventTitle = evt.Title,
                Name = request.Name,
                Email = request.Email,
                TierName = request.TierName,
                Qty = request.Qty,
                Total = total,
                Status = "Confirmed",
                CreatedAt = DateTime.UtcNow
            };

            _bookings.Add(booking);
            return Ok(booking);
        }

        [HttpGet]
        public ActionResult<List<BookingResponse>> GetBookings()
        {
            return Ok(_bookings);
        }
    }
}
