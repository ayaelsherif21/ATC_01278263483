import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminNavbar from "./AdminNavbar.jsx";

export default function AdminDashboard() {
  const savedEvents = JSON.parse(localStorage.getItem("events"));
  const [events, setEvents] = useState(
    savedEvents || [{ _id: "1", name: "React Conf", date: "2025-06-01", venue: "Online" }]
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state;
    if (!state) return;

    const newEvent = state.newEvent;
    const updatedEvent = state.updatedEvent;

    if (newEvent) {
      setEvents((prev) => {
        const exists = prev.some((e) => e._id === newEvent._id);
        return exists ? prev : [newEvent, ...prev];
      });
    }

    if (updatedEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    }

    // امسح ال location.state بعد الاستخدام
    navigate(location.pathname, { replace: true });
  }, [location.state, navigate, location.pathname]);

  // حفظ الأحداث في localStorage لما تتغير
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <button
          onClick={() => navigate("/admin/create")}
          className="admin-btn admin-create-btn"
        >
          + Create Event
        </button>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.venue}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/edit/${event._id}`, { state: { event } })
                    }
                    className="admin-btn edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="admin-btn delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
