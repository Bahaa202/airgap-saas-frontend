import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">AirGap-Sync</Link>
      <div className="navbar-links">
        <a href="/#pricing">Plans</a>
        <Link to="/login">Log in</Link>
        <Link to="/register" className="navbar-cta">Get started</Link>
      </div>
    </nav>
  );
}
