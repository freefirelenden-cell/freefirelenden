import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: "100%", backgroundColor: "#e0e0df", borderRadius: "8px", height: "20px", position: "relative" }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "#4caf50",
          height: "100%",
          borderRadius: "8px",
          transition: "width 0.2s ease-in-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
