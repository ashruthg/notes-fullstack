import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const API_BASE = "https://notes-backend-74tl.onrender.com";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      if (res.ok) {
        setMsg("Registered. Redirecting to login...");
        setTimeout(() => navigate("/login"), 900);
      } else {
        setMsg(text || "Registration failed");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Register</h3>
      <form onSubmit={onSubmit}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="form-control mb-2" />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" className="form-control mb-2" />
        <input name="password" value={form.password} onChange={onChange} type="password" placeholder="Password" className="form-control mb-2" />
        <button className="btn btn-primary w-100">Register</button>
      </form>
      {msg && <div className="mt-3 small text-center text-muted">{msg}</div>}
    </div>
  );
}
