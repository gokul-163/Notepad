import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Notepad from "./components/Notepad";
import './index.css';

function App() {
  const [activeForm, setActiveForm] = useState("notepad"); // "register" | "login" | "notepad"
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]); // ✅ store notes globally

  // ✅ Function to completely clear user session and data
  const handleLogout = () => {
    setUser(null);
    setActiveForm("login");
    setNotes([]); // clear notes
    localStorage.clear(); // clear all stored data (token, user info, etc.)
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-left"><h1>Advanced Notepad</h1></div>
        <div className="header-right">
          {!user ? (
            <>
              <button onClick={() => setActiveForm("register")}>Register</button>
              <button onClick={() => setActiveForm("login")}>Login</button>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </header>

      {/* Body */}
      <main className="body-container">
        {activeForm === "register" && (
          <Register setUser={setUser} setActiveForm={setActiveForm} />
        )}
        {activeForm === "login" && (
          <Login setUser={setUser} setActiveForm={setActiveForm} />
        )}
        {activeForm === "notepad" && (
          <Notepad user={user} notes={notes} setNotes={setNotes} />
        )}
      </main>
    </div>
  );
}

export default App;
