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
    <div className="mt-8">
      <h2 className="bold">Available Tutors</h2>
      <input
        type="text"
        placeholder="Search by name or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-xs"
      />
      <ul className="space-y-2">
        {filteredTutors.map((tutor) => (
          <li
            key={tutor.id}
            style={{
              border: "1px solid red",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "lightyellow",
              margin: "10px",
              width: " 400px",
              display: "inline-block",
            }}
          >
            <img src={tutor.photo} alt={tutor.name} className="" />
            <div className="bold">{tutor.name}</div>
            <div>{tutor.subjects.join(", ")}</div>
            <div>{tutor.bio}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorsList;
