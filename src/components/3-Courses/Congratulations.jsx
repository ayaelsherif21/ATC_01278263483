import React from 'react';
import './Congratulations.css';

function Congratulations({ onClose }) {
  // Add keyboard support for closing on Enter or Space keys
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClose();
    }
  };

  return (
    <div
      className="congrats-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="congrats-title"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div className="congrats-card">
        <h1 id="congrats-title" className="congrats-title">
          🎉 Congratulations! 🎉
        </h1>
        <p className="congrats-message">
          Your booking was successful. Thank you for joining the event!
        </p>
        <button
          className="congrats-button"
          onClick={onClose}
          aria-label="Close congratulations dialog"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Congratulations;
