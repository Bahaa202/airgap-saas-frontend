import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PlanDetail from "./pages/PlanDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import SubscriptionCancel from "./pages/SubscriptionCancel";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/plans/:planId" element={<PlanDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login onLogin={setApiKey} />} />
      <Route path="/dashboard" element={<Dashboard apiKey={apiKey} />} />
      <Route path="/subscription/success" element={<SubscriptionSuccess />} />
      <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
    </Routes>
  );
}

export default App;
