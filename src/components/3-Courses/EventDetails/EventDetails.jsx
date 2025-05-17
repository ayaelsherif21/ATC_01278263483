import React, { useState, useEffect, useRef } from 'react';
import './EventDetails.css';
import Congratulations from '../Congratulations.jsx';

function EventDetails({ event, onClose, onBook, isBooked }) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowContactForm(false);
    }
  };

const handleBooking = () => {
  const currentBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const isAlreadyBooked = currentBookings.some(e => e.id === event.id);

  if (!isAlreadyBooked) {
    localStorage.setItem("bookings", JSON.stringify([...currentBookings, event]));
  }

  // Call parent's booking handler
  onBook(event.id); // Pass event ID to parent
};




  if (isBookingComplete || isBooked) {
    return <Congratulations onClose={onClose} />;
  }

  return (
    <div className={`event-details flex ${isModalOpen ? 'showModal' : ''}`}>
      <li><button className='icon-clear' onClick={onClose}></button></li>

      <div className="leftDiv">
        <div>
          <img src={event.imgPath} alt={event.EventName} className="event-image" />
          <h3 className="event-title">{event.EventName}</h3>
        </div>

        <p className="event-summary">{event.Details}</p>
        <p><strong>Duration:</strong> {event.duration || 'N/A'}</p>

        <div className="content">
          <h3>More Details</h3>
          <ul className="course-content">
            {event.content && event.content.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>


      </div>

      <div className="rightDiv flex">
        <div className="event-summary-box">
          <h3 className="instructor-title">Organizer</h3>
          <p className="instructor-name">{event.OrganizerName || "Coming Soon"}</p>
          <p > {event.OrganizerTitle}</p>

          <h3 className="price-title">Event Price</h3>
          <div className="price-info">
            <span className="original-price">{event.discountedPrice ? `$${event.discountedPrice}` : `$${event.price || '0.00'}`}</span>
          </div>

          <h3 className="instructor-title">Date</h3>
          <p >{event.date || "Coming Soon"}</p>

          <h3 className="instructor-title">Venue</h3>
          <p >{event.venue || "TBA"}</p>

          <button className="open-contact-button" onClick={handleBooking}>
            Book Now
          </button>
        </div>

        <button className="back-button" onClick={onClose}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default EventDetails;
