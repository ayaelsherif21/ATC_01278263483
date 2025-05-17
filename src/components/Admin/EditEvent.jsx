import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Admin.css";

const EditEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const event = location.state?.event;

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    venue: "",
  });

  useEffect(() => {
    if (event) {
      setEventData({
        name: event.name,
        date: event.date,
        venue: event.venue,
      });
    }
  }, [event]);
  
const handleSubmit = (e) => {
  e.preventDefault();
  const updatedEvent = {
    _id: event?._id || id, // خد الـ id من event لو موجود، وإلا من params
    ...eventData,
  };
  navigate("/admin", { state: { updatedEvent } });
};


  return (
     <div className="admin-form-page">
    <div className="admin-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>Event Name</label>
        <input
          type="text"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
        />

        <label>Date</label>
        <input
          type="date"
          value={eventData.date}
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
        />

        <label>Venue</label>
        <input
          type="text"
          value={eventData.venue}
          onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
        />

        <button type="submit" className="admin-btn">Update</button>
      </form>
    </div>
    </div>
  );
};

export default EditEvent;
