import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PLANS } from "../plans";

const API_BASE = "http://localhost:5000";

export default function Register() {
  const [searchParams] = useSearchParams();
  const preselectedPlan = searchParams.get("plan") || "starter";

  const [form, setForm] = useState({
    full_name: "",
    role: "",
    company_name: "",
    business_email: "",
    phone: "",
    country: "",
    plan: preselectedPlan,
  });
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_BASE}/api/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const customer = await res.json();
    if (!res.ok) {
      setError(customer.error || "Something went wrong");
      return;
    }

    if (form.plan === "enterprise") {
      // No self-serve checkout for Enterprise — contact sales instead.
      window.location.href = "/#contact";
      return;
    }

    setRedirecting(true);

    const checkoutRes = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer_id: customer.id }),
    });

    const checkoutData = await checkoutRes.json();
    if (!checkoutRes.ok) {
      setError(checkoutData.error || "Could not start checkout");
      setRedirecting(false);
      return;
    }

    // Stash the API key locally so the success page can show it after payment.
    sessionStorage.setItem("pending_customer_id", customer.id);
    sessionStorage.setItem("pending_api_key", customer.api_key);

    window.location.href = checkoutData.checkout_url;
  }

  return (
    <div className="page">
      <Navbar />
      <section className="container">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input type="text" value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)} required />
          </label>
          <label>
            Your role
            <input type="text" value={form.role} onChange={(e) => updateField("role", e.target.value)} placeholder="e.g. Infrastructure Manager" required />
          </label>
          <label>
            Company name
            <input type="text" value={form.company_name} onChange={(e) => updateField("company_name", e.target.value)} required />
          </label>
          <label>
            Business email
            <input type="email" value={form.business_email} onChange={(e) => updateField("business_email", e.target.value)} required />
          </label>
          <label>
            Phone number
            <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} required />
          </label>
          <label>
            Country
            <input type="text" value={form.country} onChange={(e) => updateField("country", e.target.value)} required />
          </label>
          <label>
            Plan
            <select value={form.plan} onChange={(e) => updateField("plan", e.target.value)}>
              {PLANS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.price ? `$${p.price}/mo` : "Custom"}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={redirecting}>
            {redirecting ? "Redirecting to payment…" : "Create account & subscribe"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="hint">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </div>
  );
}
