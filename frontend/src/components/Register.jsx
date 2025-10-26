import React, { useState } from "react";
import axios from "axios";
import "../index.css";

export default function Register({ setUser, setActiveForm }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://notepad-790f.onrender.com/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.userId);
      setActiveForm("notepad");
      setMessage("Registration Successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
