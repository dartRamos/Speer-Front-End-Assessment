import type { TimeSlot } from "../types";

export function removeBookedSlot(
  availability: TimeSlot[],
  bookedSlot: TimeSlot
): TimeSlot[] {
  return availability.filter(
    (slot) => !(slot.day === bookedSlot.day && slot.time === bookedSlot.time)
  );
}