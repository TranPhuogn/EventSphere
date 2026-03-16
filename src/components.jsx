import { useState, useEffect } from "react";

export function SlotsBadge({ total = 20, filled = 5 }) {
  const remaining = total - filled;
  const pct = (filled / total) * 100;
  const isLow = remaining <= 5;
  return (
    <div className={`slots-indicator ${isLow ? "slots-low" : ""}`}>
      <div className="slots-bar">
        <div className="slots-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="slots-text">{isLow ? `⚠ ${remaining} slots left` : `${remaining} available`}</span>
    </div>
  );
}

export function LevelBadge({ level }) {
  const cls = level === "Beginner" ? "level-beginner" : level === "Intermediate" ? "level-intermediate" : "level-advanced";
  return <span className={`level-badge ${cls}`}>{level}</span>;
}

export function EventCard({ event, onClick }) {
  const cat = event.category;
  return (
    <div className="event-card" onClick={() => onClick(event)}>
      <img className="card-img" src={event.image} alt={event.title} loading="lazy" />
      <div className="card-body">
        {cat && <div className="card-category">{cat}</div>}
        {event.artist && <div className="card-category">{event.artist}</div>}
        {event.instructor && (
          <div className="instructor-badge">
            <div className="instructor-avatar">{event.instructor[0]}</div>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{event.instructor}</span>
          </div>
        )}
        <div className="card-title">{event.title}</div>
        {event.date && <div className="card-meta"><span>📅</span>{event.date} {event.time || ""}</div>}
        {event.location && <div className="card-meta"><span>📍</span>{event.location}</div>}
        {event.venue && <div className="card-meta"><span>🎭</span>{event.venue}</div>}
        {event.duration && <div className="card-meta"><span>⏱</span>{event.duration}</div>}
        {event.slots !== undefined && (
          <div style={{ marginTop: 8 }}>
            <SlotsBadge total={20} filled={20 - event.slots} />
          </div>
        )}
        {event.level && <div style={{ marginTop: 8 }}><LevelBadge level={event.level} /></div>}
        <div className="card-footer">
          <div>
            <div className="card-price-label">from</div>
            <div className="card-price">{event.price}</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); onClick(event); }}>
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message, icon = "✅", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <span className="toast-icon">{icon}</span>
      <span>{message}</span>
    </div>
  );
}

export function BookingModal({ event, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(0);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [payment, setPayment] = useState("momo");
  const [loading, setLoading] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const tiers = [
    { name: "Standard", price: 500000, avail: 45 },
    { name: "VIP", price: 1200000, avail: 20 },
    { name: "SVIP", price: 2500000, avail: 5 },
  ];

  const currentTier = tiers[selectedTier];
  const total = currentTier.price * qty;
  const formatPrice = (p) => p.toLocaleString("vi-VN") + "đ";

  const handlePay = () => {
    if (!form.name || !form.email || !form.phone) return;
    setLoading(true);
    setTimeout(() => {
      setBookingCode("ES-" + Math.random().toString(36).substr(2, 8).toUpperCase());
      setStep(4);
      setLoading(false);
    }, 1600);
  };

  const steps = ["Select Ticket", "Your Info", "Payment", "Confirmed"];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div className="modal-title">{step < 4 ? "Book Tickets" : "Booking Confirmed!"}</div>
            <div className="modal-sub" style={{ marginBottom: 0 }}>{event.title}</div>
          </div>
          <button className="btn btn-ghost" style={{ padding: 8 }} onClick={onClose}>✕</button>
        </div>

        {step < 4 && (
          <div className="booking-steps">
            {steps.slice(0, 3).map((s, i) => (
              <div key={i} className={`step ${step === i + 1 ? "active" : step > i + 1 ? "done" : ""}`}>
                <div className="step-num">{step > i + 1 ? "✓" : `0${i + 1}`}</div>
                <div className="step-label">{s}</div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            {tiers.map((t, i) => (
              <div key={i} className={`ticket-type ${selectedTier === i ? "selected" : ""}`} onClick={() => setSelectedTier(i)}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div className="ticket-type-name">{t.name}</div>
                    <div className="ticket-type-avail">{t.avail} remaining</div>
                  </div>
                  <div className="ticket-type-price">{formatPrice(t.price)}</div>
                </div>
              </div>
            ))}
            <div className="qty-control">
              <span style={{ fontSize: 14, color: "var(--muted)" }}>Quantity:</span>
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="qty-display">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(Math.min(8, qty + 1))}>+</button>
            </div>
            <div className="total-row">
              <span className="total-label">Total</span>
              <span className="total-amount">{formatPrice(total)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", padding: "13px", marginTop: 8, justifyContent: "center" }} onClick={() => setStep(2)}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="Nguyễn Văn A" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input className="form-input" type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input className="form-input" placeholder="0901 234 567" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={() => { if (form.name && form.email && form.phone) setStep(3); }} disabled={!form.name || !form.email || !form.phone}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="booking-summary" style={{ marginBottom: 20 }}>
              <div className="summary-row"><span className="summary-label">Event</span><span className="summary-value" style={{ maxWidth: 200, textAlign: "right", fontSize: 13 }}>{event.title}</span></div>
              <div className="summary-row"><span className="summary-label">Ticket</span><span className="summary-value">{currentTier.name} × {qty}</span></div>
              <div className="summary-row"><span className="summary-label">Total</span><span className="summary-value" style={{ color: "var(--emerald)", fontSize: 16, fontWeight: 700 }}>{formatPrice(total)}</span></div>
            </div>
            <div style={{ marginBottom: 8, fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Payment Method</div>
            <div className="payment-options">
              {[
                { id: "momo", icon: "📱", label: "MoMo" },
                { id: "vnpay", icon: "🏦", label: "VNPay" },
                { id: "zalopay", icon: "💙", label: "ZaloPay" },
                { id: "card", icon: "💳", label: "Credit Card" },
              ].map(m => (
                <div key={m.id} className={`payment-opt ${payment === m.id ? "selected" : ""}`} onClick={() => setPayment(m.id)}>
                  <div className="payment-icon">{m.icon}</div>
                  {m.label}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={handlePay} disabled={loading}>
                {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center" }}>
            <div className="success-icon">🎉</div>
            <div className="success-title">Booking Successful!</div>
            <div className="success-sub">Your e-tickets have been sent to {form.email}</div>
            <div className="booking-summary" style={{ textAlign: "left", marginBottom: 20 }}>
              <div className="summary-row"><span className="summary-label">Booking Code</span><span className="summary-value" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--emerald)" }}>{bookingCode}</span></div>
              <div className="summary-row"><span className="summary-label">Event</span><span className="summary-value" style={{ fontSize: 13 }}>{event.title}</span></div>
              <div className="summary-row"><span className="summary-label">Tickets</span><span className="summary-value">{currentTier.name} × {qty}</span></div>
              <div className="summary-row"><span className="summary-label">Total Paid</span><span className="summary-value" style={{ color: "var(--emerald)" }}>{formatPrice(total)}</span></div>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => { onSuccess({ ...event, bookingCode, qty, tierName: currentTier.name, total, buyerName: form.name }); onClose(); }}>
              View My Tickets
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
