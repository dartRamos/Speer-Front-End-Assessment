import React from "react";
import "./Calendar.css";
import type { User, TimeSlot } from "../types";
import { useState } from "react";
import BookingModal from "./BookingModal.tsx"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function generateTimeSlots() {
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 18;

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  return slots;
}

type CalendarProps = {
  selectedCandidate: User | null;
  candidateAvailability: Record<number, TimeSlot[]>;
  engineerAvailability: Record<number, TimeSlot[]>;
  setEngineerAvailability: React.Dispatch<
    React.SetStateAction<Record<number, TimeSlot[]>>
  >;
  hoveredEngineer: number | null;
  candidates: User[];
  engineers: User[];
};

const Calendar: React.FC<CalendarProps> = ({ hoveredEngineer, selectedCandidate, candidateAvailability, engineerAvailability, engineers, setEngineerAvailability }) => {
  
  const slots = generateTimeSlots();
  const [bookingModal, setBookingModal] = useState<{
    day: string;
    time: string;
    candidate: User;
    availableEngineers: User[];
  } | null>(null);

  const handleSlotClick = (day: string, time: string) => {
    if (!selectedCandidate) return;
  
    // Check if candidate is available at this slot
    const candidateAvailable = (candidateAvailability[selectedCandidate.id] || []).some(
      (slot) => slot.day === day && slot.time === time
    );
  
    if (!candidateAvailable) {
      alert(`${selectedCandidate.name} is not available at this time.`);
      return;
    }
  
    // Collect engineers who are ALSO available at this slot
    const availableEngineers = engineers.filter((engineer) =>
      (engineerAvailability[engineer.id] || []).some(
        (slot) => slot.day === day && slot.time === time
      )
    );
  
    if (availableEngineers.length === 0) {
      alert("No engineers are available at this time.");
      return;
    }
  
    setBookingModal({
      day,
      time,
      candidate: selectedCandidate,
      availableEngineers,
    });
  };

  return (
    <div className="calendar">
      {/* Header */}
      <div className="calendar-header-row">
        <div className="calendar-header top-left" />
        {days.map((day) => (
          <div key={day} className="calendar-header">{day}</div>
        ))}
      </div>

      {/* Time slot rows */}
      {slots.map((time) => (
        <div className="calendar-row" key={time}>
          <div className="time-label">{time}</div>
          {days.map((day) => {
            const candidateAvailable =
              selectedCandidate &&
              (candidateAvailability[selectedCandidate.id] || []).some(
                (slot) => slot.day === day && slot.time === time
              );

            const engineerAvailable = engineerAvailability
              ? hoveredEngineer
                ? (engineerAvailability[hoveredEngineer] || []).some(
                    (slot) => slot.day === day && slot.time === time
                  )
                : Object.values(engineerAvailability).some((slots) =>
                    slots.some((slot) => slot.day === day && slot.time === time)
                  )
              : false;

            return (
              <button
                key={`${day}-${time}`}
                className={`slot-button ${
                  candidateAvailable && engineerAvailable
                    ? "bg-[#00FFFF]"
                    : candidateAvailable
                    ? "bg-red-300"
                    : engineerAvailable
                    ? "bg-green-300"
                    : ""
                }`}
                onClick={() => handleSlotClick(day, time)}
              />
            );
          })}
        </div>
      ))}

      {bookingModal && (
        <BookingModal
          day={bookingModal.day}
          time={bookingModal.time}
          candidate={bookingModal.candidate}
          availableEngineers={bookingModal.availableEngineers}
          onClose={() => setBookingModal(null)}
          onBook={(engineer) => {
            // Remove this slot from the engineer's availability
            setEngineerAvailability((prev) => {
              const updated = { ...prev };
              updated[engineer.id] = (updated[engineer.id] || []).filter(
                (slot) =>
                  !(slot.day === bookingModal.day && slot.time === bookingModal.time)
              );
              return updated;
            });

            alert(
              `Interview booked for ${bookingModal.day} ${bookingModal.time} with ${bookingModal.candidate.name} and ${engineer.name}`
            );

            setBookingModal(null);
          }}
        />
      )}

    </div>
  );
};   

export default Calendar;
