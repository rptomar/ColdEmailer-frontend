import React from "react";
import { useNavigate } from "react-router-dom";
import FlowchartEditor from "../components/FlowchartEditor";

const Home = () => {
  const navigate = useNavigate();

  const handleSave = async (flowchart) => {
    console.log("Flowchart saved:", flowchart);
    // Add API call here if needed
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Navigation Buttons */}
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button
          onClick={() => navigate("/schedule")}
          style={{
            margin: "5px",
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Schedule
        </button>
        <button
          onClick={() => navigate("/flowcharts")}
          style={{
            margin: "5px",
            padding: "10px 15px",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Flowcharts
        </button>
      </div>

      {/* Flowchart Editor */}
      <h1>Flowchart Editor</h1>
      <FlowchartEditor onSave={handleSave} />
    </div>
  );
};

export default Home;
