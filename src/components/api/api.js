// src/services/api.js

const API_URL = "http://localhost:5000/api"; 

export const getEvents = async () => {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
};

export const deleteEvent = async (id) => {
  await fetch(`${API_URL}/admin/events/${id}`, { method: "DELETE" });
};
