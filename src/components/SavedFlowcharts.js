import React, { useEffect, useState } from "react";
import { getSavedFlowcharts } from "../api/flowchartApi";

const SavedFlowcharts = () => {
  const [flowcharts, setFlowcharts] = useState([]);

  useEffect(() => {
    const fetchFlowcharts = async () => {
      const response = await getSavedFlowcharts();
      setFlowcharts(response.data);
    };
    fetchFlowcharts();
  }, []);

  return (
    <div>
      <h2>Saved Flowcharts</h2>
      {flowcharts.map((flowchart, index) => (
        <div key={index}>
          <h3>Flowchart {index + 1}</h3>
          <pre>{JSON.stringify(flowchart, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default SavedFlowcharts;
