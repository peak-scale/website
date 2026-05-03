// Header.jsx — Floating pill header (Hi-fi). Pill chrome with brand-tinted shadow,
// nav items separated by 6px brand-blue squares rotated 45°, brand-blue Kontakt CTA.
const Header = ({ active = "Services", lang = "DE", onLangChange = () => {}, onNav = () => {} }) => {
  const items = ["Services", "Produkte", "Team"];
  return (
    <header style={{ position: "sticky", top: 16, zIndex: 30, padding: "0 20px" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 22px", borderRadius: 60,
        background: "rgba(255,255,255,.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        boxShadow: "var(--shadow-float)", border: "1px solid var(--border-faint)",
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500, fontSize: 18, color: "var(--fg)" }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18 L10 6 L17 18"/><path d="M14 18 L18 12 L22 18"/>
            <path d="M5 15 L10 8 L15 12 L19 10" strokeWidth="1" strokeDasharray="2 2"/>
            <circle cx="5" cy="15" r="1.5" fill="var(--brand)" stroke="none"/>
          </svg>
          Peak Scale
        </a>
        <nav style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {items.map((it, i) => (
            <React.Fragment key={it}>
              {i > 0 && <span className="dot-square" aria-hidden="true"/>}
              <button onClick={() => onNav(it)}
                style={{
                  border: 0, cursor: "pointer", background: "transparent",
                  fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500,
                  color: active === it ? "var(--brand)" : "var(--fg-muted)",
                  padding: "4px 0", transition: "color .18s ease",
                }}>
                {it}
              </button>
            </React.Fragment>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", background: "var(--bg)", borderRadius: 9999, padding: 2 }}>
            {["DE", "EN"].map(l => (
              <button key={l} onClick={() => onLangChange(l)}
                style={{ border: 0, padding: "4px 12px", fontSize: 12, fontWeight: 500, borderRadius: 9999, cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  background: lang === l ? "#fff" : "transparent",
                  color: lang === l ? "var(--brand)" : "var(--fg-muted)",
                  boxShadow: lang === l ? "var(--shadow-soft)" : "none" }}>
                {l}
              </button>
            ))}
          </div>
          <button className="btn btn--primary" style={{ padding: "10px 20px" }}>Kontakt</button>
        </div>
      </div>
    </header>
  );
};

window.Header = Header;
