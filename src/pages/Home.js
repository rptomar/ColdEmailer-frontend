import React from "react";
import FlowchartEditor from "../components/FlowchartEditor";

const Home = () => {
  const handleSave = async (flowchart) => {
    console.log("Flowchart saved:", flowchart);
    // Add API call here if needed
  };

  return (
    <div>
      <h1>Flowchart Editor</h1>
      <FlowchartEditor onSave={handleSave} />
    </div>
  );
};

export default Home;
