import React, { useEffect, useState } from "react";
import AddNote from "../AddNote";
import Cookies from "js-cookie";
import "./index.css";

const API_BASE = "https://notes-backend-74tl.onrender.com";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("jwt_token");

  const loadNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/notes/`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      } else {
        setNotes([]);
      }
    } catch (err) {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_BASE}/notes/${id}/`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      loadNotes();
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="container mt-3">
      <AddNote onCreated={loadNotes} />

      <div className="mt-3">
        <h5>Your Notes</h5>
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="text-muted">No notes found.</p>
        ) : (
          <div className="list-group">
            {notes.map((n) => (
              <div key={n.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <strong>{n.title}</strong>
                  <p className="m-0">{n.description}</p>
                  <small className="text-secondary">{n.category}</small>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => deleteNote(n.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
