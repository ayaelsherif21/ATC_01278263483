import React, { useEffect, useState } from 'react';
import './Events.css';
import { myEvents } from './myEvents';
import EventDetails from './EventDetails/EventDetails';
import Congratulations from './Congratulations';

export default function Events() {
  const [currActive, setCurrActive] = useState("all");
  const [arr, setArr] = useState(myEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);

  // Filter events by category button clicked
  const handleClick = (buttonCategory) => {
    setCurrActive(buttonCategory);
    if (buttonCategory === "all") {
      setArr(myEvents);
    } else {
      const newArr = myEvents.filter(item => item.category.includes(buttonCategory));
      setArr(newArr);
    }
  };

  // Open event details modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

   useEffect(() => {
  const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  setBookedEvents(storedBookings.map(e => e.id));
}, []);
  // Handle booking logic
const handleBooking = (eventId) => {
  if (!bookedEvents.includes(eventId)) {
    setBookedEvents(prev => [...prev, eventId]);
  }
  setSelectedEvent(null);
  setShowCongrats(true);
};

  // Close event details modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  // Close congratulations modal
  const handleCloseCongrats = () => {
    setShowCongrats(false);
  };


 
  return (
    <div className="events">
      <h1 className='secTitle'>Our <span style={{color:"var(--mainColor)"}}>Events</span></h1>

      {showCongrats ? (
       <Congratulations onClose={handleCloseCongrats}/>

      // Show Event Details modal if an event is selected
      ) : selectedEvent ? (
        <div className="modal-overlay">
        <EventDetails
  event={selectedEvent}
  onClose={closeModal}
  onBook={handleBooking} // ✅
  isBooked={bookedEvents.includes(selectedEvent?.id)} 
/>
        </div>

      // Otherwise show the main event listings
      ) : (
        <main className='flex'>
          <section className='flex left-section'>
            <button
              onClick={() => handleClick("all")}
              className={currActive === "all" ? 'active' : ''}
            >
              All Events
            </button>
            <button
              onClick={() => handleClick("cs")}
              className={currActive === "cs" ? 'active' : ''}
            >
              Tech
            </button>
            <button
              onClick={() => handleClick("art")}
              className={currActive === "art" ? 'active' : ''}
            >
              Art
            </button>
          </section>

          <section className='right-section flex'>
            {arr.map((item, index) => (
              <div
                className="card"
                key={index}
                style={{ position: 'relative', cursor: item.comingSoon ? 'not-allowed' : 'pointer' }}
              >
                <div className="card-details">
                <img loading="lazy" className='flex' src={item.imgPath} alt={item.EventName} />

               
                  <h5 className="text-title">{item.EventName}</h5>
                  <p className="text-body">{item.Details}</p>
                </div>

         <button
  className="card-button"
  onClick={() => {
    if (!item.comingSoon && !bookedEvents.includes(item.id)) {
      handleEventClick(item);
    }
  }}
  disabled={item.comingSoon || bookedEvents.includes(item.id)}
>
  {item.comingSoon
    ? "Coming Soon"
    : bookedEvents.includes(item.id)
    ? "Booked"
    : "Book Now"}
</button>

                {item.comingSoon && (
                  <div className="coming-soon-overlay">
                    <span>Coming Soon</span>
                  </div>
                )}
              </div>
            ))}
          </section>
        </main>
      )}
    </div>
  );
}
