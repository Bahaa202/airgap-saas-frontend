export default function StatusPanel() {
  const rows = [
    { label: "ocp_version", value: "4.16" },
    { label: "operators", value: "odf-operator" },
    { label: "status", value: "mirroring", live: true },
    { label: "cve_scan", value: "queued" },
  ];
  return (
    <div className="status-panel">
      <div className="status-panel-head">bundle_job.log</div>
      <div className="status-panel-body">
        {rows.map((r) => (
          <div className="status-row" key={r.label}>
            <span className="status-label">{r.label}</span>
            <span className={r.live ? "status-value live" : "status-value"}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
