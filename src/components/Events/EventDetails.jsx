import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="event-details container">
      <h2>{event.name}</h2>
      <img src={event.image} alt={event.name} />
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      <p>{event.description}</p>
      {/* ممكن تضيف زر حجز هنا */}
    </div>
  );
};

export default EventDetails;
