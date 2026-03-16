import { useState, useEffect } from "react";
import { EVENTS } from "../data";
import { EventCard } from "../components";

export function ConcertsPage({ onEventClick }) {
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const genres = ["All", "Pop", "Rock", "EDM", "Jazz"];
  const filtered = EVENTS.concerts.filter(e => genre === "All" || e.genre === genre);

  return (
    <div className="page-enter">
      <div className="page-banner">
        <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80" alt="Concerts" />
        <div className="page-banner-overlay">
          <div>
            <div style={{ fontSize: 13, color: "var(--emerald)", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>🎵 Live Music</div>
            <div className="page-banner-title">Concerts</div>
            <div className="page-banner-sub">From intimate gigs to stadium shows — find your next live experience</div>
          </div>
        </div>
      </div>
      <div className="filter-bar">
        <span className="filter-label">Genre:</span>
        {genres.map(g => <button key={g} className={`filter-chip ${genre === g ? "active" : ""}`} onClick={() => setGenre(g)}>{g}</button>)}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span className="filter-label">Sort:</span>
          <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">By Date</option><option value="price">By Price</option><option value="name">By Name</option>
          </select>
          <select className="filter-select">
            <option>All Locations</option><option>Hà Nội</option><option>Hồ Chí Minh</option><option>Đà Nẵng</option>
          </select>
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg, #001510 0%, #00260F 100%)", border: "1px solid rgba(0,200,83,0.2)", borderRadius: 14, padding: "16px 24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 32 }}>🎤</span>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>VIP & SVIP Packages Available</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Backstage access, meet & greet, priority seating on selected concerts</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--emerald)" }}>{filtered.filter(e => e.featured).length} featured shows →</div>
      </div>
      <div className="events-grid">
        {filtered.map(e => <EventCard key={e.id} event={{ ...e, category: e.genre }} onClick={onEventClick} />)}
      </div>
    </div>
  );
}

export function ArtsPage({ onEventClick }) {
  const [type, setType] = useState("All");
  const types = ["All", "Musical", "Drama", "Dance", "Traditional", "Circus Arts"];
  const filtered = EVENTS.arts.filter(e => type === "All" || e.type === type);

  return (
    <div className="page-enter">
      <div className="page-banner">
        <img src="https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=1400&q=80" alt="Arts" />
        <div className="page-banner-overlay" style={{ background: "linear-gradient(90deg, rgba(20,0,10,0.9) 0%, rgba(0,0,0,0.3) 100%)" }}>
          <div>
            <div style={{ fontSize: 13, color: "#f4a0c0", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>🎭 Performing Arts</div>
            <div className="page-banner-title">Arts & Theatre</div>
            <div className="page-banner-sub">Where stories come to life on stage — theatre, dance, and cultural performances</div>
          </div>
        </div>
      </div>
      <div className="filter-bar">
        <span className="filter-label">Type:</span>
        {types.map(t => <button key={t} className={`filter-chip ${type === t ? "active" : ""}`} onClick={() => setType(t)}>{t}</button>)}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <select className="filter-select"><option>All Dates</option><option>This Week</option><option>This Month</option></select>
          <select className="filter-select"><option>All Cities</option><option>Hà Nội</option><option>Hồ Chí Minh</option></select>
        </div>
      </div>
      <div style={{ marginBottom: 24, background: "linear-gradient(135deg, #1A000A 0%, #2A0015 100%)", border: "1px solid rgba(244,160,192,0.15)", borderRadius: 14, padding: "20px 24px" }}>
        <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🏛️ Featured Venues</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Nhà Hát Lớn Hà Nội", "Saigon Opera House", "IDECAF Theatre", "L'Espace"].map(v => (
            <span key={v} style={{ padding: "4px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 20, fontSize: 13, border: "1px solid rgba(244,160,192,0.15)" }}>{v}</span>
          ))}
        </div>
      </div>
      <div className="events-grid">
        {filtered.map(e => <EventCard key={e.id} event={{ ...e, category: e.type }} onClick={onEventClick} />)}
      </div>
    </div>
  );
}

export function SportsPage({ onEventClick }) {
  const [sport, setSport] = useState("All");
  const [countdown, setCountdown] = useState({ h: 11, m: 34, s: 22 });
  const sports = ["All", "Football", "Basketball", "Tennis", "Running"];
  const filtered = EVENTS.sports.filter(e => sport === "All" || e.sport === sport);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => {
        let { h, m, s } = c;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = n => String(n).padStart(2, "0");

  return (
    <div className="page-enter">
      <div className="page-banner">
        <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1400&q=80" alt="Sports" />
        <div className="page-banner-overlay" style={{ background: "linear-gradient(90deg, rgba(0,10,30,0.92) 0%, rgba(0,0,0,0.3) 100%)" }}>
          <div>
            <div style={{ fontSize: 13, color: "#60A5FA", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>⚽ Live Sports</div>
            <div className="page-banner-title">Sports Events</div>
            <div className="page-banner-sub">Cheer for your team, feel the crowd energy</div>
          </div>
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg, #000A1A 0%, #00102A 100%)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 14, padding: "20px 28px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "#60A5FA", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>🔴 Next Match Countdown</div>
          <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 16, fontWeight: 600 }}>HCMC FC vs. Hà Nội FC · Sat 15 Mar</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[["Hours", pad(countdown.h)], ["Minutes", pad(countdown.m)], ["Seconds", pad(countdown.s)]].map(([label, val]) => (
            <div key={label} style={{ textAlign: "center", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 10, padding: "10px 16px" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 700, color: "#60A5FA" }}>{val}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-bar">
        <span className="filter-label">Sport:</span>
        {sports.map(s => <button key={s} className={`filter-chip ${sport === s ? "active" : ""}`} onClick={() => setSport(s)}>{s}</button>)}
        <div style={{ marginLeft: "auto" }}>
          <select className="filter-select"><option>All Locations</option><option>Hà Nội</option><option>Hồ Chí Minh</option></select>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        {filtered.map(e => (
          <div key={e.id} className="match-card" onClick={() => onEventClick(e)}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "#60A5FA", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{e.sport}</span>
                {e.countdown && <span className="countdown-badge">🔴 Upcoming</span>}
              </div>
              {e.teams ? (
                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <span className="team-name">{e.teams[0]}</span>
                  <span className="vs-badge">VS</span>
                  <span className="team-name">{e.teams[1]}</span>
                </div>
              ) : (<span className="team-name">{e.title}</span>)}
              <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 13, color: "var(--muted)" }}>
                <span>📅 {e.date}</span><span>⏰ {e.time}</span><span>📍 {e.location}</span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ color: "var(--muted)", fontSize: 11, marginBottom: 4 }}>from</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--emerald)", marginBottom: 10 }}>{e.price}</div>
              <button className="btn btn-primary btn-sm" onClick={ev => { ev.stopPropagation(); onEventClick(e); }}>Get Tickets</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperiencesPage({ onEventClick }) {
  return (
    <div className="page-enter">
      <div className="page-banner">
        <img src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1400&q=80" alt="Experiences" />
        <div className="page-banner-overlay" style={{ background: "linear-gradient(90deg, rgba(0,15,20,0.92) 0%, rgba(0,0,0,0.3) 100%)" }}>
          <div>
            <div style={{ fontSize: 13, color: "#34D399", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>🧭 Discover</div>
            <div className="page-banner-title">Experiences</div>
            <div className="page-banner-sub">Tours, expeditions, and unforgettable moments across Vietnam</div>
          </div>
        </div>
      </div>
      <div className="filter-bar">
        <span className="filter-label">Duration:</span>
        {["All", "< 3 hrs", "Half Day", "Full Day", "Multi-Day"].map(d => <button key={d} className="filter-chip">{d}</button>)}
        <div style={{ marginLeft: "auto" }}>
          <select className="filter-select">
            <option>All Regions</option><option>Hồ Chí Minh</option><option>Hà Nội</option><option>Central Vietnam</option><option>South Islands</option>
          </select>
        </div>
      </div>
      <div className="events-grid">
        {EVENTS.experiences.map(e => <EventCard key={e.id} event={{ ...e, category: "Experience" }} onClick={onEventClick} />)}
      </div>
    </div>
  );
}

export function WorkshopsPage({ onEventClick }) {
  const [level, setLevel] = useState("All");
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const filtered = EVENTS.workshops.filter(e => level === "All" || e.level === level);

  return (
    <div className="page-enter">
      <div className="page-banner">
        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80" alt="Workshops" />
        <div className="page-banner-overlay" style={{ background: "linear-gradient(90deg, rgba(10,10,0,0.92) 0%, rgba(0,0,0,0.3) 100%)" }}>
          <div>
            <div style={{ fontSize: 13, color: "#FBBF24", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>📚 Learn & Grow</div>
            <div className="page-banner-title">Workshops</div>
            <div className="page-banner-sub">Skill up with hands-on classes taught by industry experts</div>
          </div>
        </div>
      </div>
      <div className="filter-bar">
        <span className="filter-label">Level:</span>
        {levels.map(l => <button key={l} className={`filter-chip ${level === l ? "active" : ""}`} onClick={() => setLevel(l)}>{l}</button>)}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <select className="filter-select"><option>All Topics</option><option>Technology</option><option>Arts & Crafts</option><option>Culinary</option><option>Business</option></select>
          <select className="filter-select"><option>Sort: Date</option><option>Sort: Price ↑</option><option>Sort: Price ↓</option></select>
        </div>
      </div>
      <div className="events-grid">
        {filtered.map(e => <EventCard key={e.id} event={{ ...e }} onClick={onEventClick} />)}
      </div>
    </div>
  );
}
