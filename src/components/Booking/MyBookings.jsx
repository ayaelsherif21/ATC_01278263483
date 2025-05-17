import React, { useEffect, useState } from 'react';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استبدل الـ URL بالمسار الصحيح للباك اند
    fetch('http://localhost:5000/api/users/my/bookings', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // إذا تستخدم توكن
      }
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading your bookings...</p>;

  if (bookings.length === 0) return <p>You have no bookings yet.</p>;

  return (
    <div className="my-bookings container">
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id} className="booking-card">
            <h3>{booking.event.name}</h3>
            <p>Date: {new Date(booking.event.date).toLocaleString()}</p>
            <p>Seats: {booking.seats}</p>
            <p>Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
