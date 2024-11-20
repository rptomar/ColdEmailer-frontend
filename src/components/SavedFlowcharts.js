import React, { useEffect, useState } from "react";
import { getSavedFlowcharts } from "../api/flowchartApi";
import { useNavigate } from "react-router-dom";

const SavedFlowcharts = () => {
  const [flowcharts, setFlowcharts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlowcharts = async () => {
      try {
        const response = await getSavedFlowcharts();
        // Sort flowcharts in descending order based on createdAt
        const sortedFlowcharts = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFlowcharts(sortedFlowcharts);
      } catch (error) {
        console.error("Error fetching flowcharts:", error);
      }
    };
    fetchFlowcharts();
  }, []);

  const handleSelect = (flowchart) => {
    navigate("/schedule", { state: { flowchart } }); // Navigate to /schedule with flowchart data
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Flowcharts</h2>
      <div style={{ display: "grid", gap: "20px" }}>
        {flowcharts.map((flowchart, index) => (
          <div
            key={flowchart._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              background: "#f9f9f9",
            }}
          >
            <h3>Flowchart {index + 1}</h3>
            <p><strong>Created At:</strong> {new Date(flowchart.createdAt).toLocaleString()}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleSelect(flowchart)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  background: "#28a745",
                  color: "#fff",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedFlowcharts;
