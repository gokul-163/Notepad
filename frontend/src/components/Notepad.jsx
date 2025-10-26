import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

export default function Notepad({ user }) {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user && token) {
      axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => setNotes(res.data))
        .catch(err => console.log(err.response?.data || err.message));
    }
  }, [user, token]);

  const handleSave = async () => {
    if (!token) return alert("Please login first");
    try {
      const res = await axios.post("http://localhost:5000/api/notes",
        { content: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([...notes, res.data]);
      setText("");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to save note");
    }
  };

  return (
    <div className="notepad-container">
      <h2>Notepad</h2>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write notes..." />
      <button onClick={handleSave}>Save</button>
      <ul>{notes.map((note, i) => <li key={i}>{note.content}</li>)}</ul>
    </div>
  );
}
