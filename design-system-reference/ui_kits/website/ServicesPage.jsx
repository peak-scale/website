// ServicesPage.jsx — Services route content (Hi-fi tokens)
const ServicesPage = () => (
  <>
    <Hero
      eyebrow="Strategie → Architektur → Engineering → Betrieb"
      title="Professional Services, die überzeugen"
      description="Wir begleiten Sie von technischer Orientierung und Architektur bis zur Umsetzung – damit Cloud Native Plattformen stabil, sicher und langfristig betreibbar sind."
      subtitle="Hands-on entlang klarer Etappen mit iterativen Feedback-Zyklen."
      cta="Kontakt aufnehmen"
      visualCaption="Visualidee: Etappen-/Routenmotiv (Orientierung → Architektur → Umsetzung → Betrieb)."
    />
    <Section eyebrow="Architektur" title="Cloud & Architektur"
      lead="Wenn sich Anforderungen ändern, muss Architektur mitwachsen. Wir schaffen Entscheidungsgrundlagen und Strukturen, die über die erste Roadmap hinaus tragen.">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 10px", color: "var(--fg)" }}>Orientierung & Architekturberatung</h3>
          <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.55 }}>Wir begleiten Cloud-Vorhaben – von technischer Orientierung und Zielarchitektur bis zur Umsetzung.</p>
          <div className="eyebrow" style={{ marginTop: 18, marginBottom: 8 }}>Typische Themen</div>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--fg-muted)" }}>
            <li>– Entwurf neuer Cloud-Architekturen</li>
            <li>– Modernisierung bestehender Plattformen</li>
            <li>– Skalierung, Security, Governance</li>
            <li>– Aufbau von Landing Zones und Plattformkomponenten</li>
          </ul>
        </div>
        <div className="card">
          <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 10px", color: "var(--fg)" }}>Solution Architecture & Reviews</h3>
          <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.55 }}>Wir analysieren und challengen bestehende Lösungen – mit Fokus auf technische Machbarkeit, Sicherheit und Weiterentwicklung.</p>
          <div className="eyebrow" style={{ marginTop: 18, marginBottom: 8 }}>Output</div>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--fg-muted)" }}>
            <li>– Risikoanalyse</li>
            <li>– Konkrete Empfehlungen</li>
            <li>– Priorisierung der Massnahmen</li>
            <li>– Entscheidungsgrundlage für Management & Engineering</li>
          </ul>
        </div>
      </div>
    </Section>
    <Section alt eyebrow="Engineering" title="Direkt im Team"
      lead="Wir arbeiten direkt mit Ihrem Team am Design, Aufbau und Betrieb moderner Cloud Native Komponenten – mit Fokus auf Automatisierung, Sicherheit und reproduzierbare Abläufe.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {[
          { title: "Container & Plattformen", items: ["Kubernetes", "Multi-Tenancy mit Capsule", "Control Planes & Cluster Management"] },
          { title: "GitOps & Workflows", items: ["Argo CD", "Flux", "CI/CD Pipelines", "Supply Chain Security (SLSA)"] },
          { title: "Infrastructure Automation", items: ["OpenTofu / Terraform", "Infrastructure as Code", "Configuration as Code"] },
          { title: "Security & Observability", items: ["Kubernetes Security", "Policy as Code", "Monitoring & Observability"] },
        ].map(cat => (
          <div key={cat.title} className="card">
            <div className="eyebrow" style={{ marginBottom: 14 }}>{cat.title}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cat.items.map(i => (
                <li key={i} style={{
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  padding: "5px 12px", border: "1px solid var(--border)",
                  borderRadius: 8, color: "var(--fg)", background: "var(--bg)",
                }}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
    <Section eyebrow="Stimmen aus Projekten">
      <Testimonial/>
    </Section>
  </>
);

window.ServicesPage = ServicesPage;
