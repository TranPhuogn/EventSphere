import { useState } from "react";

export function OrganizerPage() {
  const [activeSection, setActiveSection] = useState("my-events");
  const myEvents = [
    { name: "Tech Summit HCM 2025", date: "15 Mar 2025", status: "Active", tickets: 234, revenue: "58,500,000đ" },
    { name: "Coffee & Code Workshop", date: "22 Mar 2025", status: "Active", tickets: 18, revenue: "4,500,000đ" },
    { name: "Digital Art Exhibition", date: "28 Feb 2025", status: "Ended", tickets: 150, revenue: "37,500,000đ" },
  ];
  const reports = [
    { file: "Sales_Report_Feb_2025.xlsx", created: "01 Mar 2025", creator: "Auto", status: "Complete" },
    { file: "Attendee_List_Summit.csv", created: "16 Mar 2025", creator: "Admin", status: "Complete" },
    { file: "Revenue_Q1_2025.pdf", created: "01 Mar 2025", creator: "System", status: "Processing" },
  ];
  const [selected, setSelected] = useState([]);
  const links = [
    { id: "my-events", icon: "📅", label: "My Events" },
    { id: "reports", icon: "📊", label: "Report Management" },
    { id: "terms", icon: "📋", label: "Terms for Organizers" },
  ];

  return (
    <div className="page-enter">
      <div style={{ margin: "24px 0 0", fontFamily: "Clash Display, sans-serif", fontSize: 28, fontWeight: 700 }}>Organizer Center</div>
      <div className="organizer-layout">
        <div className="sidebar-nav">
          <div className="sidebar-section-title">Manage</div>
          {links.map(l => (
            <div key={l.id} className={`sidebar-link ${activeSection === l.id ? "active" : ""}`} onClick={() => setActiveSection(l.id)}>
              <span>{l.icon}</span>{l.label}
            </div>
          ))}
        </div>
        <div className="organizer-content">
          {activeSection === "my-events" && (
            <div>
              <div className="stat-grid">
                {[["Total Events", "3", "All time"], ["Active Events", "2", "Currently live"], ["Total Tickets", "402", "Sold"], ["Revenue", "100.5M đ", "This year"]].map(([label, val, sub]) => (
                  <div key={label} className="stat-card"><div className="stat-label">{label}</div><div className="stat-value">{val}</div><div className="stat-sub">{sub}</div></div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 18, fontWeight: 700 }}>My Events</div>
                <button className="btn btn-primary btn-sm">+ Create New Event</button>
              </div>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
                <table className="data-table">
                  <thead><tr><th>Event Name</th><th>Date</th><th>Tickets Sold</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {myEvents.map((e, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{e.name}</td>
                        <td style={{ color: "var(--muted)" }}>{e.date}</td>
                        <td>{e.tickets}</td>
                        <td style={{ color: "var(--emerald)", fontWeight: 600 }}>{e.revenue}</td>
                        <td><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: e.status === "Active" ? "rgba(0,200,83,0.15)" : "rgba(255,255,255,0.05)", color: e.status === "Active" ? "var(--emerald)" : "var(--muted)" }}>{e.status}</span></td>
                        <td><div style={{ display: "flex", gap: 6 }}><button className="btn btn-outline btn-sm">Edit</button><button className="btn btn-outline btn-sm">Stats</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeSection === "reports" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 20, fontWeight: 700 }}>Report Management</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {selected.length > 0 && <button className="btn btn-danger btn-sm">🗑 Delete ({selected.length})</button>}
                  <button className="btn btn-primary btn-sm">+ Generate Report</button>
                </div>
              </div>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
                <table className="data-table">
                  <thead><tr><th><input type="checkbox" onChange={e => setSelected(e.target.checked ? reports.map((_, i) => i) : [])} /></th><th>File Name</th><th>Created Date</th><th>Creator</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {reports.map((r, i) => (
                      <tr key={i}>
                        <td><input type="checkbox" checked={selected.includes(i)} onChange={e => setSelected(e.target.checked ? [...selected, i] : selected.filter(s => s !== i))} /></td>
                        <td style={{ fontWeight: 500 }}>📄 {r.file}</td>
                        <td style={{ color: "var(--muted)" }}>{r.created}</td>
                        <td>{r.creator}</td>
                        <td><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: r.status === "Complete" ? "rgba(0,200,83,0.15)" : "rgba(255,165,0,0.15)", color: r.status === "Complete" ? "var(--emerald)" : "orange" }}>{r.status}</span></td>
                        <td><div style={{ display: "flex", gap: 6 }}><button className="btn btn-outline btn-sm">View</button><button className="btn btn-outline btn-sm">📥</button><button className="btn btn-danger btn-sm">🗑</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeSection === "terms" && (
            <div>
              <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Terms for Organizers</div>
              <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Please review all policies before hosting events on EventSphere.</div>
              {[
                { icon: "🚫", title: "Prohibited Goods and Services", meta: "Updated 01 Jan 2025 · PDF · 2.4 MB", desc: "List of items and services not permitted for sale or promotion through EventSphere" },
                { icon: "📢", title: "Prohibited Advertising Categories", meta: "Updated 15 Jan 2025 · PDF · 1.8 MB", desc: "Categories of advertising content that are restricted on the platform" },
                { icon: "🖼", title: "Content and Image Moderation Regulations", meta: "Updated 10 Feb 2025 · PDF · 3.1 MB", desc: "Standards and guidelines for all visual and written content submitted by organizers" },
              ].map((d, i) => (
                <div key={i} className="doc-item">
                  <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <span className="doc-icon">{d.icon}</span>
                    <div>
                      <div className="doc-title">{d.title}</div>
                      <div className="doc-meta">{d.desc}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{d.meta}</div>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={e => e.stopPropagation()}>📥 Download</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CreateEventPage() {
  const [form, setForm] = useState({ title: "", category: "concerts", date: "", time: "", location: "", price: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div className="page-enter" style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <div style={{ fontFamily: "Clash Display, sans-serif", fontSize: 32, fontWeight: 700, color: "var(--emerald)", marginBottom: 8 }}>Event Created!</div>
      <div style={{ color: "var(--muted)", marginBottom: 24 }}>Your event is under review and will go live within 24 hours.</div>
      <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Create Another</button>
    </div>
  );

  return (
    <div className="page-enter">
      <div style={{ margin: "24px 0 24px", fontFamily: "Clash Display, sans-serif", fontSize: 28, fontWeight: 700 }}>Create New Event</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 28 }}>
          <div className="detail-section-title">Event Details</div>
          <div className="form-group"><label className="form-label">Event Title *</label><input className="form-input" placeholder="Enter your event name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group"><label className="form-label">Category</label>
              <select className="form-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="concerts">Concerts</option><option value="arts">Arts & Theatre</option><option value="sports">Sports</option><option value="experiences">Experiences</option><option value="workshops">Workshops</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Time</label><input className="form-input" type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Ticket Price (đ)</label><input className="form-input" placeholder="e.g. 500000" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div>
          </div>
          <div className="form-group"><label className="form-label">Venue / Location</label><input className="form-input" placeholder="Full address" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={4} placeholder="Describe your event..." style={{ resize: "vertical" }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
            <div className="detail-section-title">Event Cover Image</div>
            <div style={{ border: "2px dashed var(--border)", borderRadius: 12, padding: "32px 20px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📸</div>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>Click to upload image</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>PNG, JPG up to 10MB</div>
            </div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Ticket Types</div>
            {["Standard", "VIP", "SVIP"].map(t => (
              <div key={t} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                <span>{t}</span><span style={{ color: "var(--muted)" }}>+ Add pricing</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 16 }} onClick={() => setSubmitted(true)}>
            🚀 Publish Event
          </button>
        </div>
      </div>
    </div>
  );
}
