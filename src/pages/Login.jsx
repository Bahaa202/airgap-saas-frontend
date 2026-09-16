import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE = "";

export default function Login({ onLogin }) {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // نتأكد إن المفتاح صحيح بمحاولة نجيب أي bundle (endpoint بيرفض المفتاح الغلط بـ401)
    const res = await fetch(`${API_BASE}/api/bundles/ping-check`, {
      headers: { "X-API-Key": apiKey },
    });

    if (res.status === 401) {
      setError("Invalid API key");
      return;
    }

    // 404 يعني المفتاح صح لكن الـjob مش موجود (متوقع) — الاتنين حالة نجاح هنا
    onLogin(apiKey);
    navigate("/dashboard");
  }

  return (
    <div className="page">
      <Navbar />
      <section className="container">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <label>
            API key
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="paste your API key"
              required
            />
          </label>
          <button type="submit">Log in</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="hint">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </section>
    </div>
  );
}
