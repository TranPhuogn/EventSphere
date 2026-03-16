import { useState } from "react";
import { ALL_EVENTS } from "../data";
import { EventCard } from "../components";

export function EventDetailPage({ event, onBook, navigate }) {
  if (!event) return null;
  const [selectedTier, setSelectedTier] = useState(0);
  const [qty, setQty] = useState(1);

  const tiers = [
    { name: "Standard", price: 500000, avail: 45 },
    { name: "VIP", price: 1200000, avail: 20 },
    { name: "SVIP", price: 2500000, avail: 5 },
  ];
  const total = tiers[selectedTier].price * qty;
  const fmt = p => p.toLocaleString("vi-VN") + "đ";
  const relatedEvents = ALL_EVENTS.filter(e => e.id !== event.id).slice(0, 4);

  return (
    <div className="page-enter">
      <div style={{ padding: "12px 0" }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate("home")}>← Back to Home</button>
      </div>
      <div className="detail-grid">
        <div>
          <img className="detail-cover" src={event.image} alt={event.title} />
          <div className="detail-title">{event.title}</div>
          <div className="detail-meta-row">
            {event.date && (
              <div className="detail-meta-item">
                <span className="detail-meta-icon">📅</span>
                <div><div className="detail-meta-label">Date & Time</div><div className="detail-meta-value">{event.date} {event.time || ""}</div></div>
              </div>
            )}
            <div className="detail-meta-item">
              <span className="detail-meta-icon">📍</span>
              <div><div className="detail-meta-label">Location</div><div className="detail-meta-value">{event.location || event.venue || "TBA"}</div></div>
            </div>
            {event.artist && (
              <div className="detail-meta-item">
                <span className="detail-meta-icon">🎤</span>
                <div><div className="detail-meta-label">Artist</div><div className="detail-meta-value">{event.artist}</div></div>
              </div>
            )}
            {event.duration && (
              <div className="detail-meta-item">
                <span className="detail-meta-icon">⏱</span>
                <div><div className="detail-meta-label">Duration</div><div className="detail-meta-value">{event.duration}</div></div>
              </div>
            )}
          </div>
          <div style={{ marginBottom: 28 }}>
            <div className="detail-section-title">About This Event</div>
            <div className="detail-desc">
              Experience an unforgettable evening at <strong style={{ color: "var(--text)" }}>{event.title}</strong>.
              {event.artist ? ` ${event.artist} delivers a world-class performance, bringing together fans from across Vietnam and beyond.` : ""}
              {event.type ? ` This ${event.type} performance features talented artists and a captivating production.` : ""}
              {" "}Whether you're a long-time fan or a first-time attendee, this is an event you won't want to miss.
              Doors open 1 hour before the show.
            </div>
          </div>
          <div style={{ marginBottom: 28 }}>
            <div className="detail-section-title">Organizer Information</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--emerald-dim)", border: "1px solid var(--emerald)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🏢</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>EventSphere Official</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Verified Organizer · 48 events hosted · ⭐ 4.9 rating</div>
              </div>
            </div>
          </div>
          <div>
            <div className="detail-section-title">You May Also Like</div>
            <div className="scroll-row">
              {relatedEvents.map(e => <EventCard key={e.id} event={e} onClick={() => {}} />)}
            </div>
          </div>
        </div>
        <div className="ticket-sidebar">
          <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Select Tickets</div>
          {tiers.map((t, i) => (
            <div key={i} className={`ticket-type ${selectedTier === i ? "selected" : ""}`} onClick={() => setSelectedTier(i)}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><div className="ticket-type-name">{t.name}</div><div className="ticket-type-avail">{t.avail} seats remaining</div></div>
                <div className="ticket-type-price">{fmt(t.price)}</div>
              </div>
            </div>
          ))}
          <div className="qty-control">
            <span style={{ fontSize: 14, color: "var(--muted)" }}>Qty:</span>
            <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span className="qty-display">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(Math.min(8, qty + 1))}>+</button>
          </div>
          <div className="total-row">
            <span className="total-label">Total</span>
            <span className="total-amount">{fmt(total)}</span>
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", marginTop: 12, fontSize: 16 }} onClick={() => onBook(event)}>
            🎟 Book Now
          </button>
          <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "var(--muted)" }}>
            🔒 Secure payment · Free cancellation within 24h
          </div>
        </div>
      </div>
    </div>
  );
}

export function MyTicketsPage({ tickets }) {
  if (tickets.length === 0) return (
    <div className="page-enter" style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎟️</div>
      <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>No tickets yet</div>
      <div style={{ color: "var(--muted)", marginBottom: 24 }}>Your purchased tickets will appear here</div>
    </div>
  );

  return (
    <div className="page-enter">
      <div style={{ margin: "24px 0 20px", fontFamily: "Clash Display, sans-serif", fontSize: 28, fontWeight: 700 }}>My Tickets</div>
      {tickets.map((t, i) => (
        <div key={i} className="ticket-card">
          <img className="ticket-img" src={t.image} alt={t.title} />
          <div className="ticket-info">
            <div className="ticket-status status-confirmed">✓ Confirmed</div>
            <div className="ticket-name">{t.title}</div>
            <div style={{ display: "flex", gap: 16, marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>
              <span>📅 {t.date || "Upcoming"}</span><span>📍 {t.location || t.venue}</span>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
              <span style={{ background: "var(--card2)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 6, fontSize: 13 }}>{t.tierName || "Standard"} × {t.qty || 1}</span>
              <span style={{ color: "var(--emerald)", fontWeight: 700 }}>{t.total ? t.total.toLocaleString("vi-VN") + "đ" : t.price}</span>
            </div>
            <div className="ticket-code">Booking: {t.bookingCode || "ES-XXXXXXXX"}</div>
          </div>
          <div style={{ padding: 20, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
            <button className="btn btn-outline btn-sm">📥 Download</button>
            <button className="btn btn-outline btn-sm">📤 Share</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfilePage() {
  const [form, setForm] = useState({ name: "Nguyễn Văn A", email: "user@example.com", phone: "0901 234 567", city: "Hồ Chí Minh" });
  const [saved, setSaved] = useState(false);

  return (
    <div className="page-enter">
      <div style={{ margin: "24px 0 20px", fontFamily: "Clash Display, sans-serif", fontSize: 28, fontWeight: 700 }}>My Profile</div>
      <div className="profile-header">
        <div className="profile-avatar">N</div>
        <div>
          <div className="profile-name">{form.name}</div>
          <div className="profile-email">{form.email}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <span style={{ background: "var(--emerald-dim)", color: "var(--emerald)", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>⭐ EventSphere Member</span>
            <span style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 20, fontSize: 12 }}>Since 2024</span>
          </div>
        </div>
      </div>
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
        <div className="detail-section-title">Personal Information</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
        </div>
        <button className="btn btn-primary" onClick={() => setSaved(true)} style={{ marginTop: 8 }}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
