// Hero.jsx — Two-column hero (Hi-fi: pill eyebrow, 86px Medium headline, brand topo motif)
const Hero = ({
  eyebrow = "Strategie → Architektur → Engineering → Betrieb",
  title = "Cloud-Transformationen, die gelingen.",
  description = "Wir begleiten Sie von der Strategie und Architektur bis zur Umsetzung – technisch fundiert, praxisnah und auf Ihre Bedürfnisse abgestimmt.",
  subtitle = "Hands-on für funktionierende Plattformen – On-prem und in den Public Clouds",
  cta = "Services ansehen",
  visualCaption = "Visualidee: Topografie-/Routenlinie (Basecamp → Peak) als dezentes Motiv.",
}) => (
  <section style={{ padding: "120px 20px 80px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" }}>
      <div>
        <div style={{ marginBottom: 24 }}>
          <span className="eyebrow--pill">{eyebrow}</span>
        </div>
        <h1 style={{
          fontSize: "clamp(40px, 6.6vw, 86px)", lineHeight: 1.05,
          fontWeight: 500, letterSpacing: "-0.02em",
          margin: "0 0 28px", color: "var(--fg)",
        }}>{title}</h1>
        <p className="lead" style={{ marginBottom: 16, maxWidth: 560 }}>{description}</p>
        <p style={{ color: "var(--fg-muted)", maxWidth: 560, marginBottom: 32, fontSize: 16, lineHeight: 1.55 }}>{subtitle}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn--primary">{cta}<span style={{ marginLeft: 6 }}>→</span></button>
          <button className="btn btn--ghost">Kontakt aufnehmen</button>
        </div>
      </div>
      <TopoVisual caption={visualCaption} />
    </div>
  </section>
);

const TopoVisual = ({ caption }) => (
  <div style={{
    aspectRatio: "5/4", background: "var(--bg-white)", borderRadius: 16,
    border: "1px solid var(--border)", boxShadow: "var(--shadow-brand)",
    position: "relative", overflow: "hidden",
    display: "flex", alignItems: "flex-end", padding: 20,
  }}>
    <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 L0 0 0 40" fill="none" stroke="rgba(5,128,196,.08)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="500" height="400" fill="url(#grid)"/>
      {/* large soft brand-tinted circle (Figma motif) */}
      <circle cx="380" cy="120" r="160" fill="rgba(5,128,196,.06)"/>
      {/* topo lines */}
      {[0, 1, 2, 3, 4].map(i => (
        <path key={i}
          d={`M-20 ${340 - i * 32} Q 120 ${280 - i * 36} 250 ${260 - i * 32} T 520 ${230 - i * 30}`}
          fill="none" stroke="rgba(9,24,54,.12)" strokeWidth="1"/>
      ))}
      {/* route */}
      <path d="M40 320 L160 250 L260 200 L360 130 L440 80" fill="none"
        stroke="var(--brand)" strokeWidth="1.5" strokeDasharray="2 4"/>
      {[ [40, 320], [160, 250], [260, 200], [360, 130], [440, 80] ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 5 : 3}
          fill={i === 4 ? "var(--brand)" : "var(--fg)"}/>
      ))}
    </svg>
    <span style={{ position: "relative", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-subtle)" }}>{caption}</span>
  </div>
);

window.Hero = Hero;
window.TopoVisual = TopoVisual;
