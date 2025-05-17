import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="events-container container">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map(event => (
          <div key={event._id} className="event-card" onClick={() => navigate(`/events/${event._id}`)}>
            <img src={event.image || '/default-event.jpg'} alt={event.name} />
            <div className="event-info">
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p className="event-venue">{event.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
