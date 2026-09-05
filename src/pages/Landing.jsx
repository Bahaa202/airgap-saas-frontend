import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatusPanel from "../components/StatusPanel";
import { PLANS } from "../plans";

const STEPS = [
  { n: "01", title: "Request", text: "Submit the OpenShift version and the operators your cluster needs." },
  { n: "02", title: "Mirror & audit", text: "oc-mirror pulls every image, runs a CVE scan, and builds IDMS/ICSP manifests." },
  { n: "03", title: "Deploy offline", text: "Download the signed bundle and apply it inside your air-gapped cluster." },
];

export default function Landing() {
  return (
    <div className="page">
      <Navbar />

      <header className="hero">
        <div className="hero-copy">
          <p className="brand-label">AirGap-Sync</p>
          <h1>Automated OpenShift air-gapped update engine</h1>
          <p className="brief">
            AirGap-Sync automates OpenShift and Kubernetes air-gapped update
            bundle generation, CVE security audits, and IDMS/ICSP manifest
            creation — cutting maintenance time from 16 hours to under 30
            minutes.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="cta-button">Get started</Link>
            <a href="#pricing" className="cta-secondary">See plans</a>
          </div>
        </div>
        <StatusPanel />
      </header>

      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <span className="step-number">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing" id="pricing">
        <h2>Plans & pricing</h2>
        <div className="plans-grid">
          {PLANS.map((plan) => (
            <div className="plan-summary-card" key={plan.id}>
              <h3>{plan.name}</h3>
              <p className="plan-price">
                {plan.price ? `$${plan.price}` : "Custom"}
                <span className="plan-billing"> {plan.billing}</span>
              </p>
              <p className="plan-audience">{plan.audience}</p>
              <ul>
                {plan.features.slice(0, 3).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link to={`/plans/${plan.id}`} className="plan-link">
                View plan details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="contact">
        <h2>Contact</h2>
        <p>contact@airgap-sync.io</p>
        <p>Bahaa Abdelkhalik, founder — bahaa@airgap-sync.io</p>
        <p>Egypt & GCC region support</p>
      </section>
    </div>
  );
}
