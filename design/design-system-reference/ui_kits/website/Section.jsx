// Section.jsx — generic alternating section + Pillars + Icon (Hi-fi tokens)
const Section = ({ eyebrow, title, lead, alt = false, children, id }) => (
  <section id={id} style={{
    padding: "80px 20px",
    background: alt ? "var(--bg-white)" : "transparent",
    borderTop: alt ? "1px solid var(--border-faint)" : "none",
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {(eyebrow || title || lead) && (
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          {eyebrow && <div className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</div>}
          {title && (
            <h2 style={{
              fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500,
              letterSpacing: "-0.02em", margin: "0 0 18px", lineHeight: 1.1, color: "var(--fg)",
            }}>{title}</h2>
          )}
          {lead && <p className="lead" style={{ margin: 0 }}>{lead}</p>}
        </div>
      )}
      {children}
    </div>
  </section>
);

// Pillars — 4 column service teasers with icon
const Pillars = () => {
  const items = [
    { icon: "cloud", title: "Cloud Architecture", body: "Wir entwickeln und evaluieren Cloud-Architekturen, die sich weiterentwickeln können – pragmatisch, transparent und auf Ihre Umgebung abgestimmt." },
    { icon: "code", title: "Engineering", body: "Wir unterstützen Teams beim Design, beim Aufbau und bei der Automatisierung moderner Cloud Native Plattformen und Workflows." },
    { icon: "clipboard", title: "Assessments", body: "Fundierte Beurteilungen von bestehenden Lösungen: Architektur, Kubernetes, Security, Prozesse, GitOps und CI/CD." },
    { icon: "graduation", title: "Training & Enablement", body: "Wir geben Wissen weiter – in kompakten Workshops oder tiefen technischen Trainings für Engineers und Architekten." },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
      {items.map((it, i) => <PillarCard key={i} {...it} />)}
    </div>
  );
};

const PillarCard = ({ icon, title, body }) => (
  <div className="card">
    <div style={{
      width: 48, height: 48, borderRadius: 12,
      background: "var(--brand-soft)", color: "var(--brand)",
      display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22,
    }}>
      <Icon name={icon} size={24}/>
    </div>
    <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 10px", color: "var(--fg)" }}>{title}</h3>
    <p style={{ fontSize: 15, color: "var(--fg-muted)", margin: "0 0 18px", lineHeight: 1.55 }}>{body}</p>
    <a style={{ fontSize: 13, fontWeight: 500, color: "var(--brand)", display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>Mehr erfahren →</a>
  </div>
);

const Icon = ({ name, size = 24 }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "cloud": return <svg {...props}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>;
    case "code": return <svg {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case "clipboard": return <svg {...props}><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>;
    case "graduation": return <svg {...props}><path d="M21.42 10.92a1 1 0 0 0 0-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>;
    case "mail": return <svg {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
    case "arrow-right": return <svg {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
    case "menu": return <svg {...props}><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;
    case "x": return <svg {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    default: return null;
  }
};

window.Section = Section;
window.Pillars = Pillars;
window.PillarCard = PillarCard;
window.Icon = Icon;
