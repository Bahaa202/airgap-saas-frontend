import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPlanById } from "../plans";

export default function PlanDetail() {
  const { planId } = useParams();
  const plan = getPlanById(planId);

  if (!plan) return <Navigate to="/" replace />;

  return (
    <div className="page">
      <Navbar />

      <section className="plan-detail">
        <p className="brand-label">{plan.name} plan</p>
        <h1>{plan.tagline}</h1>

        <div className="plan-detail-price">
          <span className="price-amount">
            {plan.price ? `$${plan.price}` : "Custom pricing"}
          </span>
          <span className="price-billing">{plan.billing}</span>
        </div>

        <p className="plan-detail-meta">
          Billing cycle: every {plan.durationDays} days · Built for: {plan.audience}
        </p>

        <ul className="plan-detail-features">
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <div className="plan-detail-actions">
          <Link to={`/register?plan=${plan.id}`} className="cta-button">
            Subscribe to {plan.name}
          </Link>
          <Link to="/" className="cta-secondary">Back to plans</Link>
        </div>
      </section>
    </div>
  );
}
