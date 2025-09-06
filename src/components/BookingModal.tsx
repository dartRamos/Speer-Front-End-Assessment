import React from "react";
import type { User } from "../types";
import firstEngi from "../assets/images/engi-1.jpg";
import secondEngi from "../assets/images/engi-2.jpg";
import thirdEngi from "../assets/images/engi-3.jpg";
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

  const getEngineerImage = (engineer: User) => {
    switch (engineer.id) {
      case 8:
        return firstEngi;
      case 7:
        return secondEngi;
      case 6:
        return thirdEngi;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

      <div className="modal-header">
        <h2>Book Interview</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>


        <div className="booking-container">
          <p>
            <strong>Candidate:</strong> <span>{candidate.name}
            </span>
          </p>
          
          <p>
            <strong>Slot:</strong> <span>{day} @ {time}</span>
          </p>

          <p>
            <strong>Available Engineer(s)</strong>
          </p>
          {availableEngineers.length > 0 ? (
            <ul className="engineer-list">
            {availableEngineers.map((engineer) => (
              <li key={engineer.id} className="engineer-item">
                <div className="engineer-info">
                  <img
                    src={getEngineerImage(engineer)}
                    alt={engineer.name}
                    className="engineer-photo-small"
                  />
                  <span>{engineer.name}</span>
                </div>
                <button className="book-btn" onClick={() => onBook(engineer)}>Book</button>
              </li>
            ))}
          </ul>
          ) : (
            <p>No engineers available.</p>
          )}

        </div>

      </div>
    </div>
  );
};

export default BookingModal;
