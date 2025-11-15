import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const API_BASE = "https://notes-backend-74tl.onrender.com";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.jwtToken) {
        // store token in cookie (js-cookie)
        Cookies.set("jwt_token", data.jwtToken, { expires: 7 }); // 7 days
        navigate("/notes");
      } else {
        // backend returns string error or object - handle both
        const respText = data && data.error ? data.error : (await res.text());
        setMsg(respText || "Login failed");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Login</h3>

      <form onSubmit={onSubmit}>
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" className="form-control mb-2" />
        <input name="password" value={form.password} onChange={onChange} type="password" placeholder="Password" className="form-control mb-2" />
        <button className="btn btn-primary w-100">Login</button>
      </form>

      {msg && <div className="mt-3 small text-center text-danger">{msg}</div>}
    </div>
  );
}
