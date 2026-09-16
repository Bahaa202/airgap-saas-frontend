import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE = "";

export default function SubscriptionSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("confirming");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`${API_BASE}/api/payments/confirm-payment?session_id=${sessionId}`)
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          setStatus("error");
          return;
        }
        setCustomer(data);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  const apiKey = sessionStorage.getItem("pending_api_key");

  return (
    <div className="page">
      <Navbar />
      <section className="container">
        {status === "confirming" && <p>Confirming your payment…</p>}

        {status === "error" && (
          <>
            <h2>Something went wrong</h2>
            <p>We couldn't confirm your payment. Contact support if this persists.</p>
          </>
        )}

        {status === "done" && (
          <>
            <h2>Subscription active</h2>
            <p>Welcome, {customer?.full_name}. Your subscription is now active.</p>
            <p>Your API key:</p>
            <div className="api-key-box">{apiKey}</div>
            <p className="hint">Save this key — you'll need it to log in.</p>
            <Link to="/login"><button>Continue to login</button></Link>
          </>
        )}
      </section>
    </div>
  );
}
