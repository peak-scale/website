// Footer + ContactButton + SectionDots + ContactModal (Hi-fi tokens)
const Footer = () => (
  <footer style={{ background: "var(--fg-deep)", color: "#fff", padding: "80px 20px 40px", position: "relative", overflow: "hidden" }}>
    {/* faint brand-blue circle motif */}
    <div aria-hidden="true" style={{
      position: "absolute", right: -180, top: -120, width: 480, height: 480,
      borderRadius: "50%", background: "radial-gradient(circle, rgba(5,128,196,.18) 0%, rgba(5,128,196,0) 70%)",
      pointerEvents: "none",
    }}/>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, position: "relative" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18, fontWeight: 500, marginBottom: 16 }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18 L10 6 L17 18"/><path d="M14 18 L18 12 L22 18"/>
            <path d="M5 15 L10 8 L15 12 L19 10" strokeWidth="1" strokeDasharray="2 2"/>
            <circle cx="5" cy="15" r="1.5" fill="var(--brand)" stroke="none"/>
          </svg>
          Peak Scale
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.65)", margin: 0, maxWidth: 320 }}>
          Hands-on Unterstützung für Platform Engineering Teams – von Architektur über Kubernetes bis zum stabilen Betrieb.
        </p>
      </div>
      <FooterCol title="Menü" items={["Services", "Produkte", "Team"]}/>
      <FooterCol title="Rechtliches" items={["Impressum", "Datenschutz"]}/>
      <FooterCol title="Kontakt" items={["welcome@peakscale.ch", "Ryffligässchen 5", "CH-3011 Bern"]}/>
    </div>
    <div style={{ maxWidth: 1100, margin: "56px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,.45)", position: "relative" }}>
      <span>© 2025 Peak Scale</span>
      <span>Peak Scale GmbH</span>
    </div>
  </footer>
);

const FooterCol = ({ title, items }) => (
  <div>
    <div className="eyebrow eyebrow--sm" style={{ color: "var(--brand)", marginBottom: 16 }}>{title}</div>
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map(i => <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,.78)" }}>{i}</li>)}
    </ul>
  </div>
);

const ContactButton = ({ onClick }) => (
  <button onClick={onClick} aria-label="Kontakt"
    style={{
      position: "fixed", right: 22, bottom: 22, zIndex: 40,
      width: 56, height: 56, borderRadius: 9999, border: 0, cursor: "pointer",
      background: "var(--brand)", color: "#fff", boxShadow: "var(--shadow-float)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
    <Icon name="mail" size={20}/>
  </button>
);

const SectionDots = ({ sections, active, onJump }) => (
  <nav aria-label="Sections" style={{
    position: "fixed", right: 22, top: "50%", transform: "translateY(-50%)", zIndex: 20,
    display: "flex", flexDirection: "column", gap: 16, alignItems: "center",
  }}>
    {sections.map((s, i) => (
      <button key={s} aria-label={s} onClick={() => onJump(i)}
        title={s}
        style={{
          width: i === active ? 12 : 8, height: i === active ? 12 : 8, borderRadius: 9999,
          background: i === active ? "var(--brand)" : "rgba(165,171,183,.4)",
          border: 0, cursor: "pointer", padding: 0,
          transition: "all .2s ease",
        }}/>
    ))}
  </nav>
);

const ContactModal = ({ open, onClose }) => !open ? null : (
  <div onClick={onClose} style={{
    position: "fixed", inset: 0, zIndex: 50, background: "rgba(9,24,54,.5)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
  }}>
    <div onClick={e => e.stopPropagation()} style={{
      width: "100%", maxWidth: 480, background: "var(--bg-white)", borderRadius: 16,
      padding: 32, boxShadow: "var(--shadow-brand)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--fg)" }}>Kontakt</h3>
        <button onClick={onClose} aria-label="Schliessen" style={{ border: 0, background: "transparent", cursor: "pointer", color: "var(--fg-muted)" }}>
          <Icon name="x" size={20}/>
        </button>
      </div>
      <p style={{ fontSize: 15, color: "var(--fg-muted)", marginTop: 0, lineHeight: 1.55 }}>Direkter E-Mail-Kontakt — schnelle Antwort.</p>
      <div className="eyebrow" style={{ marginTop: 22, marginBottom: 8 }}>Direkt</div>
      <a style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--brand)", display: "inline-block" }}>welcome@peakscale.ch</a>
      <div className="eyebrow" style={{ marginTop: 18, marginBottom: 8 }}>Adresse</div>
      <div style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6 }}>
        Peak Scale GmbH<br/>Ryffligässchen 5<br/>CH-3011 Bern
      </div>
      <button className="btn btn--primary" style={{ width: "100%", marginTop: 28 }}>E-Mail an Peak Scale schreiben</button>
    </div>
  </div>
);

window.Footer = Footer;
window.ContactButton = ContactButton;
window.SectionDots = SectionDots;
window.ContactModal = ContactModal;
