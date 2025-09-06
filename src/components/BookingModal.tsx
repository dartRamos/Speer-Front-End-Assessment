import React from "react";
import type { User } from "../types";
import "./BookingModal.css";

type BookingModalProps = {
  day: string;
  time: string;
  candidate: User;
  availableEngineers: User[];
  onClose: () => void;
  onBook: (engineer: User) => void;
};

const BookingModal: React.FC<BookingModalProps> = ({
  day,
  time,
  candidate,
  availableEngineers,
  onClose,
  onBook,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Book Interview</h2>
        <p>
          <strong>Candidate:</strong> {candidate.name}
        </p>
        <p>
          <strong>Slot:</strong> {day} at {time}
        </p>

        <h3 className="modal-subtitle">Available Engineers</h3>
        {availableEngineers.length > 0 ? (
          <ul className="engineer-list">
            {availableEngineers.map((engineer) => (
              <li key={engineer.id} className="engineer-item">
                {engineer.name}
                <button className="book-btn" onClick={() => onBook(engineer)}>
                  Book
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No engineers available.</p>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
