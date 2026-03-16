using Microsoft.AspNetCore.Mvc;
using EventSphere.API.Data;
using EventSphere.API.Models;

namespace EventSphere.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<object> GetAll()
        {
            return Ok(new
            {
                concerts = SeedData.GetConcerts(),
                arts = SeedData.GetArts(),
                sports = SeedData.GetSports(),
                experiences = SeedData.GetExperiences(),
                workshops = SeedData.GetWorkshops()
            });
        }

        [HttpGet("all")]
        public ActionResult<List<Event>> GetAllFlat()
        {
            return Ok(SeedData.GetAllEvents());
        }

        [HttpGet("{category}")]
        public ActionResult<List<Event>> GetByCategory(string category)
        {
            var events = category.ToLower() switch
            {
                "concerts" => SeedData.GetConcerts(),
                "arts" => SeedData.GetArts(),
                "sports" => SeedData.GetSports(),
                "experiences" => SeedData.GetExperiences(),
                "workshops" => SeedData.GetWorkshops(),
                _ => new List<Event>()
            };
            return Ok(events);
        }

        [HttpGet("detail/{id}")]
        public ActionResult<Event> GetById(string id)
        {
            var evt = SeedData.GetAllEvents().FirstOrDefault(e => e.Id == id);
            if (evt == null) return NotFound();
            return Ok(evt);
        }

        [HttpGet("search")]
        public ActionResult<List<Event>> Search([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q) || q.Length < 2)
                return Ok(new List<Event>());

            var query = q.ToLower();
            var results = SeedData.GetAllEvents()
                .Where(e => e.Title.ToLower().Contains(query)
                         || (e.Artist ?? "").ToLower().Contains(query)
                         || (e.Location ?? "").ToLower().Contains(query))
                .Take(5)
                .ToList();
            return Ok(results);
        }
    }
}
