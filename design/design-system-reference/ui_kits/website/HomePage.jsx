// HomePage.jsx — sequence the homepage (Hi-fi: Warum-Peak-Scale uses display-xl)
const HomePage = () => (
  <>
    <Hero/>
    <Section eyebrow="Was IT-Teams gewinnen" title="Klare Orientierung — entlang des Lebenszyklus"
      lead="Pragmatische Umsetzung statt Beratungslayer. Vier Säulen, ein Team.">
      <Pillars/>
    </Section>
    <Section alt eyebrow="Lifecycle" title="Strategie → Architektur → Engineering → Betrieb">
      <Lifecycle active={1}/>
    </Section>

    {/* Hi-fi signature: 128px Light centred display headline */}
    <section style={{ padding: "120px 20px 96px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Warum Peak Scale</div>
        <h2 className="display-xl" style={{ marginBottom: 24 }}>Warum Peak Scale?</h2>
        <p className="lead" style={{ maxWidth: 640, margin: "0 auto 56px" }}>
          Peak für Tiefe. Scale für Plattformen, die mitwachsen.
        </p>
        <WhyUs/>
      </div>
    </section>

    <Section alt eyebrow="Stimmen aus Projekten">
      <Testimonial/>
    </Section>
    <Section eyebrow="Technologiepartner" title="Vendor-Beziehungen mit echtem Support">
      <PartnerLogos/>
    </Section>
  </>
);

window.HomePage = HomePage;
