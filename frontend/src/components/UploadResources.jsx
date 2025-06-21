import React, { useRef, useState } from "react";

const UploadResources = () => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div
      style={{
        margin: "10px 0",
        padding: "16px",
        background: "#f9fafb",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(59,130,246,0.06)",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <h3 style={{ fontWeight: "bold", color: "#1d4ed8" }}>
        Upload Resources / Notes / Homework
      </h3>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "block",
        }}
      />
      {fileName && (
        <p style={{ color: "#2563eb", fontSize: "0.95rem" }}>
          Selected: {fileName}
        </p>
      )}
      <button
        type="button"
        style={{
          marginTop: "8px",
          padding: "8px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => alert("Upload functionality coming soon!")}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadResources;
