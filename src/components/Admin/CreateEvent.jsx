import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css'
export default function CreateEvent() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    venue: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      _id: Date.now().toString(),
      ...eventData
    };

    // Send newEvent to dashboard using state
    navigate("/admin", { state: { newEvent } });
  };

  return (
    <div className="admin-form-page">
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Create Event</h2>
      <div>
        <label>Event Name</label>
        <input type="text" value={eventData.name} onChange={(e) => setEventData({ ...eventData, name: e.target.value })} />
      </div>
      <div>
        <label>Date</label>
        <input type="date" value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} />
      </div>
      <div>
        <label>Venue</label>
        <input type="text" value={eventData.venue} onChange={(e) => setEventData({ ...eventData, venue: e.target.value })} />
      </div>
      <button type="submit" className="admin-btn">Create</button>
    </form>
    </div>
  );
};
