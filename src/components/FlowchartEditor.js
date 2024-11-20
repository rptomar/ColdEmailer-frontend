// import React, { useState } from "react";
// import ReactFlow, { addEdge, Background, Controls } from "reactflow";
// import ColdEmailNode from "./nodes/ColdEmailNode";
// import WaitDelayNode from "./nodes/WaitDelayNode";
// import LeadSourceNode from "./nodes/LeadSourceNode";
// import "reactflow/dist/style.css";

// const FlowchartEditor = ({ onSave }) => {
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);

//   const onNodesChange = (changes) => setNodes((nds) => changes(nds));
//   const onEdgesChange = (changes) => setEdges((eds) => changes(eds));
//   const onConnect = (connection) => setEdges((eds) => addEdge(connection, eds));

//   const handleSave = () => {
//     onSave({ nodes, edges });
//   };

//   return (
//     <div style={{ height: "500px", border: "1px solid #ddd", margin: "20px" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//       <button onClick={handleSave}>Save Flowchart</button>
//     </div>
//   );
// };

// export default FlowchartEditor;

import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import ColdEmailNode from "./nodes/ColdEmailNode";
import WaitDelayNode from "./nodes/WaitDelayNode";
import LeadSourceNode from "./nodes/LeadSourceNode";

const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode,
};
const initialNodes = [
  { id: "1", type: "input", position: { x: 250, y: 100 }, data: { label: "Lead Source" } },
];


const initialEdges = [];

const FlowchartEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type) => {
    const id = `${nodes.length + 1}`;
    const newNode = {
      id,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `${type} Node` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleSave = async () => {
    const flowchart = { nodes, edges };
    console.log(flowchart);
    // Send to backend
  };
  console.log("Nodes:", nodes);
console.log("Edges:", edges);


  return (
    <div className="flowchart-container">
      <div className="controls">
        <button onClick={() => addNode("coldEmail")}>Add Cold Email Node</button>
        <button onClick={() => addNode("waitDelay")}>Add Wait/Delay Node</button>
        <button onClick={() => addNode("leadSource")}>Add Lead Source Node</button>
        <button onClick={handleSave}>Save and shedule Flowchart</button>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowchartEditor;

