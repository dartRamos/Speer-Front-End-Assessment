import { removeBookedSlot } from "./utils";
import type { TimeSlot } from "../types";

describe("removeBookedSlot", () => {
  it("removes a booked slot", () => {
    const availability: TimeSlot[] = [
      { day: "Mon", time: "9:00" },
      { day: "Mon", time: "9:30" },
    ];

    const booked: TimeSlot = { day: "Mon", time: "9:00" };

    const updated = removeBookedSlot(availability, booked);

    expect(updated).toEqual([{ day: "Mon", time: "9:30" }]);
  });

  it("does nothing if slot is not found", () => {
    const availability: TimeSlot[] = [{ day: "Mon", time: "9:30" }];
    const booked: TimeSlot = { day: "Tue", time: "10:00" };

    const updated = removeBookedSlot(availability, booked);

    expect(updated).toEqual([{ day: "Mon", time: "9:30" }]);
  });
});
