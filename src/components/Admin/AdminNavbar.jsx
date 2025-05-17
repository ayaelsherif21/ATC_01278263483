import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo" onClick={() => navigate("/admin")}>
        🎟️ EventAdmin
      </div>
      <div className="admin-navbar-links">
        <button onClick={() => navigate("/admin")} className="admin-nav-btn">Dashboard</button>
        <button onClick={() => navigate("/admin/create")} className="admin-nav-btn">Create Event</button>
        <button onClick={() => alert("Logged out (mock)!")} className="admin-nav-btn logout">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
