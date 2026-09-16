import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE = "";

export default function Dashboard({ apiKey }) {
  const [ocpVersion, setOcpVersion] = useState("4.16");
  const [operators, setOperators] = useState("odf-operator");
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!job || job.status === "completed" || job.status === "failed") return;
    const interval = setInterval(async () => {
      const res = await fetch(`${API_BASE}/api/bundles/${job.id}`, {
        headers: { "X-API-Key": apiKey },
      });
      const data = await res.json();
      if (res.ok) setJob(data);
    }, 3000);
    return () => clearInterval(interval);
  }, [job, apiKey]);

  if (!apiKey) return <Navigate to="/login" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setJob(null);

    const res = await fetch(`${API_BASE}/api/bundles`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
      body: JSON.stringify({
        ocp_version: ocpVersion,
        operators: operators.split(",").map((o) => o.trim()),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }
    setJob(data);
  }

  return (
    <div className="page">
      <Navbar />
      <section className="container">
        <h2>Request a bundle</h2>
        <form onSubmit={handleSubmit}>
          <label>
            OpenShift version
            <input type="text" value={ocpVersion} onChange={(e) => setOcpVersion(e.target.value)} required />
          </label>
          <label>
            Operators (comma-separated)
            <input type="text" value={operators} onChange={(e) => setOperators(e.target.value)} required />
          </label>
          <button type="submit">Request bundle</button>
        </form>
        {error && <p className="error">{error}</p>}
        {job && (
          <div className="job-status">
            <h3>Job status</h3>
            <p>ID: <span className="mono">{job.id}</span></p>
            <p>Status: <strong>{job.status}</strong></p>
            {job.download_url && (
              <p><a href={job.download_url} target="_blank" rel="noreferrer">Download bundle</a></p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
