export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 299,
    currency: "USD",
    billing: "per month",
    durationDays: 30,
    audience: "Small teams & PoC systems",
    tagline: "Try the full pipeline on one cluster before you commit.",
    features: [
      "Up to 3 bundles / month",
      "Weekly CVE scan (core)",
      "Automatic IDMS / ICSP manifests",
      "Cloud SaaS hosting",
      "Email support, 48h response",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 899,
    currency: "USD",
    billing: "per month",
    durationDays: 30,
    audience: "Mid-size companies & IT providers",
    tagline: "For teams shipping bundles to production clusters regularly.",
    features: [
      "Up to 15 bundles / month",
      "Per-bundle detailed CVE audit",
      "IDMS / ICSP + custom CatalogSources",
      "Cloud SaaS or dedicated instance",
      "Priority support, SLA 8h",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    currency: "USD",
    billing: "annual, custom",
    durationDays: 365,
    audience: "Banks, telecom, and government",
    tagline: "Fully self-hosted, for environments that never touch the internet.",
    features: [
      "Unlimited bundles",
      "Real-time, custom vulnerability feeds",
      "Fully customized manifest pipelines",
      "100% self-hosted, air-gapped appliance",
      "24/7 dedicated engineer, SLA 1h",
    ],
  },
];

export function getPlanById(id) {
  return PLANS.find((p) => p.id === id);
}
