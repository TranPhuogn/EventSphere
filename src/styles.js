export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --emerald: #00C853; --emerald-dark: #00A040; --emerald-dim: rgba(0,200,83,0.12);
    --bg: #0A0F0D; --surface: #111916; --card: #141B16; --card2: #182019;
    --border: #1C2B20; --text: #E2F0E6; --muted: #6A8A72;
    --accent: #B9FF6A; --danger: #FF4757; --gold: #FFD700;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--emerald-dark); }
  .header { position: sticky; top: 0; z-index: 100; background: rgba(10, 15, 13, 0.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
  .header-top { display: flex; align-items: center; gap: 16px; padding: 14px 40px; max-width: 1400px; margin: 0 auto; }
  .logo { display: flex; align-items: center; gap: 8px; font-family: 'Clash Display', sans-serif; font-size: 22px; font-weight: 700; color: var(--emerald); cursor: pointer; white-space: nowrap; flex-shrink: 0; text-decoration: none; }
  .logo-icon { width: 34px; height: 34px; background: var(--emerald); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .search-bar { flex: 1; max-width: 520px; margin: 0 auto; position: relative; }
  .search-bar input { width: 100%; background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 10px 16px 10px 44px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: all 0.2s; }
  .search-bar input:focus { border-color: var(--emerald); background: var(--card2); }
  .search-bar input::placeholder { color: var(--muted); }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 16px; pointer-events: none; }
  .header-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .btn { border: none; cursor: pointer; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 14px; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
  .btn-ghost { background: transparent; color: var(--text); padding: 9px 14px; }
  .btn-ghost:hover { background: var(--card); color: var(--emerald); }
  .btn-primary { background: var(--emerald); color: #000; padding: 9px 18px; font-weight: 600; }
  .btn-primary:hover { background: #00E060; transform: translateY(-1px); }
  .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 9px 16px; }
  .btn-outline:hover { border-color: var(--emerald); color: var(--emerald); }
  .btn-sm { padding: 6px 14px; font-size: 13px; }
  .btn-danger { background: var(--danger); color: #fff; }
  .btn-danger:hover { background: #ff2233; }
  .avatar-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--emerald-dim); border: 1.5px solid var(--emerald); color: var(--emerald); font-weight: 700; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0; }
  .dropdown { position: absolute; top: calc(100% + 8px); right: 0; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; min-width: 200px; padding: 8px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); z-index: 200; }
  .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; color: var(--text); cursor: pointer; font-size: 14px; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
  .dropdown-item:hover { background: var(--card); color: var(--emerald); }
  .dropdown-item.danger:hover { background: rgba(255,71,87,0.1); color: var(--danger); }
  .dropdown-divider { border: none; border-top: 1px solid var(--border); margin: 6px 0; }
  .cat-nav { border-top: 1px solid var(--border); background: rgba(10, 15, 13, 0.92); }
  .cat-nav-inner { display: flex; align-items: center; gap: 0; padding: 0 40px; max-width: 1400px; margin: 0 auto; overflow-x: auto; scrollbar-width: none; }
  .cat-nav-inner::-webkit-scrollbar { display: none; }
  .cat-link { display: flex; align-items: center; gap: 7px; padding: 13px 20px; font-size: 14px; font-weight: 500; color: var(--muted); cursor: pointer; white-space: nowrap; border-bottom: 2px solid transparent; transition: all 0.2s; position: relative; }
  .cat-link:hover { color: var(--text); }
  .cat-link.active { color: var(--emerald); border-bottom-color: var(--emerald); }
  .main { max-width: 1400px; margin: 0 auto; padding: 0 40px 80px; }
  .hero { position: relative; height: 500px; overflow: hidden; border-radius: 20px; margin: 28px 0; }
  .hero-slide { position: absolute; inset: 0; display: flex; align-items: center; opacity: 0; transition: opacity 0.7s ease; overflow: hidden; }
  .hero-slide.active { opacity: 1; }
  .hero-bg { position: absolute; inset: 0; }
  .hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.35; }
  .hero-gradient { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%); }
  .hero-content { position: relative; z-index: 2; padding: 0 60px; max-width: 600px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--emerald-dim); border: 1px solid var(--emerald); color: var(--emerald); padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 16px; }
  .hero-title { font-family: 'Clash Display', sans-serif; font-size: 44px; font-weight: 700; line-height: 1.05; margin-bottom: 14px; color: #fff; }
  .hero-meta { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
  .hero-meta-item { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #bbb; }
  .hero-price { font-size: 22px; font-weight: 700; color: var(--emerald); margin-bottom: 24px; }
  .hero-actions { display: flex; gap: 12px; }
  .hero-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; width: 44px; height: 44px; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; font-size: 18px; transition: all 0.2s; backdrop-filter: blur(8px); }
  .hero-arrow:hover { background: var(--emerald); border-color: var(--emerald); color: #000; }
  .hero-arrow.left { left: 16px; }
  .hero-arrow.right { right: 16px; }
  .hero-dots { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
  .hero-dot { width: 8px; height: 8px; border-radius: 4px; background: rgba(255,255,255,0.3); cursor: pointer; transition: all 0.3s; }
  .hero-dot.active { width: 28px; background: var(--emerald); }
  .section { margin-bottom: 52px; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-family: 'Clash Display', sans-serif; font-size: 24px; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 10px; }
  .section-badge { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; background: var(--emerald-dim); color: var(--emerald); border-radius: 4px; }
  .see-all { color: var(--emerald); font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: gap 0.2s; }
  .see-all:hover { gap: 8px; }
  .scroll-row { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
  .scroll-row::-webkit-scrollbar { display: none; }
  .event-card { flex-shrink: 0; width: 260px; background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.25s; }
  .event-card:hover { transform: translateY(-4px); border-color: var(--emerald); box-shadow: 0 12px 40px rgba(0,200,83,0.12); }
  .event-card-wide { width: 300px; }
  .card-img { width: 100%; height: 160px; object-fit: cover; display: block; }
  .card-body { padding: 14px; }
  .card-category { font-size: 11px; font-weight: 600; color: var(--emerald); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .card-title { font-family: 'Clash Display', sans-serif; font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 10px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .card-meta { font-size: 12px; color: var(--muted); margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
  .card-price { font-size: 15px; font-weight: 700; color: var(--emerald); }
  .card-price-label { font-size: 11px; color: var(--muted); }
  .promo-banner { border-radius: 20px; padding: 48px 60px; margin: 52px 0; display: flex; align-items: center; justify-content: space-between; overflow: hidden; position: relative; }
  .promo-1 { background: linear-gradient(135deg, #001A0A 0%, #003318 50%, #00C85318 100%); border: 1px solid rgba(0,200,83,0.2); }
  .promo-2 { background: linear-gradient(135deg, #0A001A 0%, #180030 50%, #7C3AED18 100%); border: 1px solid rgba(124,58,237,0.2); }
  .promo-title { font-family: 'Clash Display', sans-serif; font-size: 32px; font-weight: 700; margin-bottom: 10px; }
  .promo-sub { font-size: 16px; color: var(--muted); max-width: 420px; margin-bottom: 24px; }
  .promo-deco { position: absolute; right: 60px; top: 50%; transform: translateY(-50%); font-size: 120px; opacity: 0.08; }
  .page-banner { border-radius: 20px; overflow: hidden; position: relative; height: 280px; margin: 28px 0; }
  .page-banner img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; }
  .page-banner-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%); display: flex; align-items: center; padding: 0 60px; }
  .page-banner-title { font-family: 'Clash Display', sans-serif; font-size: 52px; font-weight: 700; color: #fff; }
  .page-banner-sub { font-size: 18px; color: rgba(255,255,255,0.6); margin-top: 8px; }
  .filter-bar { display: flex; align-items: center; gap: 12px; padding: 16px 0; flex-wrap: wrap; }
  .filter-label { font-size: 13px; color: var(--muted); font-weight: 500; }
  .filter-select { background: var(--card); border: 1px solid var(--border); color: var(--text); padding: 8px 14px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; outline: none; transition: border-color 0.2s; }
  .filter-select:focus { border-color: var(--emerald); }
  .filter-chip { padding: 7px 14px; border-radius: 20px; font-size: 13px; cursor: pointer; border: 1px solid var(--border); background: transparent; color: var(--muted); transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .filter-chip.active { border-color: var(--emerald); color: var(--emerald); background: var(--emerald-dim); }
  .filter-chip:hover { border-color: var(--emerald); color: var(--emerald); }
  .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 8px; }
  .events-grid .event-card { width: 100%; flex-shrink: initial; }
  .detail-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; margin-top: 32px; align-items: start; }
  .detail-cover { width: 100%; height: 420px; object-fit: cover; border-radius: 20px; display: block; }
  .detail-title { font-family: 'Clash Display', sans-serif; font-size: 36px; font-weight: 700; margin: 20px 0 16px; }
  .detail-meta-row { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 24px; }
  .detail-meta-item { display: flex; align-items: flex-start; gap: 10px; padding: 14px 18px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; min-width: 180px; }
  .detail-meta-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
  .detail-meta-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }
  .detail-meta-value { font-size: 15px; font-weight: 500; }
  .detail-section-title { font-family: 'Clash Display', sans-serif; font-size: 20px; font-weight: 600; margin-bottom: 14px; }
  .detail-desc { font-size: 15px; line-height: 1.7; color: var(--muted); }
  .ticket-sidebar { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 24px; position: sticky; top: 80px; }
  .ticket-type { border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; }
  .ticket-type:hover { border-color: var(--emerald); }
  .ticket-type.selected { border-color: var(--emerald); background: var(--emerald-dim); }
  .ticket-type-name { font-weight: 600; margin-bottom: 4px; }
  .ticket-type-price { font-size: 18px; font-weight: 700; color: var(--emerald); }
  .ticket-type-avail { font-size: 12px; color: var(--muted); }
  .qty-control { display: flex; align-items: center; gap: 12px; margin: 16px 0; }
  .qty-btn { width: 36px; height: 36px; border-radius: 8px; background: var(--card2); border: 1px solid var(--border); color: var(--text); font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .qty-btn:hover { border-color: var(--emerald); color: var(--emerald); }
  .qty-display { font-size: 20px; font-weight: 700; min-width: 40px; text-align: center; }
  .total-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-top: 1px solid var(--border); }
  .total-label { font-size: 14px; color: var(--muted); }
  .total-amount { font-size: 24px; font-weight: 700; color: var(--emerald); }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(8px); }
  .modal { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; padding: 32px; }
  .modal-title { font-family: 'Clash Display', sans-serif; font-size: 26px; font-weight: 700; margin-bottom: 6px; }
  .modal-sub { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
  .form-group { margin-bottom: 18px; }
  .form-label { font-size: 13px; font-weight: 500; color: var(--muted); margin-bottom: 6px; display: block; letter-spacing: 0.03em; }
  .form-input { width: 100%; background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 11px 14px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-color: var(--emerald); }
  .payment-options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
  .payment-opt { padding: 14px; border: 1px solid var(--border); border-radius: 12px; cursor: pointer; text-align: center; transition: all 0.2s; font-size: 14px; font-weight: 500; }
  .payment-opt:hover, .payment-opt.selected { border-color: var(--emerald); background: var(--emerald-dim); color: var(--emerald); }
  .payment-icon { font-size: 24px; margin-bottom: 6px; }
  .booking-steps { display: flex; gap: 0; margin-bottom: 28px; }
  .step { flex: 1; text-align: center; position: relative; padding-bottom: 8px; border-bottom: 2px solid var(--border); }
  .step.active { border-bottom-color: var(--emerald); }
  .step.done { border-bottom-color: var(--emerald-dark); }
  .step-num { font-size: 12px; font-weight: 700; color: var(--muted); }
  .step.active .step-num, .step.done .step-num { color: var(--emerald); }
  .step-label { font-size: 11px; color: var(--muted); margin-top: 4px; }
  .step.active .step-label { color: var(--text); }
  .success-icon { font-size: 64px; text-align: center; margin-bottom: 16px; }
  .success-title { font-family: 'Clash Display', sans-serif; font-size: 28px; font-weight: 700; text-align: center; color: var(--emerald); margin-bottom: 8px; }
  .success-sub { text-align: center; color: var(--muted); margin-bottom: 24px; }
  .booking-summary { background: var(--card); border-radius: 12px; padding: 16px; margin-bottom: 20px; }
  .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
  .summary-row:not(:last-child) { border-bottom: 1px solid var(--border); }
  .summary-label { color: var(--muted); }
  .summary-value { font-weight: 500; }
  .ticket-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; display: flex; margin-bottom: 16px; transition: border-color 0.2s; }
  .ticket-card:hover { border-color: var(--emerald); }
  .ticket-img { width: 160px; flex-shrink: 0; object-fit: cover; }
  .ticket-info { padding: 20px 24px; flex: 1; }
  .ticket-status { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
  .status-confirmed { background: rgba(0,200,83,0.15); color: var(--emerald); }
  .status-pending { background: rgba(255,165,0,0.15); color: orange; }
  .ticket-name { font-family: 'Clash Display', sans-serif; font-size: 20px; font-weight: 600; margin-bottom: 8px; }
  .ticket-code { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--muted); }
  .organizer-layout { display: grid; grid-template-columns: 240px 1fr; gap: 24px; margin-top: 28px; }
  .sidebar-nav { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 8px; height: fit-content; position: sticky; top: 80px; }
  .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; color: var(--muted); transition: all 0.15s; }
  .sidebar-link:hover { background: var(--card2); color: var(--text); }
  .sidebar-link.active { background: var(--emerald-dim); color: var(--emerald); }
  .sidebar-section-title { font-size: 11px; color: var(--muted); padding: 10px 14px 4px; text-transform: uppercase; letter-spacing: 0.08em; }
  .organizer-content { min-height: 500px; }
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th { text-align: left; padding: 12px 16px; font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid var(--border); font-weight: 600; }
  .data-table td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid var(--border); }
  .data-table tr:hover td { background: var(--card); }
  .data-table th:first-child, .data-table td:first-child { padding-left: 8px; }
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; }
  .stat-label { font-size: 13px; color: var(--muted); margin-bottom: 8px; }
  .stat-value { font-family: 'Clash Display', sans-serif; font-size: 28px; font-weight: 700; color: var(--emerald); }
  .stat-sub { font-size: 12px; color: var(--muted); margin-top: 4px; }
  .profile-header { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 32px; display: flex; align-items: center; gap: 24px; margin-bottom: 24px; }
  .profile-avatar { width: 80px; height: 80px; border-radius: 50%; background: var(--emerald-dim); border: 2px solid var(--emerald); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: var(--emerald); flex-shrink: 0; }
  .profile-name { font-family: 'Clash Display', sans-serif; font-size: 26px; font-weight: 700; }
  .profile-email { color: var(--muted); font-size: 14px; margin-top: 4px; }
  .match-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; transition: border-color 0.2s; }
  .match-card:hover { border-color: var(--emerald); cursor: pointer; }
  .team-name { font-family: 'Clash Display', sans-serif; font-size: 18px; font-weight: 600; }
  .vs-badge { font-family: 'JetBrains Mono', monospace; font-size: 14px; color: var(--muted); padding: 0 20px; }
  .countdown-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 71, 87, 0.15); border: 1px solid rgba(255,71,87,0.3); color: var(--danger); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .instructor-badge { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
  .instructor-avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--emerald-dim); border: 1px solid var(--emerald); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--emerald); flex-shrink: 0; }
  .level-badge { display: inline-block; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.06em; }
  .level-beginner { background: rgba(0,200,83,0.15); color: var(--emerald); }
  .level-intermediate { background: rgba(255,165,0,0.15); color: orange; }
  .level-advanced { background: rgba(255,71,87,0.15); color: var(--danger); }
  .slots-indicator { display: flex; align-items: center; gap: 6px; font-size: 12px; }
  .slots-bar { width: 60px; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .slots-fill { height: 100%; background: var(--emerald); border-radius: 2px; transition: width 0.3s; }
  .slots-low .slots-fill { background: var(--danger); }
  .slots-text { color: var(--muted); }
  .doc-item { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; }
  .doc-item:hover { border-color: var(--emerald); }
  .doc-icon { font-size: 24px; margin-right: 14px; }
  .doc-title { font-weight: 500; }
  .doc-meta { font-size: 12px; color: var(--muted); margin-top: 3px; }
  .page-enter { animation: fadeSlideIn 0.3s ease forwards; }
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .toast { position: fixed; bottom: 32px; right: 32px; z-index: 1000; background: var(--surface); border: 1px solid var(--emerald); border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; gap: 12px; font-size: 14px; box-shadow: 0 8px 30px rgba(0,200,83,0.2); animation: slideToast 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  @keyframes slideToast { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  .toast-icon { font-size: 20px; }
  .search-results { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; position: absolute; top: calc(100% + 8px); left: 0; right: 0; z-index: 200; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
  .search-result-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; cursor: pointer; transition: background 0.15s; }
  .search-result-item:hover { background: var(--card); }
  .search-result-img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
  .search-result-title { font-size: 14px; font-weight: 500; }
  .search-result-sub { font-size: 12px; color: var(--muted); }
  @media (max-width: 768px) {
    .header-top { padding: 12px 16px; gap: 10px; }
    .main { padding: 0 16px 60px; }
    .hero { height: 380px; }
    .hero-title { font-size: 28px; }
    .hero-content { padding: 0 30px; }
    .detail-grid { grid-template-columns: 1fr; }
    .organizer-layout { grid-template-columns: 1fr; }
    .stat-grid { grid-template-columns: 1fr 1fr; }
  }
`;
