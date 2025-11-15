import React, { useState } from "react";
import "./index.css";
import Cookies from "js-cookie";

const API_BASE = "https://notes-backend-74tl.onrender.com";

export default function AddNote({ onCreated }) {
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const token = Cookies.get("jwt_token");
      const res = await fetch(`${API_BASE}/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ title: "", description: "", category: "" });
        onCreated && onCreated();
        setMsg("Note added");
        setTimeout(() => setMsg(""), 1000);
      } else {
        const text = await res.text();
        setMsg(text || "Failed to add note");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-3 addnote-form">
      <h5>Add Note</h5>
      <input name="title" value={form.title} onChange={onChange} className="form-control mb-2" placeholder="Title" />
      <textarea name="description" value={form.description} onChange={onChange} className="form-control mb-2" placeholder="Description" rows={3} />
      <input name="category" value={form.category} onChange={onChange} className="form-control mb-2" placeholder="Category" />
      <button className="btn btn-success">Add</button>
      {msg && <div className="mt-2 small text-muted">{msg}</div>}
    </form>
  );
}
