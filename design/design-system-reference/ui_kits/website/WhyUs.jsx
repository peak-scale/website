// WhyUs.jsx — 5-tile grid + Testimonial + Lifecycle stages + Partner logos (Hi-fi)
const WhyUs = () => {
  const items = [
    { title: "Swiss-first Kontext", body: "Erfahrung in Schweizer IT-Umgebungen – vertraut mit typischen Anforderungen von Unternehmen, Behörden und regulierten Branchen." },
    { title: "Hands-on Zusammenarbeit", body: "Direkt mit Engineering- und Architekturteams – kollaborativ, technisch, ohne unnötige Beratungslayer." },
    { title: "Security & Wartbarkeit", body: "Realistische Risikobewertung und konkrete Massnahmen – damit Plattformen sicher bleiben und langfristig betreibbar sind." },
    { title: "Enablement statt Abhängigkeit", body: "Wissenstransfer, Dokumentation und Training – damit Teams nachhaltig selbstständig weiterarbeiten können." },
    { title: "Spezialisiertes Team", body: "Kein Full-Service-Bauchladen – ein fokussiertes Team mit tiefem Cloud-Native-Know-how." },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {items.map((it, i) => (
        <div key={i} className={i === 1 ? "card card--brand" : "card"}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: i === 1 ? "rgba(255,255,255,.7)" : "var(--fg-subtle)" }}>0{i + 1}</span>
            <span style={{ flex: 1, height: 1, background: i === 1 ? "rgba(255,255,255,.2)" : "var(--border)" }}/>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 10px", color: i === 1 ? "#fff" : "var(--fg)" }}>{it.title}</h3>
          <p style={{ fontSize: 15, margin: 0, lineHeight: 1.55, color: i === 1 ? "rgba(255,255,255,.78)" : "var(--fg-muted)" }}>{it.body}</p>
        </div>
      ))}
    </div>
  );
};

const Testimonial = ({
  quote = "Peak Scale hat uns zielgerichtet bei der Modernisierung unserer Infrastruktur unterstützt. Besonders wertvoll war die klare, pragmatische Vorgehensweise.",
  author = "Senior IT Architect, Schweizer Bundesverwaltung",
}) => (
  <figure style={{ margin: 0, maxWidth: 820 }}>
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 32, height: 32, borderRadius: 9999,
      background: "var(--brand)", color: "#fff",
      fontFamily: "Georgia, serif", fontSize: 20, lineHeight: 1, marginBottom: 18,
    }}>“</span>
    <blockquote style={{ margin: 0, fontStyle: "italic", fontSize: 26, lineHeight: 1.4, color: "var(--fg)", fontWeight: 400 }}>
      {quote}
    </blockquote>
    <figcaption style={{ marginTop: 18, fontSize: 14, color: "var(--fg-muted)" }}>— {author}</figcaption>
  </figure>
);

const Lifecycle = ({ active = 1 }) => {
  const stages = ["Strategie", "Architektur", "Engineering", "Betrieb"];
  const subs = ["Orientierung & Zielbild", "Tragfähige Zielarchitektur", "Hands-on Umsetzung", "Stabiler Betrieb & Lifecycle"];
  return (
    <div style={{
      display: "flex", alignItems: "stretch",
      border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden",
      background: "var(--bg-white)", boxShadow: "var(--shadow-brand)",
    }}>
      {stages.map((s, i) => (
        <div key={s} style={{
          flex: 1, padding: "26px 24px",
          background: i === active ? "var(--brand-soft)" : "transparent",
          borderLeft: i === 0 ? 0 : "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{
              width: 10, height: 10, borderRadius: 9999,
              background: i === active ? "var(--brand)" : "rgba(165,171,183,.5)",
              boxShadow: i === active ? "0 0 0 4px rgba(5,128,196,.15)" : "none",
            }}/>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-subtle)" }}>0{i + 1}</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 500, color: "var(--fg)" }}>{s}</div>
          <div style={{ fontSize: 14, color: "var(--fg-muted)", marginTop: 4, lineHeight: 1.5 }}>{subs[i]}</div>
        </div>
      ))}
    </div>
  );
};

const PartnerLogos = () => {
  const partners = ["Sidero Labs", "SUSE Rancher Prime", "Google Cloud", "Clastix · Capsule"];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
      background: "var(--border)", border: "1px solid var(--border)",
      borderRadius: 16, overflow: "hidden",
    }}>
      {partners.map(p => (
        <div key={p} style={{
          background: "var(--bg-white)", padding: "32px 14px", textAlign: "center",
          color: "var(--fg-muted)", fontSize: 14, fontWeight: 500,
        }}>{p}</div>
      ))}
    </div>
  );
};

window.WhyUs = WhyUs;
window.Testimonial = Testimonial;
window.Lifecycle = Lifecycle;
window.PartnerLogos = PartnerLogos;
