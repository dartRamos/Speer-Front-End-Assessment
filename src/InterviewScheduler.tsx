import React, { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import firstEngi from "./assets/images/engi-1.jpg"
import secondEngi from "./assets/images/engi-2.jpg"
import thirdEngi from "./assets/images/engi-3.jpg"
import "./InterviewScheduler.css";
import type { User, TimeSlot } from "./types"

const leanneAvailability: TimeSlot[] = [
  { day: "Mon", time: "9:00" },
  { day: "Mon", time: "9:30" },
  { day: "Mon", time: "10:00" },
  { day: "Mon", time: "10:30" },
]

const ervinAvailability: TimeSlot[] = [
  { day: "Tue", time: "11:00" },
  { day: "Tue", time: "11:30" },
  { day: "Tue", time: "12:00" },
  { day: "Tue", time: "12:30" },
  { day: "Tue", time: "13:00" },
]

const clementineAvailability: TimeSlot[] = [
  { day: "Fri", time: "14:00" },
  { day: "Fri", time: "14:30" },
  { day: "Fri", time: "15:00" },
  { day: "Fri", time: "15:30" },
]

const patriciaAvailability: TimeSlot[] = [
  { day: "Thu", time: "11:00" },
  { day: "Thu", time: "11:30" },
  { day: "Thu", time: "12:00" },
  { day: "Thu", time: "12:30" },
  { day: "Thu", time: "13:00" },
  { day: "Thu", time: "13:30" },
  { day: "Thu", time: "14:00" },
  { day: "Thu", time: "14:30" },
  { day: "Thu", time: "15:00" },
]

const chelseyAvailability: TimeSlot[] = [
  { day: "Tue", time: "10:00" },
  { day: "Tue", time: "10:30" },
  { day: "Tue", time: "11:00" },
  { day: "Tue", time: "11:30" },
  { day: "Tue", time: "12:00" },
  { day: "Tue", time: "12:30" },
  { day: "Tue", time: "13:00" },
]

const InterviewScheduler: React.FC = () => {
  const [candidates, setCandidates] = useState<User[]>([]);
  const [engineers, setEngineers] = useState<User[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<User | null>(null);
  const [hoveredEngineer, setHoveredEngineer] = useState<number | null>(null);
  const [engineerAvailability, setEngineerAvailability] = useState<Record<number, TimeSlot[]>>({
    6: [
      { day: "Mon", time: "9:00" },
      { day: "Mon", time: "9:30" },
      { day: "Mon", time: "10:00" },
      { day: "Mon", time: "10:30" },
      { day: "Tue", time: "10:00" },
      { day: "Tue", time: "10:30" },
      { day: "Wed", time: "9:00" },
      { day: "Wed", time: "9:30" },
      { day: "Thu", time: "11:00" },
      { day: "Thu", time: "11:30" },
    ],
    7: [
      { day: "Tue", time: "11:00" },
      { day: "Tue", time: "11:30" },
      { day: "Tue", time: "12:00" },
      { day: "Tue", time: "12:30" },
      { day: "Wed", time: "10:00" },
      { day: "Wed", time: "10:30" },
      { day: "Thu", time: "11:00" },
      { day: "Thu", time: "11:30" },
      { day: "Fri", time: "9:00" },
      { day: "Fri", time: "9:30" },
    ],
    8: [
      { day: "Wed", time: "14:00" },
      { day: "Wed", time: "14:30" },
      { day: "Wed", time: "15:00" },
      { day: "Wed", time: "15:30" },
      { day: "Thu", time: "13:00" },
      { day: "Thu", time: "13:30" },
      { day: "Thu", time: "14:00" },
      { day: "Fri", time: "14:00" },
      { day: "Fri", time: "14:30" },
      { day: "Fri", time: "15:00" },
    ],
  });
  

  const candidateAvailability: Record<number, TimeSlot[]> = {
    1: leanneAvailability,
    2: ervinAvailability,
    3: clementineAvailability,
    4: patriciaAvailability,
    5: chelseyAvailability
  };

  if (selectedCandidate) {
    const availability = candidateAvailability[selectedCandidate.id] || [];
    console.log(availability);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
        const usersData: User[] = await usersRes.json();

        const engineerRes = await fetch("https://jsonplaceholder.typicode.com/users");
        const engineerData: User[] = await engineerRes.json();

        setCandidates(usersData);
        setEngineers(engineerData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="scheduler-container">
      <div className="sidebar">
        <h1 className="app-title">SpeerCheck</h1>
  
        <div className="engineer-box">
          <label>Engineers</label>
          <div className="engineer-details">
            {engineers.slice(5, 8).map((engineer, index) => (
              <div
                key={engineer.id}
                onMouseEnter={() => setHoveredEngineer(engineer.id)}
                onMouseLeave={() => setHoveredEngineer(null)}
              >
                <img
                  src={[thirdEngi, secondEngi, firstEngi][index]}
                  alt={engineer.name}
                  className="engineer-photo"
                />
                <div className="engineer-names">{engineer.name}</div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Candidate selector */}
        <div className="candidate-box">
          <label>Select Candidate</label>
          <select
            className="candidate-select"
            value={selectedCandidate?.id || ""}
            onChange={(e) => {
              const candidateId = Number(e.target.value);
              const candidate = candidates.find((c) => c.id === candidateId) || null;
              setSelectedCandidate(candidate);
            }}
          >
            <option>Select a candidate</option>
            {candidates.slice(0, 5).map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </div>
  
        <div className="color-code-container">
          <div><span className="color-box bg-green-300" /> Engineer Available</div>
          <div><span className="color-box bg-[#00FFFF]" /> Matching Availability</div>
          <div><span className="color-box bg-red-300" /> Candidate Available Only</div>
        </div>
      </div>
  
      {/* Calendar */}
      <div className="calendar-container">
      <Calendar
        selectedCandidate={selectedCandidate}
        candidateAvailability={candidateAvailability}
        engineerAvailability={engineerAvailability}
        setEngineerAvailability={setEngineerAvailability}
        hoveredEngineer={hoveredEngineer}
        candidates={candidates}
        engineers={engineers}
      />
      </div>
    </div>
  );
};

export default InterviewScheduler;
