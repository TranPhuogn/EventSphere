import { useState, useEffect, useRef } from "react";
import { css } from "./styles";
import { ALL_EVENTS } from "./data";
import { BookingModal, Toast } from "./components";
import { HomePage } from "./pages/HomePage";
import { ConcertsPage, ArtsPage, SportsPage, ExperiencesPage, WorkshopsPage } from "./pages/CategoryPages";
import { EventDetailPage, MyTicketsPage, ProfilePage } from "./pages/DetailPages";
import { OrganizerPage, CreateEventPage } from "./pages/OrganizerPages";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingEvent, setBookingEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  const CATS = [
    { id: "concerts", icon: "🎵", label: "Concerts" },
    { id: "arts", icon: "🎭", label: "Arts & Theatre" },
    { id: "sports", icon: "⚽", label: "Sports" },
    { id: "experiences", icon: "🧭", label: "Experiences" },
    { id: "workshops", icon: "📚", label: "Workshops" },
    { id: "others", icon: "✨", label: "Others" },
  ];

  const navigate = (p) => { setPage(p); setSelectedEvent(null); window.scrollTo(0, 0); };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setPage("detail");
    window.scrollTo(0, 0);
  };

  const handleBook = (event) => {
    setBookingEvent(event);
    setShowBooking(true);
  };

  const handleBookingSuccess = (bookedTicket) => {
    setTickets(prev => [...prev, bookedTicket]);
    setToast({ message: "Booking confirmed! Check My Tickets.", icon: "🎟️" });
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.length < 2) { setSearchResults([]); setShowSearch(false); return; }
    const results = ALL_EVENTS.filter(e => e.title.toLowerCase().includes(q.toLowerCase()) || (e.artist || "").toLowerCase().includes(q.toLowerCase())).slice(0, 5);
    setSearchResults(results);
    setShowSearch(true);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (!searchRef.current?.contains(e.target)) setShowSearch(false);
      if (!e.target.closest(".avatar-btn")) setShowDropdown(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <style>{css}</style>

      <header className="header">
        <div className="header-top">
          <div className="logo" onClick={() => navigate("home")}>
            <div className="logo-icon">◉</div>
            EventSphere
          </div>

          <div className="search-bar" ref={searchRef}>
            <span className="search-icon">🔍</span>
            <input
              placeholder="Search events, artists, venues..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSearch(true)}
            />
            {showSearch && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(e => (
                  <div key={e.id} className="search-result-item" onClick={() => { handleEventClick(e); setShowSearch(false); setSearchQuery(""); }}>
                    <img className="search-result-img" src={e.image} alt={e.title} />
                    <div>
                      <div className="search-result-title">{e.title}</div>
                      <div className="search-result-sub">{e.date} · {e.location || e.venue}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => navigate("create-event")}>+ Create Event</button>
            <button className="btn btn-ghost" onClick={() => navigate("my-tickets")}>🎟 My Tickets{tickets.length > 0 && <span style={{ background: "var(--emerald)", color: "#000", borderRadius: 20, padding: "1px 6px", fontSize: 11, fontWeight: 700 }}>{tickets.length}</span>}</button>
            <div style={{ position: "relative" }}>
              <div className="avatar-btn" onClick={() => setShowDropdown(!showDropdown)}>N</div>
              {showDropdown && (
                <div className="dropdown">
                  <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Nguyễn Văn A</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>user@example.com</div>
                  </div>
                  {[["🎟️", "My Tickets", "my-tickets"], ["📅", "My Events", "organizer"], ["👤", "My Profile", "profile"], ["🏢", "Organizer Center", "organizer"]].map(([icon, label, pg]) => (
                    <div key={label} className="dropdown-item" onClick={() => { navigate(pg); setShowDropdown(false); }}>
                      <span>{icon}</span>{label}
                    </div>
                  ))}
                  <hr className="dropdown-divider" />
                  <div className="dropdown-item danger" onClick={() => setShowDropdown(false)}>
                    <span>🚪</span>Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="cat-nav">
          <div className="cat-nav-inner">
            {CATS.map(c => (
              <div key={c.id} className={`cat-link ${page === c.id ? "active" : ""}`} onClick={() => navigate(c.id === "others" ? "workshops" : c.id)}>
                <span>{c.icon}</span>{c.label}
              </div>
            ))}
          </div>
        </nav>
      </header>

      <main className="main">
        {page === "home" && <HomePage navigate={navigate} onEventClick={handleEventClick} />}
        {page === "concerts" && <ConcertsPage onEventClick={handleEventClick} />}
        {page === "arts" && <ArtsPage onEventClick={handleEventClick} />}
        {page === "sports" && <SportsPage onEventClick={handleEventClick} />}
        {page === "experiences" && <ExperiencesPage onEventClick={handleEventClick} />}
        {page === "workshops" && <WorkshopsPage onEventClick={handleEventClick} />}
        {page === "detail" && <EventDetailPage event={selectedEvent} onBook={handleBook} navigate={navigate} />}
        {page === "my-tickets" && <MyTicketsPage tickets={tickets} />}
        {page === "profile" && <ProfilePage />}
        {page === "organizer" && <OrganizerPage />}
        {page === "create-event" && <CreateEventPage />}
      </main>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 40px 24px", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 32 }}>
            <div>
              <div className="logo" style={{ marginBottom: 12 }}><div className="logo-icon">◉</div>EventSphere</div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>Vietnam's premier event ticketing platform. Discover, book, and experience the best events across the country.</div>
            </div>
            {[
              ["Events", ["Concerts", "Arts & Theatre", "Sports", "Experiences", "Workshops"]],
              ["Support", ["Help Center", "Contact Us", "Refund Policy", "FAQs"]],
              ["Company", ["About EventSphere", "Press", "Careers", "Partner With Us"]],
            ].map(([title, links]) => (
              <div key={title}>
                <div style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700, marginBottom: 14 }}>{title}</div>
                {links.map(l => <div key={l} style={{ fontSize: 14, color: "var(--muted)", marginBottom: 8, cursor: "pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--muted)" }}>
            <span>© 2025 EventSphere. All rights reserved.</span>
            <span>Made with 💚 in Vietnam</span>
          </div>
        </div>
      </footer>

      {showBooking && bookingEvent && (
        <BookingModal
          event={bookingEvent}
          onClose={() => setShowBooking(false)}
          onSuccess={(ticket) => { handleBookingSuccess(ticket); setShowBooking(false); }}
        />
      )}

      {toast && <Toast message={toast.message} icon={toast.icon} onClose={() => setToast(null)} />}
    </>
  );
}
