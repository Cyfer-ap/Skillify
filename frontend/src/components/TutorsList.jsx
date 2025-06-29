import React, { useState } from "react";

const TutorsList = () => {
  const [search, setSearch] = useState("");
  // Example static data
  const tutors = [
    {
      id: 1,
      name: "Alice Smith",
      subjects: ["Math", "Physics"],
      bio: "Experienced Math tutor.",
    },
    {
      id: 2,
      name: "Bob Johnson",
      subjects: ["English", "History"],
      bio: "Passionate about teaching English.",
    },
  ];

  // Filter tutors based on search input (name or subject)
  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(search.toLowerCase()) ||
      tutor.subjects.some((subject) =>
        subject.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="tutors-section">
      <h2>Available Tutors</h2>
      <input
        type="text"
        placeholder="Search by name or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="tutor-search"
      />
      <ul className="tutors-list-horizontal">
        {filteredTutors.map((tutor) => (
          <li className="tutor-card" key={tutor.id}>
            {/* <img src={tutor.photo} alt={tutor.name} /> */}
            <div className="tutor-name">{tutor.name}</div>
            <div className="tutor-subjects">{tutor.subjects.join(", ")}</div>
            <div className="tutor-bio">{tutor.bio}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorsList;
