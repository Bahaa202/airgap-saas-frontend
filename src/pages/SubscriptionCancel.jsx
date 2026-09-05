import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SubscriptionCancel() {
  return (
    <div className="page">
      <Navbar />
      <section className="container">
        <h2>Checkout canceled</h2>
        <p>No worries — your account was created but no payment was made.</p>
        <Link to="/register"><button>Try again</button></Link>
      </section>
    </div>
  );
}
