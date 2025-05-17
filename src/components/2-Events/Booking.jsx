import React, { useEffect, useState } from 'react';
import './Booking.css';

function Booking() {
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookedEvents(bookings);
  }, []);

  const handleRemove = (id) => {
    const updatedEvents = bookedEvents.filter(event => event.id !== id);
    setBookedEvents(updatedEvents);
    localStorage.setItem("bookings", JSON.stringify(updatedEvents));
  };

  return (
    <div className="booking-page">
      <h2>My Bookings</h2>
      {bookedEvents.length === 0 ? (
        <p className="no-bookings">No bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookedEvents.map((event, index) => (
            <div key={index} className="booking-card">
              <img src={event.imgPath} alt={event.EventName} className="booking-image" />
              <div className="booking-info">
                <h3>{event.EventName}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <button className="remove-btn" onClick={() => handleRemove(event.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Booking;
