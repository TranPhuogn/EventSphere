import { useState, useEffect, useRef } from "react";
import { EVENTS, HERO_SLIDES } from "../data";
import { EventCard } from "../components";

export function HomePage({ navigate, onEventClick }) {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goSlide = (n) => { setSlide(n); clearInterval(timerRef.current); timerRef.current = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000); };

  return (
    <div className="page-enter">
      <div className="hero">
        {HERO_SLIDES.map((s, i) => (
          <div key={s.id} className={`hero-slide ${i === slide ? "active" : ""}`} style={{ background: s.bg }}>
            <div className="hero-bg">
              <img src={s.event.image} alt={s.event.title} />
              <div className="hero-gradient" />
            </div>
            <div className="hero-content">
              <div className="hero-badge">
                <span>🔥</span>
                {s.event.category === "concerts" ? "Featured Concert" : s.event.category === "sports" ? "Big Match" : "Featured Show"}
              </div>
              <div className="hero-title">{s.event.title}</div>
              <div className="hero-meta">
                <span className="hero-meta-item"><span>📅</span>{s.event.date}</span>
                <span className="hero-meta-item"><span>📍</span>{s.event.location}</span>
              </div>
              <div className="hero-price">From {s.event.price}</div>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => onEventClick(s.event)}>Book Now</button>
                <button className="btn btn-outline" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }} onClick={() => onEventClick(s.event)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
        <div className="hero-arrow left" onClick={() => goSlide((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}>‹</div>
        <div className="hero-arrow right" onClick={() => goSlide((slide + 1) % HERO_SLIDES.length)}>›</div>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => <div key={i} className={`hero-dot ${i === slide ? "active" : ""}`} onClick={() => goSlide(i)} />)}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-title">🔥 Trending Now <span className="section-badge">Hot</span></div>
          <div className="see-all" onClick={() => navigate("concerts")}>See all →</div>
        </div>
        <div className="scroll-row">
          {[...EVENTS.concerts.slice(0, 3), ...EVENTS.sports.slice(0, 2), ...EVENTS.arts.slice(0, 2)].map(e => (
            <EventCard key={e.id} event={{ ...e, category: e.genre || e.sport || e.type || "Event" }} onClick={onEventClick} />
          ))}
        </div>
      </div>

      <div className="promo-banner promo-1">
        <div>
          <div style={{ fontSize: 12, color: "var(--emerald)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Limited Time Offer</div>
          <div className="promo-title">Early Bird Deals 🎟️</div>
          <div className="promo-sub">Save up to 40% on selected events. Grab your tickets before they're gone!</div>
          <button className="btn btn-primary" onClick={() => navigate("concerts")}>Browse Deals</button>
        </div>
        <div className="promo-deco">🎵</div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-title">🎵 Concerts</div>
          <div className="see-all" onClick={() => navigate("concerts")}>See all →</div>
        </div>
        <div className="scroll-row">
          {EVENTS.concerts.map(e => <EventCard key={e.id} event={{ ...e, category: e.genre }} onClick={onEventClick} />)}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-title">⚽ Sports</div>
          <div className="see-all" onClick={() => navigate("sports")}>See all →</div>
        </div>
        <div className="scroll-row">
          {EVENTS.sports.map(e => <EventCard key={e.id} event={{ ...e, category: e.sport }} onClick={onEventClick} />)}
        </div>
      </div>

      <div className="promo-banner promo-2">
        <div>
          <div style={{ fontSize: 12, color: "#A78BFA", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>For Organizers</div>
          <div className="promo-title">Host Your Event 🚀</div>
          <div className="promo-sub">Reach millions of event-goers. Set up your event page in minutes with our powerful tools.</div>
          <button className="btn btn-primary" style={{ background: "#7C3AED" }} onClick={() => navigate("organizer")}>Create Event Free</button>
        </div>
        <div className="promo-deco">🎪</div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-title">🎭 Arts & Theatre</div>
          <div className="see-all" onClick={() => navigate("arts")}>See all →</div>
        </div>
        <div className="scroll-row">
          {EVENTS.arts.map(e => <EventCard key={e.id} event={{ ...e, category: e.type }} onClick={onEventClick} />)}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-title">🧭 Experiences</div>
          <div className="see-all" onClick={() => navigate("experiences")}>See all →</div>
        </div>
        <div className="scroll-row">
          {EVENTS.experiences.map(e => <EventCard key={e.id} event={{ ...e }} onClick={onEventClick} />)}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-title">📚 Workshops</div>
          <div className="see-all" onClick={() => navigate("workshops")}>See all →</div>
        </div>
        <div className="scroll-row">
          {EVENTS.workshops.map(e => <EventCard key={e.id} event={{ ...e }} onClick={onEventClick} />)}
        </div>
      </div>
    </div>
  );
}
